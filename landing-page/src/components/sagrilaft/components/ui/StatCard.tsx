import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  trend?: { value: string; isPositive: boolean };
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  info?: string;
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary dark:bg-primary/20',
  secondary: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
  accent: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  warning: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
};

export function StatCard({ icon, value, label, trend, color = 'primary', info }: StatCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showInfo) return;
    const handleClick = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) setShowInfo(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showInfo]);

  return (
    <div className="bg-white dark:bg-card-dark rounded-lg p-3 shadow-card hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800 relative">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            {trend && (
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                {trend.isPositive ? '\u2191' : '\u2193'} {trend.value}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{label}</p>
        </div>
        {info && (
          <button onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" title="Informaci\u00f3n">
            <Icon name="info" size={16} className="text-gray-400 dark:text-gray-500" />
          </button>
        )}
      </div>
      {showInfo && info && (
        <div ref={infoRef} className="absolute left-0 right-0 top-full mt-1 z-50 mx-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
            <div className="flex items-start gap-2">
              <Icon name="info" size={16} className="text-primary dark:text-secondary mt-0.5 shrink-0" />
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{info}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
