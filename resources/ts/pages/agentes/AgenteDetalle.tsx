import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { RetentionBox } from '@/components/ui/RetentionBox'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import type { Agente, RegimenFiscal, ZonaGeografica } from '@/types/agente.types'
import { ArrowLeft, Pencil, Save, X, Mail, Plus } from 'lucide-react'

const REGIMEN_OPTIONS = [
  { value: 'MORAL', label: 'Persona Moral' },
  { value: 'FISICA_EMPRESARIAL', label: 'Persona Física con Actividad Empresarial' },
  { value: 'RESICO', label: 'RESICO' },
]

const ZONA_OPTIONS = [
  { value: 'FRONTERIZA', label: 'Zona Fronteriza' },
  { value: 'RESTO_PAIS', label: 'Resto del País' },
]

const ESTATUS_OPTIONS = [
  { value: 'ACTIVO', label: 'Activo' },
  { value: 'BLOQUEADO', label: 'Bloqueado' },
]

function getRetenciones(regimen: RegimenFiscal, zona: ZonaGeografica) {
  const iva = zona === 'FRONTERIZA' ? 0.08 : 0.16
  if (regimen === 'MORAL') return { iva }
  if (regimen === 'FISICA_EMPRESARIAL') return { iva, retencionISR: 0.10, retencionIVA: zona === 'FRONTERIZA' ? 0.053333 : 0.106667 }
  // RESICO
  return { iva, retencionISR: 0.0125, retencionIVA: zona === 'FRONTERIZA' ? 0.053333 : 0.106667 }
}

function buildResumen(comision: number, retenciones: ReturnType<typeof getRetenciones>) {
  const ivaAmount = comision * retenciones.iva
  const subtotal = comision + ivaAmount
  const retISR = retenciones.retencionISR ? comision * retenciones.retencionISR : 0
  const retIVA = retenciones.retencionIVA ? comision * retenciones.retencionIVA : 0
  const total = subtotal - retISR - retIVA

  return {
    comisionPeriodo: comision,
    iva: ivaAmount,
    subtotal: retenciones.retencionISR ? subtotal : undefined,
    retencionISR: retenciones.retencionISR ? retISR : undefined,
    retencionIVA: retenciones.retencionIVA ? retIVA : undefined,
    total,
  }
}

export default function AgenteDetalle() {
  const { id } = useParams()
  const agente = AGENTES_MOCK.find((a) => a.id === Number(id))
  const [editing, setEditing] = useState(false)

  const [nombre, setNombre] = useState(agente?.nombre || '')
  const [rfc, setRfc] = useState(agente?.rfc || '')
  const [estatus, setEstatus] = useState(agente?.estatus || 'ACTIVO')
  const [regimen, setRegimen] = useState<RegimenFiscal>(agente?.regimenFiscal || 'MORAL')
  const [zona, setZona] = useState<ZonaGeografica>(agente?.zonaGeografica || 'RESTO_PAIS')
  const [correos, setCorreos] = useState<string[]>(agente?.correos || [])
  const [correoEnvio, setCorreoEnvio] = useState(agente?.correoEnvio || '')
  const [ejecutivo, setEjecutivo] = useState(agente?.ejecutivoResponsable || '')

  if (!agente) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Agente no encontrado</p>
        <Link to="/agentes" className="text-avla-blue text-sm mt-2 inline-block">← Regresar</Link>
      </div>
    )
  }

  const retenciones = getRetenciones(regimen, zona)
  const resumenPreview = buildResumen(10000, retenciones)
  const previewAgente: Agente = { ...agente, regimenFiscal: regimen, zonaGeografica: zona, retenciones }

  return (
    <div>
      <PageHeader
        title={agente.nombre}
        description={`RFC: ${agente.rfc}`}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={estatus} />
            {!editing ? (
              <Button variant="secondary" onClick={() => setEditing(true)}>
                <Pencil size={14} />
                Editar
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={() => setEditing(false)}>
                  <X size={14} />
                  Cancelar
                </Button>
                <Button onClick={() => { alert('Cambios guardados (simulación)'); setEditing(false) }}>
                  <Save size={14} />
                  Guardar cambios
                </Button>
              </>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column — Agent data */}
        <Card>
          <h2 className="font-heading text-base font-semibold text-text mb-4">Datos del Intermediario</h2>
          <div className="space-y-4">
            <Input label="Nombre del Intermediario" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={!editing} />
            <Input label="RFC" value={rfc} onChange={(e) => setRfc(e.target.value)} disabled={!editing} />
            <Select
              label="Estatus"
              options={ESTATUS_OPTIONS}
              value={estatus}
              onChange={(e) => setEstatus(e.target.value as 'ACTIVO' | 'BLOQUEADO')}
              disabled={!editing}
            />
            <Input label="Ejecutivo Responsable" value={ejecutivo} onChange={(e) => setEjecutivo(e.target.value)} disabled={!editing} />

            {/* Correos */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">Correos Registrados</label>
              <div className="flex flex-wrap gap-2">
                {correos.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-avla-blue-subtle text-avla-blue">
                    <Mail size={12} />
                    {c}
                  </span>
                ))}
                {editing && (
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-border text-text-muted hover:border-avla-blue hover:text-avla-blue transition-colors">
                    <Plus size={12} />
                    Agregar
                  </button>
                )}
              </div>
            </div>

            <Select
              label="Correo de Envío"
              options={correos.map((c) => ({ value: c, label: c }))}
              value={correoEnvio}
              onChange={(e) => setCorreoEnvio(e.target.value)}
              disabled={!editing}
            />
          </div>
        </Card>

        {/* Right column — Fiscal config */}
        <div className="space-y-6">
          <Card>
            <h2 className="font-heading text-base font-semibold text-text mb-4">Configuración Fiscal</h2>
            <div className="space-y-4">
              <Select
                label="Régimen Fiscal"
                options={REGIMEN_OPTIONS}
                value={regimen}
                onChange={(e) => setRegimen(e.target.value as RegimenFiscal)}
                disabled={!editing}
              />
              <Select
                label="Zona Geográfica"
                options={ZONA_OPTIONS}
                value={zona}
                onChange={(e) => setZona(e.target.value as ZonaGeografica)}
                disabled={!editing}
              />
            </div>
          </Card>

          <RetentionBox agente={previewAgente} resumen={resumenPreview} />

          <div className="bg-info-bg border border-avla-blue/20 rounded-[var(--radius-md)] p-4">
            <p className="text-xs text-avla-blue">
              💡 Este recuadro muestra un ejemplo de cálculo con una comisión base de $10,000 MXN.
              Los valores reales se calcularán al generar la liquidación.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border">
        <Link to="/agentes">
          <Button variant="ghost">
            <ArrowLeft size={16} />
            Regresar a Agentes
          </Button>
        </Link>
      </div>
    </div>
  )
}
