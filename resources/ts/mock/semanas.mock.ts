import type { Semana } from '@/types/semana.types'

export const SEMANAS_MOCK: Semana[] = [
  {
    id: 1,
    periodo: '202516A',
    fechaInicio: '2025-04-14',
    fechaFin: '2025-04-20',
    estatus: 'CERRADA',
    pasos: [
      { numero: 1, nombre: 'Preparación LP Producción', estado: 'COMPLETADO' },
      { numero: 2, nombre: 'Carga al LP de Comisiones', estado: 'COMPLETADO' },
      { numero: 3, nombre: 'Asignación de Estatus', estado: 'COMPLETADO' },
      { numero: 4, nombre: 'Validación y Cruce Cobranza', estado: 'COMPLETADO' },
      { numero: 5, nombre: 'Bloqueo / Desbloqueo', estado: 'COMPLETADO' },
      { numero: 6, nombre: 'Generación de Liquidación', estado: 'COMPLETADO' },
    ],
  },
  {
    id: 2,
    periodo: '202517A',
    fechaInicio: '2025-04-21',
    fechaFin: '2025-04-27',
    estatus: 'EN_PROCESO',
    pasos: [
      { numero: 1, nombre: 'Preparación LP Producción', estado: 'COMPLETADO' },
      { numero: 2, nombre: 'Carga al LP de Comisiones', estado: 'COMPLETADO' },
      { numero: 3, nombre: 'Asignación de Estatus', estado: 'COMPLETADO' },
      { numero: 4, nombre: 'Validación y Cruce Cobranza', estado: 'EN_PROGRESO' },
      { numero: 5, nombre: 'Bloqueo / Desbloqueo', estado: 'BLOQUEADO' },
      { numero: 6, nombre: 'Generación de Liquidación', estado: 'BLOQUEADO' },
    ],
  },
]
