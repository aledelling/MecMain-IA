import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Acerca de', href: '#acerca' },
    { name: 'Contacto', href: '#contacto' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-dark-800/50 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-dark-900 font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-dark-50">MecMain IA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-dark-300 hover:text-dark-50 hover:bg-dark-700/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-dark-300" />
                  </div>
                  <span className="text-sm text-dark-300">{user?.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="btn btn-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-ghost"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn btn-ghost"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-dark-300 hover:text-dark-50 hover:bg-dark-700/50"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-dark-700 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-dark-300 hover:text-dark-50 hover:bg-dark-700/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-dark-700">
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-dark-300" />
                    </div>
                    <span className="text-sm text-dark-300">{user?.name}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-dark-300 hover:text-dark-50 hover:bg-dark-700/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-dark-300 hover:text-dark-50 hover:bg-dark-700/50"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-dark-700 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-dark-300 hover:text-dark-50 hover:bg-dark-700/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-primary-400 hover:text-primary-300 hover:bg-primary-500/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
