import { clsx } from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  padding?: boolean
}

export function Card({ children, className, padding = true, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-card)]',
        padding && 'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('pb-4 border-b border-border mb-4', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={clsx('font-heading text-lg font-semibold text-text', className)}>
      {children}
    </h3>
  )
}
