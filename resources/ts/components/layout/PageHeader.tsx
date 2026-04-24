import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
      <div className="min-w-0">
        <h1 className="font-heading text-xl sm:text-2xl font-semibold text-text">{title}</h1>
        {description && (
          <p className="text-text-muted text-xs sm:text-sm mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 sm:gap-3 shrink-0">{actions}</div>}
    </div>
  )
}
