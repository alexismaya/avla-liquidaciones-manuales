import type { PolizaDisponible } from '@/types/poliza.types'

export const POLIZAS_DISPONIBLES_MOCK: PolizaDisponible[] = [
  {
    poliza: '7890125', cliente: 'FEMSA S.A. DE C.V.',
    fecha: '2025-04-16', moneda: 'MXN', primaNeta: 45000,
    porcentajeComision: 11, montoComision: 4950, montoEnPesos: 4950,
    tipoMovimiento: 'COMISION', estatus: 'NL',
  },
  {
    poliza: '7890126', cliente: 'LIVERPOOL S.A. DE C.V.',
    fecha: '2025-04-17', moneda: 'MXN', primaNeta: 32000,
    porcentajeComision: 12, montoComision: 3840, montoEnPesos: 3840,
    tipoMovimiento: 'COMISION', estatus: 'NL',
  },
  {
    poliza: '7890127', cliente: 'SORIANA OPERADORA',
    fecha: '2025-04-18', moneda: 'USD', primaNeta: 2500,
    porcentajeComision: 10, montoComision: 250, tipoCambio: 17.30,
    montoEnPesos: 4325, tipoMovimiento: 'MAQUILA', estatus: 'NL',
  },
  {
    poliza: '7890129', cliente: 'WALMART DE MÉXICO',
    fecha: '2025-04-19', moneda: 'MXN', primaNeta: 67000,
    porcentajeComision: 9, montoComision: 6030, montoEnPesos: 6030,
    tipoMovimiento: 'COMISION', estatus: 'P',
  },
]
