import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Stepper } from '@/components/ui/Stepper'
import { Badge } from '@/components/ui/Badge'
import { RetentionBox } from '@/components/ui/RetentionBox'
import { SearchBar } from '@/components/shared/SearchBar'
import { useLiquidacionManualStore } from '@/store/liquidacionManualStore'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import { LIQUIDACIONES_MOCK } from '@/mock/liquidaciones.mock'
import { POLIZAS_DISPONIBLES_MOCK } from '@/mock/polizas.mock'
import type { MovimientoLiquidacion } from '@/types/liquidacion.types'
import { ArrowLeft, ArrowRight, Minus, Plus, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

const WIZARD_STEPS = [
  { label: 'Selección' },
  { label: 'Revisión' },
  { label: 'Vista Previa' },
  { label: 'Completado' },
]

const FMT = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

function getRetenciones(regimen: string, zona: string) {
  const iva = zona === 'FRONTERIZA' ? 0.08 : 0.16
  if (regimen === 'MORAL') return { iva }
  if (regimen === 'FISICA_EMPRESARIAL')
    return { iva, retencionISR: 0.10, retencionIVA: zona === 'FRONTERIZA' ? 0.053333 : 0.106667 }
  return { iva, retencionISR: 0.0125, retencionIVA: zona === 'FRONTERIZA' ? 0.053333 : 0.106667 }
}

export default function LiquidacionRevision() {
  const navigate = useNavigate()
  const store = useLiquidacionManualStore()
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [searchPoliza, setSearchPoliza] = useState('')

  const agente = AGENTES_MOCK.find((a) => a.id === store.agenteId)

  useEffect(() => {
    if (store.movimientos.length === 0 && agente) {
      const liq = LIQUIDACIONES_MOCK.find((l) => l.agenteId === agente.id)
      if (liq && liq.movimientos.length > 0) {
        store.setMovimientos(liq.movimientos)
      } else {
        store.setMovimientos(
          POLIZAS_DISPONIBLES_MOCK.slice(0, 2).map((p, i) => ({
            id: 100 + i,
            poliza: p.poliza,
            cliente: p.cliente,
            fecha: p.fecha,
            moneda: p.moneda,
            primaNeta: p.primaNeta,
            porcentajeComision: p.porcentajeComision,
            montoComision: p.montoComision,
            tipoCambio: p.tipoCambio,
            montoEnPesos: p.montoEnPesos,
            tipoMovimiento: p.tipoMovimiento,
            estatus: p.estatus,
          }))
        )
      }
    }
  }, [])

  if (!agente) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">No se seleccionó un agente.</p>
        <Link to="/liquidaciones-manuales" className="text-avla-blue text-sm mt-2 inline-block">← Regresar</Link>
      </div>
    )
  }

  const totalComision = store.movimientos.reduce((s, m) => s + m.montoEnPesos, 0)
  const ret = getRetenciones(agente.regimenFiscal, agente.zonaGeografica)
  const ivaAmt = totalComision * ret.iva
  const sub = totalComision + ivaAmt
  const retISR = ret.retencionISR ? totalComision * ret.retencionISR : 0
  const retIVA = ret.retencionIVA ? totalComision * ret.retencionIVA : 0

  const resumen = {
    comisionPeriodo: totalComision,
    iva: ivaAmt,
    subtotal: ret.retencionISR ? sub : undefined,
    retencionISR: ret.retencionISR ? retISR : undefined,
    retencionIVA: ret.retencionIVA ? retIVA : undefined,
    total: sub - retISR - retIVA,
  }

  const filteredPolizas = POLIZAS_DISPONIBLES_MOCK.filter(
    (p) =>
      (p.poliza.includes(searchPoliza) ||
        p.cliente.toLowerCase().includes(searchPoliza.toLowerCase())) &&
      !store.movimientos.some((m) => m.poliza === p.poliza)
  )

  const handleAddPoliza = (p: (typeof POLIZAS_DISPONIBLES_MOCK)[0]) => {
    if (p.estatus === 'P') {
      alert('⚠️ Esta póliza ya ha sido pagada')
      return
    }
    const mov: MovimientoLiquidacion = {
      id: Date.now(), poliza: p.poliza, cliente: p.cliente, fecha: p.fecha,
      moneda: p.moneda, primaNeta: p.primaNeta, porcentajeComision: p.porcentajeComision,
      montoComision: p.montoComision, tipoCambio: p.tipoCambio, montoEnPesos: p.montoEnPesos,
      tipoMovimiento: p.tipoMovimiento, estatus: p.estatus,
    }
    store.addMovimiento(mov)
  }

  return (
    <div>
      <PageHeader title="Revisión de Movimientos" description={`${agente.nombre} — ${agente.rfc}`} />
      <Stepper steps={WIZARD_STEPS} currentStep={1} />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Left column */}
        <div className="xl:col-span-3 space-y-4">
          <Card>
            <Input label="Periodo de liquidación" value={store.periodoManual}
              onChange={(e) => store.setPeriodoManual(e.target.value)} placeholder="Ej: 202517A" />
          </Card>

          <Card padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {['Póliza','Cliente','Fecha','Mon.','Prima Neta','Comisión','T.C.','MXN','Tipo',''].map((h) => (
                      <th key={h} className="py-3 px-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {store.movimientos.map((m) => (
                    <tr key={m.id} className="hover:bg-bg">
                      <td className="py-2.5 px-3 font-mono text-xs">{m.poliza}</td>
                      <td className="py-2.5 px-3 text-xs max-w-[120px] truncate">{m.cliente}</td>
                      <td className="py-2.5 px-3 text-xs text-text-muted">{m.fecha}</td>
                      <td className="py-2.5 px-3"><Badge variant={m.moneda === 'USD' ? 'info' : 'default'}>{m.moneda}</Badge></td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-xs">{FMT(m.primaNeta)}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-xs">{FMT(m.montoComision)}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-xs text-text-muted">{m.tipoCambio ? `$${m.tipoCambio}` : '—'}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-xs font-semibold">{FMT(m.montoEnPesos)}</td>
                      <td className="py-2.5 px-3"><Badge variant={m.tipoMovimiento === 'COMISION' ? 'info' : 'warning'} className="text-[10px]">{m.tipoMovimiento}</Badge></td>
                      <td className="py-2.5 px-3 text-center">
                        <button onClick={() => store.removeMovimiento(m.id)} className="p-1 rounded hover:bg-danger-bg text-text-muted hover:text-danger transition-colors"><Minus size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Add policy */}
          <Card>
            <button onClick={() => setShowAddPanel(!showAddPanel)} className="w-full flex items-center justify-between text-sm font-medium text-avla-blue">
              <span className="flex items-center gap-2"><Plus size={16} /> Agregar póliza</span>
              {showAddPanel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showAddPanel && (
              <div className="mt-4 space-y-3">
                <SearchBar value={searchPoliza} onChange={setSearchPoliza} placeholder="Buscar por póliza o cliente..." />
                <div className="border border-border rounded-[var(--radius-md)] overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-border/50">
                      {filteredPolizas.map((p) => (
                        <tr key={p.poliza} className={`${p.estatus === 'P' ? 'opacity-50' : 'hover:bg-bg'}`}>
                          <td className="py-2 px-3 font-mono">{p.poliza}</td>
                          <td className="py-2 px-3">{p.cliente}</td>
                          <td className="py-2 px-3 text-right tabular-nums">{FMT(p.montoEnPesos)}</td>
                          <td className="py-2 px-3">
                            {p.estatus === 'P' ? (
                              <span className="text-warning flex items-center gap-1"><AlertTriangle size={12} /> Pagada</span>
                            ) : (
                              <button onClick={() => handleAddPoliza(p)} className="p-1 rounded bg-avla-blue-subtle text-avla-blue hover:bg-avla-blue hover:text-white transition-colors"><Plus size={14} /></button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right column */}
        <div className="xl:col-span-2 space-y-4">
          <RetentionBox agente={agente} resumen={resumen} />
          <Card className="bg-bg-alt">
            <p className="text-xs text-text-muted leading-relaxed"><strong>NOTA 1:</strong> Los montos en USD se convierten a MXN con el tipo de cambio de emisión.</p>
            <p className="text-xs text-text-muted leading-relaxed mt-2"><strong>NOTA 2:</strong> Retenciones se calculan según régimen fiscal y zona geográfica.</p>
          </Card>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
        <Link to="/liquidaciones-manuales"><Button variant="secondary"><ArrowLeft size={16} /> Regresar</Button></Link>
        <Button onClick={() => navigate('/liquidaciones-manuales/preview')} disabled={store.movimientos.length === 0}>Siguiente <ArrowRight size={16} /></Button>
      </div>
    </div>
  )
}
