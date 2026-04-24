import { useState } from 'react'
import { Calendar } from 'lucide-react'

interface DateRangePickerProps {
  fromDate: string | null
  toDate: string | null
  onFromChange: (date: string) => void
  onToChange: (date: string) => void
  label?: string
}

export function DateRangePicker({ fromDate, toDate, onFromChange, onToChange, label }: DateRangePickerProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-text">{label}</label>}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="date"
            value={fromDate || ''}
            onChange={(e) => onFromChange(e.target.value)}
            className="w-full px-3 py-2 pl-9 text-sm rounded-[var(--radius-md)] border border-border bg-surface text-text
              focus:outline-none focus:ring-2 focus:ring-avla-blue/30 focus:border-avla-blue transition-colors"
            placeholder="Fecha desde"
          />
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none" />
        </div>
        <span className="text-text-subtle text-sm">—</span>
        <div className="relative flex-1">
          <input
            type="date"
            value={toDate || ''}
            onChange={(e) => onToChange(e.target.value)}
            className="w-full px-3 py-2 pl-9 text-sm rounded-[var(--radius-md)] border border-border bg-surface text-text
              focus:outline-none focus:ring-2 focus:ring-avla-blue/30 focus:border-avla-blue transition-colors"
            placeholder="Fecha hasta"
          />
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
