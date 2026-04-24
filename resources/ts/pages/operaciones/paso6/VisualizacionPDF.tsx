import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { SearchBar } from '@/components/shared/SearchBar'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { LIQUIDACIONES_MOCK } from '@/mock/liquidaciones.mock'
import { Mail, Eye, Download, AlertTriangle } from 'lucide-react'

const FMT = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

export default function VisualizacionPDF() {
  const { semanaId } = useParams()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [showConfirm, setShowConfirm] = useState(false)

  const filtered = LIQUIDACIONES_MOCK.filter(
    (l) =>
      l.agente.toLowerCase().includes(search.toLowerCase()) ||
      l.rfc.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const toggleAll = () => {
    const selectable = filtered.filter((l) => l.estatus !== 'PAGADO').map((l) => l.id)
    if (selectable.every((id) => selected.includes(id))) {
      setSelected(selected.filter((id) => !selectable.includes(id)))
    } else {
      setSelected([...new Set([...selected, ...selectable])])
    }
  }

  const hasPagados = LIQUIDACIONES_MOCK.some((l) => l.estatus === 'PAGADO')

  return (
    <div>
      <PageHeader
        title="Paso 6 · Visualización y Envío"
        description="Selecciona liquidaciones para envío masivo de correos"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-bg-alt p-1 rounded-[var(--radius-md)] w-fit">
        <Link
          to={`/operaciones/semanas/${semanaId}/paso-6/generacion`}
          className="px-4 py-2 rounded-md text-text-muted text-sm font-medium hover:text-text hover:bg-surface transition-colors"
        >
          Generación de PDF
        </Link>
        <div className="px-4 py-2 rounded-md bg-avla-blue text-white text-sm font-medium">
          Visualización y Envío
        </div>
      </div>

      {/* Warning */}
      {hasPagados && (
        <div className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-warning-bg mb-4">
          <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-warning">Las liquidaciones con estatus "Pagado" no pueden ser seleccionadas para envío.</p>
        </div>
      )}

      {/* Actions bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="max-w-sm flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o RFC..." />
        </div>
        <div className="flex items-center gap-3">
          {selected.length > 0 && (
            <span className="text-sm text-text-muted">{selected.length} seleccionadas</span>
          )}
          <Button
            onClick={() => setShowConfirm(true)}
            disabled={selected.length === 0}
          >
            <Mail size={16} />
            Enviar correos masivos
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-border text-avla-blue focus:ring-avla-blue"
                    onChange={toggleAll}
                    checked={filtered.filter((l) => l.estatus !== 'PAGADO').every((l) => selected.includes(l.id))}
                  />
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">ID Liquidación</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Intermediario</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Ejecutivo</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Periodo</th>
                <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Monto Total</th>
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
                      <input
                        type="checkbox"
                        className="rounded border-border text-avla-blue focus:ring-avla-blue"
                        checked={selected.includes(liq.id)}
                        onChange={() => toggleSelect(liq.id)}
                        disabled={isPagado}
                      />
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{liq.idLiquidacion}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-text">{liq.agente}</p>
                      <p className="text-xs text-text-muted">{liq.rfc}</p>
                    </td>
                    <td className="py-3 px-4 text-text-muted">{liq.ejecutivo}</td>
                    <td className="py-3 px-4 text-text-muted">{liq.periodo}</td>
                    <td className="py-3 px-4 text-right font-semibold tabular-nums">
                      {FMT(liq.resumen.total)}
                    </td>
                    <td className="py-3 px-4"><StatusBadge status={liq.estatus} /></td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-md hover:bg-bg text-text-muted" title="Vista previa" onClick={() => alert('Vista previa (simulación)')}>
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-bg text-text-muted" title="Descargar" onClick={() => alert('Descarga (simulación)')}>
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

      {/* Confirm dialog */}
      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => alert(`Correos enviados a ${selected.length} liquidaciones (simulación)`)}
        title="Confirmar envío masivo"
        description={`Se enviarán correos a ${selected.length} intermediarios con su liquidación de comisiones adjunta.`}
        confirmLabel="Enviar correos"
      />
    </div>
  )
}
