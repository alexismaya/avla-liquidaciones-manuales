import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { LIQUIDACIONES_MOCK } from '@/mock/liquidaciones.mock'
import { Download, Eye, ArrowRight } from 'lucide-react'

const FMT = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

export default function GeneracionPDF() {
  const { semanaId } = useParams()

  return (
    <div>
      <PageHeader
        title="Paso 6 · Generación de PDF"
        description={`Semana ${semanaId ? `ID ${semanaId}` : ''} — Liquidaciones generadas para cada agente`}
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-bg-alt p-1 rounded-[var(--radius-md)] w-full sm:w-fit overflow-x-auto">
        <div className="px-4 py-2 rounded-md bg-avla-blue text-white text-sm font-medium">
          Generación de PDF
        </div>
        <Link
          to={`/operaciones/semanas/${semanaId}/paso-6/visualizacion`}
          className="px-4 py-2 rounded-md text-text-muted text-sm font-medium hover:text-text hover:bg-surface transition-colors"
        >
          Visualización y Envío
        </Link>
      </div>

      {/* Agent cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {LIQUIDACIONES_MOCK.map((liq) => (
          <Card key={liq.id} className="hover:shadow-[var(--shadow-elevated)] transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <StatusBadge status={liq.estatus} />
              <span className="text-xs text-text-subtle font-mono">{liq.idLiquidacion}</span>
            </div>

            <h3 className="font-heading text-sm font-semibold text-text mb-1">{liq.agente}</h3>
            <p className="text-xs text-text-muted mb-1">{liq.rfc}</p>
            <p className="text-xs text-text-muted mb-4">Ejecutivo: {liq.ejecutivo}</p>

            <div className="bg-avla-blue-subtle rounded-[var(--radius-md)] px-4 py-3 mb-4">
              <p className="text-xs text-avla-blue mb-0.5">Monto Total</p>
              <p className="text-xl font-heading font-bold text-avla-blue tabular-nums">{FMT(liq.resumen.total)}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => alert('Vista previa (simulación)')}>
                <Eye size={14} />
                Vista previa
              </Button>
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => alert('Descarga de PDF (simulación)')}>
                <Download size={14} />
                Descargar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end">
        <Link to={`/operaciones/semanas/${semanaId}/paso-6/visualizacion`}>
          <Button>
            Continuar a Visualización
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
