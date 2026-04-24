import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { type SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'w-full appearance-none px-3 py-2 pr-10 text-sm rounded-[var(--radius-md)] border transition-colors duration-150',
              'bg-surface text-text',
              'focus:outline-none focus:ring-2 focus:ring-avla-blue/30 focus:border-avla-blue',
              'disabled:opacity-60 disabled:bg-bg-alt disabled:cursor-not-allowed',
              error ? 'border-danger' : 'border-border',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none"
          />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
