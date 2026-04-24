interface PdfViewerProps {
  url?: string
  title?: string
}

export function PdfViewer({ url, title = 'Vista previa del documento' }: PdfViewerProps) {
  if (!url) {
    return (
      <div className="flex items-center justify-center h-96 bg-bg-alt rounded-[var(--radius-lg)] border border-border">
        <p className="text-text-subtle text-sm">No hay documento disponible para previsualizar</p>
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border overflow-hidden bg-surface">
      <div className="bg-bg-alt px-4 py-2 border-b border-border">
        <p className="text-sm font-medium text-text-muted">{title}</p>
      </div>
      <iframe
        src={url}
        title={title}
        className="w-full h-[600px]"
      />
    </div>
  )
}
