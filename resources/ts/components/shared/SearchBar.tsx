import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 text-sm rounded-[var(--radius-md)] border border-border bg-surface text-text
          placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-avla-blue/30 focus:border-avla-blue
          transition-colors duration-150"
      />
    </div>
  )
}
