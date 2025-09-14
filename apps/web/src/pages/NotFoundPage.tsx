import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-500/20">404</h1>
          <h2 className="text-3xl font-bold text-dark-50 mb-4">
            Página no encontrada
          </h2>
          <p className="text-dark-300 text-lg max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir al Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  )
}
