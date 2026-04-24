import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Tooltip } from '@/components/ui/Tooltip'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { LIQUIDACIONES_MOCK } from '@/mock/liquidaciones.mock'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import { Search, Download, Link2, Eye } from 'lucide-react'

const FMT = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

export default function GeneracionPDFUnificado() {
  const [selected, setSelected] = useState<number[]>([])
  const [showUnify, setShowUnify] = useState(false)
  const [searchAgent, setSearchAgent] = useState('')
  const [searchPoliza, setSearchPoliza] = useState('')
  const [searchPeriodo, setSearchPeriodo] = useState('')

  const filtered = LIQUIDACIONES_MOCK.filter((l) => {
    if (searchAgent && !l.agente.toLowerCase().includes(searchAgent.toLowerCase())) return false
    if (searchPeriodo && l.periodo !== searchPeriodo) return false
    return true
  })

  const toggleSelect = (id: number) => {
    setSelected((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id])
  }

  const toggleAll = () => {
    const selectable = filtered.filter((l) => l.estatus !== 'PAGADO').map((l) => l.id)
    if (selectable.every((id) => selected.includes(id))) {
      setSelected(selected.filter((id) => !selectable.includes(id)))
    } else {
      setSelected([...new Set([...selected, ...selectable])])
    }
  }

  return (
    <div>
      <PageHeader
        title="Generación PDF · Liquidaciones Previas"
        description="Consulta, descarga y unifica liquidaciones pendientes de pago"
      />

      {/* Search panel */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Select
            label="Intermediario Líder"
            options={[{ value: '', label: 'Todos' }, ...AGENTES_MOCK.map((a) => ({ value: a.nombre, label: a.nombre }))]}
            value={searchAgent}
            onChange={(e) => setSearchAgent(e.target.value)}
          />
          <Input label="Número de Póliza" value={searchPoliza} onChange={(e) => setSearchPoliza(e.target.value)} placeholder="Ej: 7890123" />
          <Select
            label="Periodo"
            options={[{ value: '', label: 'Todos' }, { value: '202516A', label: '202516A' }, { value: '202517A', label: '202517A' }]}
            value={searchPeriodo}
            onChange={(e) => setSearchPeriodo(e.target.value)}
          />
          <Button>
            <Search size={16} />
            Buscar
          </Button>
        </div>
      </Card>

      {/* Selection actions bar */}
      {selected.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 p-3 rounded-[var(--radius-md)] bg-avla-blue-subtle border border-avla-blue/20">
          <span className="text-sm font-medium text-avla-blue">{selected.length} liquidaciones seleccionadas</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => alert('Descarga seleccionadas (simulación)')}>
              <Download size={14} />
              <span className="hidden sm:inline">Descargar seleccionadas</span>
              <span className="sm:hidden">Descargar</span>
            </Button>
            <Button size="sm" onClick={() => setShowUnify(true)}>
              <Link2 size={14} />
              <span className="hidden sm:inline">Unificar seleccionadas</span>
              <span className="sm:hidden">Unificar</span>
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto -mx-0">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left">
                  <input type="checkbox" className="rounded border-border text-avla-blue focus:ring-avla-blue" onChange={toggleAll} checked={filtered.filter((l) => l.estatus !== 'PAGADO').length > 0 && filtered.filter((l) => l.estatus !== 'PAGADO').every((l) => selected.includes(l.id))} />
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">ID Liquidación</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Intermediario</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Periodo</th>
                <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Monto Total</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Fecha Gen.</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Estatus</th>
                <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((liq) => {
                const isPagado = liq.estatus === 'PAGADO'
                return (
                  <tr key={liq.id} className={`transition-colors ${isPagado ? 'opacity-50' : 'hover:bg-bg'}`}>
                    <td className="py-3 px-4">
                      {isPagado ? (
                        <Tooltip content="Ya pagada">
                          <input type="checkbox" disabled className="rounded border-border opacity-30" />
                        </Tooltip>
                      ) : (
                        <input type="checkbox" className="rounded border-border text-avla-blue focus:ring-avla-blue" checked={selected.includes(liq.id)} onChange={() => toggleSelect(liq.id)} />
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{liq.idLiquidacion}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-text">{liq.agente}</p>
                      <p className="text-xs text-text-muted">{liq.rfc}</p>
                    </td>
                    <td className="py-3 px-4 text-text-muted">{liq.periodo}</td>
                    <td className="py-3 px-4 text-right font-semibold tabular-nums">{FMT(liq.resumen.total)}</td>
                    <td className="py-3 px-4 text-text-muted text-xs">{liq.fechaGeneracion}</td>
                    <td className="py-3 px-4"><StatusBadge status={liq.estatus} /></td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-md hover:bg-bg text-text-muted" onClick={() => alert('Vista previa (simulación)')}>
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-bg text-text-muted" onClick={() => alert('Descarga (simulación)')}>
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <ConfirmDialog
        open={showUnify}
        onClose={() => setShowUnify(false)}
        onConfirm={() => alert(`Unificación de ${selected.length} liquidaciones (simulación)`)}
        title="Unificar liquidaciones"
        description={`Se unificarán ${selected.length} liquidaciones. Confirma que deseas continuar.`}
        confirmLabel="Unificar"
        warning="No se pueden unificar liquidaciones ya pagadas. El periodo en el LP será actualizado automáticamente."
      />
    </div>
  )
}
