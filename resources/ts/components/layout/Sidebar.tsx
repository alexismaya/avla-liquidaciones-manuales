import { NavLink } from 'react-router-dom'
import {
  Users, ClipboardList,
  FilePlus2, LayoutDashboard
} from 'lucide-react'

const NAV_ITEMS = [
  {
    group: 'Principal',
    items: [
      { to: '/operaciones', icon: LayoutDashboard, label: 'Operaciones' },
    ],
  },
  {
    group: 'Gestión',
    items: [
      { to: '/agentes', icon: Users, label: 'Agentes' },
      { to: '/liquidaciones-manuales', icon: ClipboardList, label: 'Liquidaciones Manuales' },
      { to: '/generacion-pdf', icon: FilePlus2, label: 'Generación PDF' },
    ],
  },
]

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-avla-dark flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-avla-dark-light/30">
        <div className="w-9 h-9 bg-gradient-to-br from-avla-blue to-avla-blue-light rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-heading font-bold text-sm tracking-tight">AV</span>
        </div>
        <div>
          <p className="text-white font-heading font-semibold text-sm leading-tight">AVLA Seguros</p>
          <p className="text-white/40 text-[11px]">Portal de Liquidaciones</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <p className="text-white/25 uppercase text-[10px] font-semibold tracking-[0.15em] px-3 mb-2.5">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-avla-blue text-white shadow-lg shadow-avla-blue/25'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.07]'}`
                    }
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-avla-dark-light/20">
        <p className="text-white/20 text-[10px]">v1.0.0 · AVLA Operaciones</p>
      </div>
    </aside>
  )
}
