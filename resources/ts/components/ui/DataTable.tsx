import type { ReactNode } from 'react'

interface DataTableColumn<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T>({ columns, data, emptyMessage = 'No hay datos para mostrar', onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-text-muted ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-text-subtle text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors duration-100 ${onRowClick ? 'cursor-pointer hover:bg-avla-blue-subtle/30' : 'hover:bg-bg'}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`py-3 px-4 ${col.className || ''}`}>
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
