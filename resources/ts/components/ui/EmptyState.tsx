import { FileSearch } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'Sin resultados',
  description = 'No se encontraron datos que coincidan con tu búsqueda',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-avla-blue-subtle flex items-center justify-center mb-4">
        {icon || <FileSearch size={28} className="text-avla-blue" />}
      </div>
      <h3 className="font-heading text-base font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm">{description}</p>
    </div>
  )
}
