import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Stepper } from '@/components/ui/Stepper'
import { useLiquidacionManualStore } from '@/store/liquidacionManualStore'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import { CheckCircle, FileText, RefreshCcw, Eye, Mail } from 'lucide-react'

const WIZARD_STEPS = [
  { label: 'Selección' },
  { label: 'Revisión' },
  { label: 'Vista Previa' },
  { label: 'Completado' },
]

export default function LiquidacionCompletada() {
  const store = useLiquidacionManualStore()
  const agente = AGENTES_MOCK.find((a) => a.id === store.agenteId)

  const actions = [
    { icon: FileText, label: 'PDF generado', done: true },
    { icon: RefreshCcw, label: 'Periodo actualizado en LP de comisiones', done: true },
    { icon: Mail, label: 'Correo enviado al ejecutivo del agente', done: true },
  ]

  return (
    <div>
      <PageHeader title="Liquidación Completada" />
      <Stepper steps={WIZARD_STEPS} currentStep={4} />

      <Card className="max-w-lg mx-auto text-center py-10">
        {/* Animated check */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-bg mb-6
          animate-[scaleIn_0.4s_ease-out]">
          <CheckCircle size={40} className="text-success" />
        </div>

        <h2 className="font-heading text-xl font-bold text-text mb-2">
          ¡Liquidación generada exitosamente!
        </h2>
        <p className="text-sm text-text-muted mb-8">
          {agente?.nombre || 'Intermediario'} — Periodo {store.periodoManual || 'N/A'}
        </p>

        {/* Actions list */}
        <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
          {actions.map((action) => (
            <div key={action.label} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-success-bg flex items-center justify-center shrink-0">
                <action.icon size={14} className="text-success" />
              </div>
              <span className="text-sm text-text">{action.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/operaciones">
            <Button>
              <Eye size={16} />
              Ir a Visualización
            </Button>
          </Link>
          <Link to="/liquidaciones-manuales" onClick={() => store.reset()}>
            <Button variant="secondary">
              <RefreshCcw size={16} />
              Nueva liquidación manual
            </Button>
          </Link>
        </div>
      </Card>

      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
