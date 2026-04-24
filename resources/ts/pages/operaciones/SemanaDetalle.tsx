import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Stepper } from '@/components/ui/Stepper'
import { SEMANAS_MOCK } from '@/mock/semanas.mock'
import { Check, Clock, Lock, ArrowLeft, ArrowRight, FileText, Upload, Tag, CheckCircle, Shield, FileOutput } from 'lucide-react'

const PASO_ICONS = [FileText, Upload, Tag, CheckCircle, Shield, FileOutput]

const PASO_DESCRIPTIONS = [
  'Preparar el listado de producción para la semana seleccionada.',
  'Cargar los datos de comisiones al libro de producción.',
  'Asignar estatus a cada movimiento según reglas de negocio.',
  'Validar los movimientos contra los datos de cobranza.',
  'Aplicar bloqueos o desbloqueos de comisiones según criterios.',
  'Generar las liquidaciones de comisiones en PDF y enviar correos.',
]

export default function SemanaDetalle() {
  const { semanaId } = useParams()
  const semana = SEMANAS_MOCK.find((s) => s.id === Number(semanaId))

  if (!semana) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Semana no encontrada</p>
        <Link to="/operaciones" className="text-avla-blue text-sm mt-2 inline-block">← Regresar</Link>
      </div>
    )
  }

  const currentStepIndex = semana.pasos.findIndex((p) => p.estado === 'EN_PROGRESO')
  const stepperCurrent = currentStepIndex >= 0 ? currentStepIndex : semana.pasos.every((p) => p.estado === 'COMPLETADO') ? 6 : 0

  return (
    <div>
      <PageHeader
        title={`Semana ${semana.periodo}`}
        description={`${semana.fechaInicio} — ${semana.fechaFin}`}
        actions={<StatusBadge status={semana.estatus} />}
      />

      {/* Stepper */}
      <Stepper
        steps={semana.pasos.map((p) => ({ label: p.nombre }))}
        currentStep={stepperCurrent}
      />

      {/* Step cards */}
      <div className="space-y-3">
        {semana.pasos.map((paso, idx) => {
          const Icon = PASO_ICONS[idx]
          const isCompletado = paso.estado === 'COMPLETADO'
          const isEnProgreso = paso.estado === 'EN_PROGRESO'
          const isBloqueado = paso.estado === 'BLOQUEADO'

          return (
            <Card key={paso.numero} className={`flex items-center gap-4 ${isBloqueado ? 'opacity-50' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isCompletado ? 'bg-success-bg' :
                isEnProgreso ? 'bg-warning-bg' :
                'bg-bg-alt'
              }`}>
                {isCompletado ? (
                  <Check size={18} className="text-success" />
                ) : isEnProgreso ? (
                  <Clock size={18} className="text-warning" />
                ) : isBloqueado ? (
                  <Lock size={18} className="text-text-subtle" />
                ) : (
                  <Icon size={18} className="text-text-muted" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-muted">PASO {paso.numero}</span>
                  <StatusBadge status={
                    isCompletado ? 'COMPLETADO' :
                    isEnProgreso ? 'EN_PROGRESO' :
                    isBloqueado ? 'BLOQUEADO' : 'PENDIENTE'
                  } />
                </div>
                <p className="text-sm font-medium text-text mt-0.5">{paso.nombre}</p>
                <p className="text-xs text-text-muted mt-0.5">{PASO_DESCRIPTIONS[idx]}</p>
              </div>

              {/* Action for step 6 */}
              {paso.numero === 6 && !isBloqueado && (
                <Link to={`/operaciones/semanas/${semana.id}/paso-6/generacion`}>
                  <Button size="sm">
                    Ir a Generación
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              )}
            </Card>
          )
        })}
      </div>

      <div className="mt-8">
        <Link to="/operaciones">
          <Button variant="ghost">
            <ArrowLeft size={16} />
            Regresar a Operaciones
          </Button>
        </Link>
      </div>
    </div>
  )
}
