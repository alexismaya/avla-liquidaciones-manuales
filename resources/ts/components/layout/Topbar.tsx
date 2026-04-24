import { Bell, ChevronDown } from 'lucide-react'

export function Topbar() {
  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumb placeholder */}
      <div />

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-bg text-text-muted transition-colors duration-150">
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-avla-blue rounded-full ring-2 ring-surface" />
        </button>

        {/* Avatar + user */}
        <button className="flex items-center gap-2.5 hover:bg-bg px-3 py-1.5 rounded-lg transition-colors duration-150">
          <div className="w-8 h-8 bg-gradient-to-br from-avla-blue to-avla-blue-dark rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">JG</span>
          </div>
          <div className="text-left">
            <span className="text-sm font-medium text-text block leading-tight">Jaqueline G.</span>
            <span className="text-[11px] text-text-muted leading-tight">Administrador</span>
          </div>
          <ChevronDown size={14} className="text-text-subtle" />
        </button>
      </div>
    </header>
  )
}
