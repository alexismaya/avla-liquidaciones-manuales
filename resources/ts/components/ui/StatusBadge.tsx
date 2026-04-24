const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  A:           { label: 'Anulada',              color: 'bg-danger-bg text-danger' },
  AP1:         { label: 'Adeudo',               color: 'bg-warning-bg text-warning' },
  CI:          { label: 'Cambio Intermediario',  color: 'bg-info-bg text-info' },
  D:           { label: 'Directo',              color: 'bg-bg-alt text-text-muted' },
  L:           { label: 'Liquidado',            color: 'bg-success-bg text-success' },
  LN:          { label: 'Comisión Bloqueada',   color: 'bg-danger-bg text-danger' },
  NL:          { label: 'Pend. Pago Emisión',   color: 'bg-warning-bg text-warning' },
  NLL:         { label: 'Pend. Pago Endoso',    color: 'bg-warning-bg text-warning' },
  P:           { label: 'Pagado',               color: 'bg-success-bg text-success' },
  PC:          { label: 'Ret. Contrato',        color: 'bg-info-bg text-info' },
  PG:          { label: 'Ret. Garantía',        color: 'bg-info-bg text-info' },
  NP:          { label: 'No Pagar',             color: 'bg-danger-bg text-danger' },
  POR_LIQUIDAR:{ label: 'Por Liquidar',         color: 'bg-avla-blue-subtle text-avla-blue' },
  QUEBRANTO:   { label: 'Quebranto',            color: 'bg-bg-alt text-text-muted' },
  ACTIVO:      { label: 'Activo',               color: 'bg-success-bg text-success' },
  BLOQUEADO:   { label: 'Bloqueado',            color: 'bg-danger-bg text-danger' },
  GENERADO:    { label: 'Generado',             color: 'bg-info-bg text-info' },
  ENVIADO:     { label: 'Enviado',              color: 'bg-avla-blue-subtle text-avla-blue' },
  PAGADO:      { label: 'Pagado',               color: 'bg-success-bg text-success' },
  PENDIENTE:   { label: 'Pendiente',            color: 'bg-warning-bg text-warning' },
  ABIERTA:     { label: 'Abierta',              color: 'bg-info-bg text-info' },
  EN_PROCESO:  { label: 'En Proceso',           color: 'bg-warning-bg text-warning' },
  CERRADA:     { label: 'Cerrada',              color: 'bg-success-bg text-success' },
}

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, color: 'bg-bg-alt text-text-muted' }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}
