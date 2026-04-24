import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

// Pages
import AgentesIndex from '@/pages/agentes/AgentesIndex'
import AgenteDetalle from '@/pages/agentes/AgenteDetalle'
import NuevoAgente from '@/pages/agentes/NuevoAgente'
import OperacionesIndex from '@/pages/operaciones/OperacionesIndex'
import SemanaDetalle from '@/pages/operaciones/SemanaDetalle'
import GeneracionPDF from '@/pages/operaciones/paso6/GeneracionPDF'
import VisualizacionPDF from '@/pages/operaciones/paso6/VisualizacionPDF'
import LiquidacionesManualIndex from '@/pages/liquidaciones-manuales/LiquidacionesManualIndex'
import LiquidacionRevision from '@/pages/liquidaciones-manuales/LiquidacionRevision'
import LiquidacionPreviewPDF from '@/pages/liquidaciones-manuales/LiquidacionPreviewPDF'
import LiquidacionCompletada from '@/pages/liquidaciones-manuales/LiquidacionCompletada'
import GeneracionPDFUnificado from '@/pages/generacion-pdf-unificado/GeneracionPDFUnificado'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/operaciones" replace />} />

          {/* Agentes */}
          <Route path="agentes" element={<AgentesIndex />} />
          <Route path="agentes/nuevo" element={<NuevoAgente />} />
          <Route path="agentes/:id" element={<AgenteDetalle />} />

          {/* Operaciones */}
          <Route path="operaciones" element={<OperacionesIndex />} />
          <Route path="operaciones/semanas/:semanaId" element={<SemanaDetalle />} />
          <Route path="operaciones/semanas/:semanaId/paso-6/generacion" element={<GeneracionPDF />} />
          <Route path="operaciones/semanas/:semanaId/paso-6/visualizacion" element={<VisualizacionPDF />} />

          {/* Liquidaciones Manuales — Wizard */}
          <Route path="liquidaciones-manuales" element={<LiquidacionesManualIndex />} />
          <Route path="liquidaciones-manuales/revision" element={<LiquidacionRevision />} />
          <Route path="liquidaciones-manuales/preview" element={<LiquidacionPreviewPDF />} />
          <Route path="liquidaciones-manuales/completado" element={<LiquidacionCompletada />} />

          {/* Generación PDF Unificado */}
          <Route path="generacion-pdf" element={<GeneracionPDFUnificado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
