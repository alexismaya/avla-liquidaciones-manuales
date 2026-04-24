import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Stepper } from '@/components/ui/Stepper'
import { Badge } from '@/components/ui/Badge'
import { useLiquidacionManualStore } from '@/store/liquidacionManualStore'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import { ArrowLeft, Download, CheckCircle } from 'lucide-react'

const WIZARD_STEPS = [
  { label: 'Selección' },
  { label: 'Revisión' },
  { label: 'Vista Previa' },
  { label: 'Completado' },
]

const FMT = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

export default function LiquidacionPreviewPDF() {
  const navigate = useNavigate()
  const store = useLiquidacionManualStore()
  const agente = AGENTES_MOCK.find((a) => a.id === store.agenteId)

  return (
    <div>
      <PageHeader title="Vista Previa del PDF" description="Revisa el documento antes de finalizar" />
      <Stepper steps={WIZARD_STEPS} currentStep={2} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — PDF Mock */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow-[var(--shadow-elevated)] border border-border rounded-[var(--radius-lg)] p-4 sm:p-6 md:p-8">
            {/* PDF Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-avla-blue">
              <div className="w-24 h-10 bg-gradient-to-r from-avla-blue to-avla-blue-light rounded-md flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">AVLA</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted">Fecha de generación</p>
                <p className="text-sm font-medium text-text">{new Date().toLocaleDateString('es-MX')}</p>
              </div>
            </div>

            <h2 className="font-heading text-lg font-bold text-text text-center mb-6">
              LIQUIDACIÓN DE COMISIONES
            </h2>

            {/* Agent info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 text-sm">
              <div>
                <p className="text-text-muted text-xs">Intermediario</p>
                <p className="font-medium text-text">{agente?.nombre || 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">RFC</p>
                <p className="font-medium text-text">{agente?.rfc || 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Periodo</p>
                <p className="font-medium text-text">{store.periodoManual || 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Ejecutivo</p>
                <p className="font-medium text-text">{agente?.ejecutivoResponsable || 'N/A'}</p>
              </div>
            </div>

            {/* Mini table */}
            <table className="w-full text-xs mb-6">
              <thead>
                <tr className="bg-avla-dark text-white">
                  <th className="py-2 px-3 text-left">Póliza</th>
                  <th className="py-2 px-3 text-left">Cliente</th>
                  <th className="py-2 px-3 text-right">Monto MXN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {store.movimientos.slice(0, 5).map((m) => (
                  <tr key={m.id}>
                    <td className="py-2 px-3 font-mono">{m.poliza}</td>
                    <td className="py-2 px-3">{m.cliente}</td>
                    <td className="py-2 px-3 text-right tabular-nums">{FMT(m.montoEnPesos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {store.movimientos.length > 5 && (
              <p className="text-xs text-text-subtle text-center mb-4">
                ... y {store.movimientos.length - 5} movimientos más
              </p>
            )}

            {/* Total */}
            <div className="bg-avla-blue-subtle rounded-md p-4 text-right">
              <span className="text-sm text-avla-blue mr-4">TOTAL A PAGAR</span>
              <span className="text-xl font-heading font-bold text-avla-blue tabular-nums">
                {FMT(store.movimientos.reduce((s, m) => s + m.montoEnPesos, 0))}
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="secondary" onClick={() => alert('Descarga de PDF (simulación)')}>
              <Download size={16} />
              Descargar PDF
            </Button>
          </div>
        </div>

        {/* Right — Actions */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-heading text-base font-semibold text-text mb-4">Instrucciones</h3>
            <div className="space-y-3 text-sm text-text-muted">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-avla-blue-subtle text-avla-blue flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <p>Valida que el previo de tu PDF sea correcto</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-avla-blue-subtle text-avla-blue flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <p>Presiona <strong>Descargar</strong> para obtener el archivo</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-avla-blue-subtle text-avla-blue flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <p>Presiona <strong>✅ Finalizar</strong> para completar el proceso</p>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full" onClick={() => navigate('/liquidaciones-manuales/completado')}>
                <CheckCircle size={16} />
                Finalizar proceso
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <Link to="/liquidaciones-manuales/revision">
          <Button variant="secondary">
            <ArrowLeft size={16} />
            Regresar
          </Button>
        </Link>
      </div>
    </div>
  )
}
