import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SEMANAS_MOCK } from '@/mock/semanas.mock'
import { LIQUIDACIONES_MOCK } from '@/mock/liquidaciones.mock'
import { Calendar, FileText, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function OperacionesIndex() {
  const semanasActivas = SEMANAS_MOCK.filter((s) => s.estatus !== 'CERRADA').length
  const liquidacionesGeneradas = LIQUIDACIONES_MOCK.filter((l) => l.estatus === 'GENERADO').length
  const correosPendientes = LIQUIDACIONES_MOCK.filter((l) => l.estatus === 'GENERADO').length

  const stats = [
    {
      label: 'Semanas Activas',
      value: semanasActivas,
      icon: Calendar,
      color: 'text-avla-blue',
      bgColor: 'bg-avla-blue-subtle',
    },
    {
      label: 'Liquidaciones Generadas',
      value: liquidacionesGeneradas,
      icon: FileText,
      color: 'text-success',
      bgColor: 'bg-success-bg',
    },
    {
      label: 'Correos Pendientes',
      value: correosPendientes,
      icon: Mail,
      color: 'text-warning',
      bgColor: 'bg-warning-bg',
    },
  ]

  return (
    <div>
      <PageHeader
        title="Operaciones"
        description="Gestión semanal del proceso de liquidación de comisiones"
      />

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon size={22} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Semanas grid */}
      <h2 className="font-heading text-lg font-semibold text-text mb-4">Semanas de Operación</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SEMANAS_MOCK.map((semana) => {
          const completados = semana.pasos.filter((p) => p.estado === 'COMPLETADO').length
          const total = semana.pasos.length
          const progreso = (completados / total) * 100

          return (
            <Card key={semana.id} className="hover:shadow-[var(--shadow-elevated)] transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="font-heading text-base font-semibold text-text">
                      Semana {semana.periodo}
                    </h3>
                    <StatusBadge status={semana.estatus} />
                  </div>
                  <p className="text-sm text-text-muted">
                    {semana.fechaInicio} — {semana.fechaFin}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-text-muted">Progreso</span>
                  <span className="text-xs font-semibold text-text">{completados}/{total} pasos</span>
                </div>
                <div className="w-full h-2 bg-bg-alt rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-avla-blue to-avla-blue-light rounded-full transition-all duration-500"
                    style={{ width: `${progreso}%` }}
                  />
                </div>
              </div>

              {/* Steps preview */}
              <div className="flex gap-1.5 mb-4">
                {semana.pasos.map((paso) => (
                  <div
                    key={paso.numero}
                    className={`flex-1 h-1.5 rounded-full ${
                      paso.estado === 'COMPLETADO' ? 'bg-success' :
                      paso.estado === 'EN_PROGRESO' ? 'bg-warning' :
                      'bg-border'
                    }`}
                    title={`${paso.numero}. ${paso.nombre} — ${paso.estado}`}
                  />
                ))}
              </div>

              <Link to={`/operaciones/semanas/${semana.id}`}>
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  Ver detalle
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
