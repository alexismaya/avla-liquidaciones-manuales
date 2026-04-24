import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SearchBar } from '@/components/shared/SearchBar'
import { AGENTES_MOCK } from '@/mock/agentes.mock'
import type { Agente } from '@/types/agente.types'
import { UserPlus, Eye } from 'lucide-react'

const REGIMEN_LABELS: Record<string, string> = {
  MORAL: 'Persona Moral',
  FISICA_EMPRESARIAL: 'P. Física Empresarial',
  RESICO: 'RESICO',
}

const columns = [
  {
    key: 'nombre',
    header: 'Intermediario',
    cell: (row: Agente) => (
      <div>
        <p className="font-medium text-text">{row.nombre}</p>
        <p className="text-xs text-text-muted mt-0.5">{row.rfc}</p>
      </div>
    ),
  },
  {
    key: 'regimen',
    header: 'Régimen Fiscal',
    cell: (row: Agente) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-bg-alt text-text-muted">
        {REGIMEN_LABELS[row.regimenFiscal]}
      </span>
    ),
  },
  {
    key: 'zona',
    header: 'Zona',
    cell: (row: Agente) => (
      <span className="text-sm text-text-muted">
        {row.zonaGeografica === 'FRONTERIZA' ? 'Fronteriza' : 'Resto del País'}
      </span>
    ),
  },
  {
    key: 'correo',
    header: 'Correo de Envío',
    cell: (row: Agente) => (
      <span className="text-sm text-text-muted truncate max-w-[200px] block">{row.correoEnvio}</span>
    ),
  },
  {
    key: 'estatus',
    header: 'Estatus',
    cell: (row: Agente) => <StatusBadge status={row.estatus} />,
  },
  {
    key: 'acciones',
    header: '',
    cell: (row: Agente) => (
      <Link
        to={`/agentes/${row.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-avla-blue hover:text-avla-blue-dark transition-colors"
      >
        <Eye size={14} />
        Detalle
      </Link>
    ),
    className: 'text-right',
  },
]

export default function AgentesIndex() {
  const [search, setSearch] = useState('')

  const filtered = AGENTES_MOCK.filter(
    (a) =>
      a.nombre.toLowerCase().includes(search.toLowerCase()) ||
      a.rfc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader
        title="Agentes"
        description="Gestión de intermediarios registrados en el sistema"
        actions={
          <Link to="/agentes/nuevo">
            <Button>
              <UserPlus size={16} />
              Nuevo Agente
            </Button>
          </Link>
        }
      />

      <div className="mb-4 max-w-sm">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre o RFC..."
        />
      </div>

      <Card padding={false}>
        <DataTable columns={columns} data={filtered} />
      </Card>
    </div>
  )
}
