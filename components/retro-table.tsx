import type React from "react"
interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface RetroTableProps {
  title: string
  columns: Column[]
  data: any[]
  actions?: (row: any) => React.ReactNode
}

export function RetroTable({ title, columns, data, actions }: RetroTableProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold font-mono mb-2">{title}</h3>
      <table className="retro-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center text-muted-foreground">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>
                ))}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
