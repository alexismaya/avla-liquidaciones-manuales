import type { Agente } from '@/types/agente.types'
import type { ResumenPago } from '@/types/liquidacion.types'

interface RetentionBoxProps {
  agente: Agente
  resumen: ResumenPago
}

const FMT = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
const PCT = (n: number) => `${(n * 100).toFixed(4).replace(/\.?0+$/, '')}%`

export function RetentionBox({ agente, resumen }: RetentionBoxProps) {
  const { regimenFiscal, zonaGeografica, retenciones } = agente
  const isFronteriza = zonaGeografica === 'FRONTERIZA'

  const LABEL_REGIMEN: Record<string, string> = {
    MORAL: 'Persona Moral',
    FISICA_EMPRESARIAL: 'Persona Física con Actividad Empresarial',
    RESICO: 'RESICO',
  }

  return (
    <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
      {/* Header */}
      <div className="bg-avla-dark px-4 py-3 flex items-center justify-between">
        <p className="text-white text-sm font-semibold font-heading">Resumen de Pago</p>
        <span className="text-white/50 text-xs">
          {LABEL_REGIMEN[regimenFiscal]} · {isFronteriza ? 'Zona Fronteriza' : 'Resto del País'}
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        <Row label="Comisión del periodo" value={FMT(resumen.comisionPeriodo)} />
        <Row label={`IVA ${PCT(retenciones.iva)}`} value={FMT(resumen.iva)} />
        {regimenFiscal !== 'MORAL' && resumen.subtotal != null && (
          <Row label="SUBTOTAL" value={FMT(resumen.subtotal)} bold />
        )}
        {retenciones.retencionISR != null && resumen.retencionISR != null && (
          <Row label={`Ret. ISR ${PCT(retenciones.retencionISR)}`} value={`-${FMT(resumen.retencionISR)}`} negative />
        )}
        {retenciones.retencionIVA != null && resumen.retencionIVA != null && (
          <Row label={`Ret. IVA ${PCT(retenciones.retencionIVA)}`} value={`-${FMT(resumen.retencionIVA)}`} negative />
        )}
        <Row label="TOTAL A PAGAR" value={FMT(resumen.total)} bold highlight />
      </div>
    </div>
  )
}

function Row({ label, value, bold, negative, highlight }: {
  label: string; value: string; bold?: boolean; negative?: boolean; highlight?: boolean
}) {
  return (
    <div className={`flex justify-between items-center px-4 py-3 text-sm
      ${highlight ? 'bg-avla-blue-subtle' : ''}
    `}>
      <span className={`${bold ? 'font-semibold text-text' : 'text-text-muted'}`}>{label}</span>
      <span className={`font-semibold tabular-nums
        ${highlight ? 'text-avla-blue text-base' : ''}
        ${negative ? 'text-danger' : 'text-text'}
      `}>{value}</span>
    </div>
  )
}
