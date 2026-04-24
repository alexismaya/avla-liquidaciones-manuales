import type { Liquidacion } from '@/types/liquidacion.types'

export const LIQUIDACIONES_MOCK: Liquidacion[] = [
  {
    id: 1,
    idLiquidacion: 'LIQ-202516-001',
    agenteId: 1,
    agente: 'Grupo Asegurador del Norte S.A. de C.V.',
    rfc: 'GAN010203AB1',
    ejecutivo: 'Carlos Mendoza',
    periodo: '202516A',
    estatus: 'GENERADO',
    fechaGeneracion: '2025-04-20',
    movimientos: [
      {
        id: 1, poliza: '7890123', cliente: 'BIMBO S.A. DE C.V.',
        fecha: '2025-04-14', moneda: 'MXN', primaNeta: 58400,
        porcentajeComision: 12, montoComision: 7008, montoEnPesos: 7008,
        tipoMovimiento: 'COMISION', estatus: 'NL',
      },
      {
        id: 2, poliza: '7890124', cliente: 'CEMEX OPERACIONES',
        fecha: '2025-04-15', moneda: 'USD', primaNeta: 3200,
        porcentajeComision: 10, montoComision: 320, tipoCambio: 17.25,
        montoEnPesos: 5520, tipoMovimiento: 'COMISION', estatus: 'NL',
      },
    ],
    resumen: {
      comisionPeriodo: 12528, iva: 2004.48,
      total: 14532.48,
    },
  },
  {
    id: 2,
    idLiquidacion: 'LIQ-202516-002',
    agenteId: 2,
    agente: 'López Herrera, Juan Pablo',
    rfc: 'LOHJ850714PQ3',
    ejecutivo: 'María Fernández',
    periodo: '202516A',
    estatus: 'ENVIADO',
    fechaGeneracion: '2025-04-20',
    movimientos: [
      {
        id: 3, poliza: '7890128', cliente: 'GRUPO MODELO S.A.',
        fecha: '2025-04-16', moneda: 'MXN', primaNeta: 43000,
        porcentajeComision: 10, montoComision: 4300, montoEnPesos: 4300,
        tipoMovimiento: 'COMISION', estatus: 'NL',
      },
    ],
    resumen: {
      comisionPeriodo: 4300, iva: 344,
      subtotal: 4644, retencionISR: 430, retencionIVA: 229.32,
      total: 3984.68,
    },
  },
  {
    id: 3,
    idLiquidacion: 'LIQ-202516-003',
    agenteId: 4,
    agente: 'Intermediarios Alianza S.C.',
    rfc: 'IAL031105NM2',
    ejecutivo: 'Ana Gutiérrez',
    periodo: '202516A',
    estatus: 'PAGADO',
    fechaGeneracion: '2025-04-19',
    movimientos: [
      {
        id: 4, poliza: '7890130', cliente: 'PEMEX INDUSTRIAL',
        fecha: '2025-04-14', moneda: 'MXN', primaNeta: 120000,
        porcentajeComision: 8, montoComision: 9600, montoEnPesos: 9600,
        tipoMovimiento: 'COMISION', estatus: 'L',
      },
    ],
    resumen: {
      comisionPeriodo: 9600, iva: 1536,
      total: 11136,
    },
  },
]
