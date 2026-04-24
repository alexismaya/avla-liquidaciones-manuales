export type EstatusMovimiento =
  | 'A' | 'AP1' | 'CI' | 'D' | 'E'
  | 'L' | 'LN' | 'LND' | 'NL' | 'NLL'
  | 'P' | 'PC' | 'PG' | 'NP' | 'POR_LIQUIDAR' | 'QUEBRANTO'

export type TipoMovimiento = 'COMISION' | 'MAQUILA'
export type Moneda = 'MXN' | 'USD'

export interface MovimientoLiquidacion {
  id: number
  poliza: string
  cliente: string
  fecha: string
  moneda: Moneda
  primaNeta: number
  porcentajeComision: number
  montoComision: number
  tipoCambio?: number
  montoEnPesos: number
  tipoMovimiento: TipoMovimiento
  estatus: EstatusMovimiento
}

export interface ResumenPago {
  comisionPeriodo: number
  iva: number
  subtotal?: number
  retencionISR?: number
  retencionIVA?: number
  total: number
}

export interface Liquidacion {
  id: number
  idLiquidacion: string
  agenteId: number
  agente: string
  rfc: string
  ejecutivo: string
  periodo: string
  movimientos: MovimientoLiquidacion[]
  resumen: ResumenPago
  estatus: 'PENDIENTE' | 'GENERADO' | 'ENVIADO' | 'PAGADO'
  pdfUrl?: string
  fechaGeneracion?: string
}
