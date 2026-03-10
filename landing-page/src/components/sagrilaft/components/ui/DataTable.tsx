import type { ReactNode } from 'react';
import { Icon } from './Icon';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns, data, keyExtractor, onRowClick, actions, loading = false, emptyMessage = 'No hay datos disponibles',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <Icon name="inbox" size={36} className="text-gray-300 dark:text-gray-600" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{emptyMessage}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-card-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: column.width }}>
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((item) => (
              <tr key={keyExtractor(item)} onClick={() => onRowClick?.(item)} className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300">
                    {column.render ? column.render(item) : String((item as Record<string, unknown>)[column.key] ?? '-')}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">{actions(item)}</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
