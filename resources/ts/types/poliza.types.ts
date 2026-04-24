import type { TipoMovimiento, EstatusMovimiento, Moneda } from './liquidacion.types'

export interface PolizaDisponible {
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
