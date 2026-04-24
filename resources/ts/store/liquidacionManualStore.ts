import { create } from 'zustand'
import type { MovimientoLiquidacion } from '@/types/liquidacion.types'

interface LiquidacionManualState {
  // Paso 1
  agenteId: number | null
  fechaDesde: string | null
  fechaHasta: string | null
  periodoSeleccionado: string | null
  incluirComision: boolean
  incluirMaquila: boolean

  // Paso 2
  periodoManual: string
  movimientos: MovimientoLiquidacion[]

  // Paso 3
  pdfUrl: string | null

  // Acciones
  setAgente: (id: number) => void
  setFechas: (desde: string, hasta: string) => void
  setPeriodo: (periodo: string) => void
  setIncluirComision: (v: boolean) => void
  setIncluirMaquila: (v: boolean) => void
  setPeriodoManual: (p: string) => void
  setMovimientos: (m: MovimientoLiquidacion[]) => void
  removeMovimiento: (id: number) => void
  addMovimiento: (m: MovimientoLiquidacion) => void
  setPdfUrl: (url: string) => void
  reset: () => void
}

export const useLiquidacionManualStore = create<LiquidacionManualState>((set) => ({
  agenteId: null,
  fechaDesde: null,
  fechaHasta: null,
  periodoSeleccionado: null,
  incluirComision: true,
  incluirMaquila: false,
  periodoManual: '',
  movimientos: [],
  pdfUrl: null,

  setAgente: (id) => set({ agenteId: id }),
  setFechas: (desde, hasta) => set({ fechaDesde: desde, fechaHasta: hasta }),
  setPeriodo: (periodo) => set({ periodoSeleccionado: periodo }),
  setIncluirComision: (v) => set({ incluirComision: v }),
  setIncluirMaquila: (v) => set({ incluirMaquila: v }),
  setPeriodoManual: (p) => set({ periodoManual: p }),
  setMovimientos: (m) => set({ movimientos: m }),
  removeMovimiento: (id) => set((s) => ({ movimientos: s.movimientos.filter((m) => m.id !== id) })),
  addMovimiento: (m) => set((s) => ({ movimientos: [...s.movimientos, m] })),
  setPdfUrl: (url) => set({ pdfUrl: url }),
  reset: () => set({
    agenteId: null, fechaDesde: null, fechaHasta: null,
    periodoSeleccionado: null, incluirComision: true, incluirMaquila: false,
    periodoManual: '', movimientos: [], pdfUrl: null,
  }),
}))
