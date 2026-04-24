import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Stepper } from '@/components/ui/Stepper'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import { useLiquidacionManualStore } from '@/store/liquidacionManualStore'
import { Eye, X, AlertTriangle, Info } from 'lucide-react'

const WIZARD_STEPS = [
  { label: 'Selección' },
  { label: 'Revisión' },
  { label: 'Vista Previa' },
  { label: 'Completado' },
]

const PERIODOS_MOCK = [
  { value: '202516A', label: '202516A — Abr 14-20, 2025' },
  { value: '202515A', label: '202515A — Abr 7-13, 2025' },
  { value: '202514A', label: '202514A — Mar 31 - Abr 6, 2025 (PAGADO)', disabled: true },
]

export default function LiquidacionesManualIndex() {
  const navigate = useNavigate()
  const store = useLiquidacionManualStore()

  const [selectionMode, setSelectionMode] = useState<'date' | 'period'>('date')
  const [selectedPeriodo, setSelectedPeriodo] = useState('')

  const selectedAgente = AGENTES_MOCK.find((a) => a.id === store.agenteId)
  const isPeriodoPagado = selectedPeriodo === '202514A'

  const canContinue = store.agenteId && (
    (selectionMode === 'date' && store.fechaDesde && store.fechaHasta) ||
    (selectionMode === 'period' && selectedPeriodo && !isPeriodoPagado)
  )

  const handleContinue = () => {
    if (selectionMode === 'period') {
      store.setPeriodo(selectedPeriodo)
    }
    navigate('/liquidaciones-manuales/revision')
  }

  return (
    <div>
      <PageHeader
        title="Liquidaciones Manuales"
        description="Genera liquidaciones de comisiones fuera del proceso semanal"
      />

      <Stepper steps={WIZARD_STEPS} currentStep={0} />

      <Card className="max-w-3xl mx-auto">
        {/* Section 1 — Agent */}
        <div className="mb-6">
          <h2 className="font-heading text-base font-semibold text-text mb-1">Intermediario</h2>
          <p className="text-xs text-text-muted mb-3">Selecciona al intermediario a quien se le generará su liquidación</p>
          <Select
            options={AGENTES_MOCK.filter((a) => a.estatus === 'ACTIVO').map((a) => ({ value: String(a.id), label: `${a.nombre} — ${a.rfc}` }))}
            value={store.agenteId ? String(store.agenteId) : ''}
            onChange={(e) => store.setAgente(Number(e.target.value))}
            placeholder="Selecciona un intermediario..."
          />
          {selectedAgente && (
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-avla-blue-subtle text-avla-blue">
                {selectedAgente.regimenFiscal === 'MORAL' ? 'Persona Moral' :
                 selectedAgente.regimenFiscal === 'FISICA_EMPRESARIAL' ? 'P. Física Empresarial' : 'RESICO'}
              </span>
              <span className="text-xs text-text-muted">
                {selectedAgente.zonaGeografica === 'FRONTERIZA' ? 'Zona Fronteriza' : 'Resto del País'}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <h2 className="font-heading text-base font-semibold text-text mb-1">Tipo de Liquidación</h2>
          <div className="flex items-center gap-4 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={store.incluirComision}
                onChange={(e) => store.setIncluirComision(e.target.checked)}
                className="rounded border-border text-avla-blue focus:ring-avla-blue"
              />
              <span className="text-sm text-text">Comisión</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={store.incluirMaquila}
                onChange={(e) => store.setIncluirMaquila(e.target.checked)}
                className="rounded border-border text-avla-blue focus:ring-avla-blue"
              />
              <span className="text-sm text-text">Maquila</span>
            </label>
          </div>
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <h2 className="font-heading text-base font-semibold text-text mb-3">Período o Rango de Fechas</h2>

          {/* Toggle */}
          <div className="flex gap-1 bg-bg-alt p-1 rounded-[var(--radius-md)] w-fit mb-4">
            <button
              onClick={() => setSelectionMode('date')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectionMode === 'date' ? 'bg-avla-blue text-white' : 'text-text-muted hover:text-text'
              }`}
            >
              Rango de fechas
            </button>
            <button
              onClick={() => setSelectionMode('period')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectionMode === 'period' ? 'bg-avla-blue text-white' : 'text-text-muted hover:text-text'
              }`}
            >
              Periodo existente
            </button>
          </div>

          {selectionMode === 'date' ? (
            <DateRangePicker
              fromDate={store.fechaDesde}
              toDate={store.fechaHasta}
              onFromChange={(d) => store.setFechas(d, store.fechaHasta || '')}
              onToChange={(d) => store.setFechas(store.fechaDesde || '', d)}
              label="Selecciona el rango de fechas"
            />
          ) : (
            <div className="space-y-2">
              <Select
                label="Selecciona un periodo"
                options={PERIODOS_MOCK.map((p) => ({ value: p.value, label: p.label }))}
                value={selectedPeriodo}
                onChange={(e) => setSelectedPeriodo(e.target.value)}
                placeholder="Selecciona un periodo..."
              />
              {isPeriodoPagado && (
                <div className="flex items-start gap-2 p-3 rounded-[var(--radius-md)] bg-warning-bg">
                  <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                  <p className="text-sm text-warning">⚠️ Este periodo ya ha sido pagado</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-info-bg border border-avla-blue/15 rounded-[var(--radius-md)] p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-avla-blue shrink-0 mt-0.5" />
            <div className="text-xs text-avla-blue space-y-1">
              <p>1. Selecciona al intermediario</p>
              <p>2. Indica el periodo o rango de fechas</p>
              <p>3. Presiona el 👁 para ver la vista previa</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Link to="/operaciones">
            <Button variant="secondary">
              <X size={14} />
              Cancelar
            </Button>
          </Link>
          <Button onClick={handleContinue} disabled={!canContinue}>
            <Eye size={16} />
            Vista previa
          </Button>
        </div>
      </Card>
    </div>
  )
}
