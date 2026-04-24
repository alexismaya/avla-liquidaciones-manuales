import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { RetentionBox } from '@/components/ui/RetentionBox'
import type { Agente, RegimenFiscal, ZonaGeografica } from '@/types/agente.types'
import { ArrowLeft, UserPlus, Mail, Plus } from 'lucide-react'

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
  return { iva, retencionISR: 0.0125, retencionIVA: zona === 'FRONTERIZA' ? 0.053333 : 0.106667 }
}

function buildResumen(comision: number, retenciones: ReturnType<typeof getRetenciones>) {
  const ivaAmount = comision * retenciones.iva
  const subtotal = comision + ivaAmount
  const retISR = retenciones.retencionISR ? comision * retenciones.retencionISR : 0
  const retIVA = retenciones.retencionIVA ? comision * retenciones.retencionIVA : 0
  return {
    comisionPeriodo: comision,
    iva: ivaAmount,
    subtotal: retenciones.retencionISR ? subtotal : undefined,
    retencionISR: retenciones.retencionISR ? retISR : undefined,
    retencionIVA: retenciones.retencionIVA ? retIVA : undefined,
    total: subtotal - retISR - retIVA,
  }
}

export default function NuevoAgente() {
  const [nombre, setNombre] = useState('')
  const [rfc, setRfc] = useState('')
  const [estatus, setEstatus] = useState('ACTIVO')
  const [regimen, setRegimen] = useState<RegimenFiscal>('MORAL')
  const [zona, setZona] = useState<ZonaGeografica>('RESTO_PAIS')
  const [correos, setCorreos] = useState<string[]>([])
  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [correoEnvio, setCorreoEnvio] = useState('')
  const [ejecutivo, setEjecutivo] = useState('')

  const retenciones = getRetenciones(regimen, zona)
  const resumenPreview = buildResumen(10000, retenciones)
  const previewAgente: Agente = {
    id: 0, nombre, rfc, estatus: estatus as 'ACTIVO' | 'BLOQUEADO',
    correos, correoEnvio, regimenFiscal: regimen,
    zonaGeografica: zona, retenciones, ejecutivoResponsable: ejecutivo,
  }

  const addCorreo = () => {
    if (nuevoCorreo && !correos.includes(nuevoCorreo)) {
      setCorreos([...correos, nuevoCorreo])
      if (!correoEnvio) setCorreoEnvio(nuevoCorreo)
      setNuevoCorreo('')
    }
  }

  return (
    <div>
      <PageHeader
        title="Nuevo Agente"
        description="Registra un nuevo intermediario en el sistema"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="font-heading text-base font-semibold text-text mb-4">Datos del Intermediario</h2>
          <div className="space-y-4">
            <Input label="Nombre del Intermediario" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Razón social o nombre completo" />
            <Input label="RFC" value={rfc} onChange={(e) => setRfc(e.target.value)} placeholder="Ej: GAN010203AB1" />
            <Select label="Estatus" options={ESTATUS_OPTIONS} value={estatus} onChange={(e) => setEstatus(e.target.value)} />
            <Input label="Ejecutivo Responsable" value={ejecutivo} onChange={(e) => setEjecutivo(e.target.value)} placeholder="Nombre del ejecutivo" />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">Correos</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCorreo()}
                  placeholder="correo@ejemplo.com"
                  className="flex-1 px-3 py-2 text-sm rounded-[var(--radius-md)] border border-border bg-surface text-text
                    focus:outline-none focus:ring-2 focus:ring-avla-blue/30 focus:border-avla-blue"
                />
                <Button size="sm" onClick={addCorreo}>
                  <Plus size={14} />
                  Agregar
                </Button>
              </div>
              {correos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {correos.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-avla-blue-subtle text-avla-blue">
                      <Mail size={12} /> {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {correos.length > 0 && (
              <Select
                label="Correo de Envío"
                options={correos.map((c) => ({ value: c, label: c }))}
                value={correoEnvio}
                onChange={(e) => setCorreoEnvio(e.target.value)}
              />
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="font-heading text-base font-semibold text-text mb-4">Configuración Fiscal</h2>
            <div className="space-y-4">
              <Select label="Régimen Fiscal" options={REGIMEN_OPTIONS} value={regimen} onChange={(e) => setRegimen(e.target.value as RegimenFiscal)} />
              <Select label="Zona Geográfica" options={ZONA_OPTIONS} value={zona} onChange={(e) => setZona(e.target.value as ZonaGeografica)} />
            </div>
          </Card>

          <RetentionBox agente={previewAgente} resumen={resumenPreview} />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
        <Link to="/agentes">
          <Button variant="ghost">
            <ArrowLeft size={16} />
            Cancelar
          </Button>
        </Link>
        <Button onClick={() => alert('Agente registrado (simulación)')}>
          <UserPlus size={16} />
          Registrar Agente
        </Button>
      </div>
    </div>
  )
}
