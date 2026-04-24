import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  default: 'bg-bg-alt text-text-muted',
  info: 'bg-info-bg text-info',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  )
}
