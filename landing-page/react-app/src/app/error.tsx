'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service in production
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Algo salió mal
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        Ocurrió un error inesperado. Por favor intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
