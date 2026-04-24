import { Bell, ChevronDown, Menu } from 'lucide-react'
import { useSidebarStore } from '@/store/sidebarStore'

export function Topbar() {
  const { toggle } = useSidebarStore()

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0">
      {/* Left: hamburger (mobile) */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-bg text-text-muted transition-colors"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      {/* Spacer on desktop */}
      <div className="hidden lg:block" />

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="relative p-2 rounded-lg hover:bg-bg text-text-muted transition-colors duration-150">
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-avla-blue rounded-full ring-2 ring-surface" />
        </button>

        {/* Avatar + user */}
        <button className="flex items-center gap-2 sm:gap-2.5 hover:bg-bg px-2 sm:px-3 py-1.5 rounded-lg transition-colors duration-150">
          <div className="w-8 h-8 bg-gradient-to-br from-avla-blue to-avla-blue-dark rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">JG</span>
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-sm font-medium text-text block leading-tight">Jaqueline G.</span>
            <span className="text-[11px] text-text-muted leading-tight">Administrador</span>
          </div>
          <ChevronDown size={14} className="text-text-subtle hidden sm:block" />
        </button>
      </div>
    </header>
  )
}
