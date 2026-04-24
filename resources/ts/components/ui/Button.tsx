import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-avla-blue text-white hover:bg-avla-blue-dark shadow-sm hover:shadow-md active:shadow-sm',
  secondary: 'bg-surface border border-border text-text hover:bg-bg active:bg-bg-alt',
  destructive: 'bg-danger text-white hover:bg-danger/90',
  ghost: 'text-avla-blue hover:bg-avla-blue-subtle active:bg-avla-blue-subtle/70',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avla-blue',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
