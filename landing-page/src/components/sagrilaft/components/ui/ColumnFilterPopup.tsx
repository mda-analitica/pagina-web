import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { Button } from './Button';

export type FilterType = 'text' | 'number' | 'select' | 'daterange';
export type FilterValue = string | string[] | { from: string; to: string } | null;

export interface ColumnFilter {
  columnId: string;
  type: FilterType;
  value: FilterValue;
}

interface ColumnFilterPopupProps {
  columnId: string;
  columnName: string;
  filterType: FilterType;
  options?: string[];
  value: FilterValue;
  onApply: (value: FilterValue) => void;
  onClear: () => void;
}

export function ColumnFilterPopup({
  columnId,
  columnName,
  filterType,
  options = [],
  value,
  onApply,
  onClear,
}: ColumnFilterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState<FilterValue>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = () => {
    onApply(localValue);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalValue(null);
    onClear();
    setIsOpen(false);
  };

  const hasActiveFilter = value !== null && value !== '';

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1.5 rounded transition-colors ${
          hasActiveFilter
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
        }`}
        title="Filtrar por esta columna"
      >
        <Icon name="filter_list" size={18} />
      </button>

      {isOpen && (
        <div
          ref={containerRef}
          className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-50 w-64"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Filtrar: {columnName}
            </p>
          </div>

          {/* Content */}
          <div className="px-4 py-3 space-y-3">
            {filterType === 'text' && (
              <input
                type="text"
                placeholder="Buscar..."
                value={(localValue as string) || ''}
                onChange={(e) => setLocalValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}

            {filterType === 'number' && (
              <input
                type="number"
                placeholder="Número..."
                value={(localValue as string) || ''}
                onChange={(e) => setLocalValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}

            {filterType === 'select' && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {options.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Array.isArray(localValue) && localValue.includes(option)}
                      onChange={(e) => {
                        const current = (Array.isArray(localValue) ? localValue : []) as string[];
                        if (e.target.checked) {
                          setLocalValue([...current, option]);
                        } else {
                          setLocalValue(current.filter((v) => v !== option));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {filterType === 'daterange' && (
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Desde
                  </label>
                  <input
                    type="date"
                    value={
                      typeof localValue === 'object' && localValue !== null
                        ? (localValue as any).from
                        : ''
                    }
                    onChange={(e) => {
                      const current =
                        typeof localValue === 'object' && localValue !== null
                          ? (localValue as any)
                          : { from: '', to: '' };
                      setLocalValue({ ...current, from: e.target.value });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Hasta
                  </label>
                  <input
                    type="date"
                    value={
                      typeof localValue === 'object' && localValue !== null
                        ? (localValue as any).to
                        : ''
                    }
                    onChange={(e) => {
                      const current =
                        typeof localValue === 'object' && localValue !== null
                          ? (localValue as any)
                          : { from: '', to: '' };
                      setLocalValue({ ...current, to: e.target.value });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <Button variant="outline" size="sm" onClick={handleClear} className="flex-1 text-xs">
              Limpiar
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply} className="flex-1 text-xs">
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
