import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-6xl font-bold text-primary">404</p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Página no encontrada
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
