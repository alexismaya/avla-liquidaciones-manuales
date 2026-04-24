export type EstadoPaso = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADO' | 'BLOQUEADO'

export interface PasoSemana {
  numero: number
  nombre: string
  estado: EstadoPaso
}

export interface Semana {
  id: number
  periodo: string
  fechaInicio: string
  fechaFin: string
  estatus: 'ABIERTA' | 'EN_PROCESO' | 'CERRADA'
  pasos: PasoSemana[]
}
