import { useEffect, useState } from 'react';
import { Icon } from './Icon';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: (id: string) => void }) {
  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => onClose(toast.id), toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const typeStyles = {
    success: 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-600',
    error: 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-600',
    warning: 'bg-amber-50 border-amber-500 dark:bg-amber-900/20 dark:border-amber-600',
    info: 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-600',
  };
  const iconMap = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
  const iconColors = {
    success: 'text-green-600 dark:text-green-400', error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400', info: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg ${typeStyles[toast.type]}`}>
      <Icon name={iconMap[toast.type]} className={iconColors[toast.type]} size={24} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white">{toast.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{toast.message}</p>
      </div>
      <button onClick={() => onClose(toast.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastMessage[]; onClose: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-md w-full">
      {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onClose={onClose} />)}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };
  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));
  const showSuccess = (title: string, message: string) => addToast({ type: 'success', title, message });
  const showError = (title: string, message: string) => addToast({ type: 'error', title, message, duration: 8000 });
  const showWarning = (title: string, message: string) => addToast({ type: 'warning', title, message });
  const showInfo = (title: string, message: string) => addToast({ type: 'info', title, message });
  return { toasts, addToast, removeToast, showSuccess, showError, showWarning, showInfo };
}
