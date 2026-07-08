/** Tabla genérica con búsqueda, paginación y acciones de editar/eliminar por fila. */
export default function DataTable({
  columns,
  rows,
  isLoading,
  search,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  page,
  pageSize,
  total,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const renderCell = (row, column) => {
    if (column.render) return column.render(row);
    if (column.type === 'boolean') return row[column.key] ? '✅' : '—';
    return row[column.key] ?? '';
  };

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        className="mb-4 w-full max-w-xs rounded-xl border border-ink-100 px-4 py-2 text-sm outline-none focus:border-primary-500"
      />

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 text-ink-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-ink-400">
                  Cargando...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-ink-400">
                  Sin resultados.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-ink-50/50">
                  {columns.map((column) => (
                    <td key={column.key} className="max-w-xs truncate px-4 py-3 text-ink-700">
                      {renderCell(row, column)}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button onClick={() => onEdit(row)} className="mr-3 font-medium text-primary-600 hover:underline">
                      Editar
                    </button>
                    <button onClick={() => onDelete(row)} className="font-medium text-red-500 hover:underline">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-full px-3 py-1 text-sm text-ink-600 hover:bg-ink-100 disabled:opacity-40"
          >
            ‹ Anterior
          </button>
          <span className="text-sm text-ink-500">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-full px-3 py-1 text-sm text-ink-600 hover:bg-ink-100 disabled:opacity-40"
          >
            Siguiente ›
          </button>
        </div>
      )}
    </div>
  );
}
