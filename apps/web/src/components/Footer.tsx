import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-dark-900 font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-dark-50">MecMain IA</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6 max-w-md">
              Transformamos el mantenimiento mecánico en Colombia y Latinoamérica con inteligencia artificial: 
              entrenamiento autónomo, optimización predictiva y una plataforma intuitiva para talleres e industrias.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/aledelling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/aledelling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/aledelling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-dark-50 font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#servicios" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#acerca" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-dark-50 font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <a
                  href="mailto:aledelling@gmail.com"
                  className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                >
                  aledelling@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-dark-400 text-sm">+57 (1) 234-5678</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span className="text-dark-400 text-sm">
                  Bogotá, Colombia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm">
              © {currentYear} MecMain IA. Todos los derechos reservados.
            </p>
            <p className="text-dark-500 text-xs mt-2 md:mt-0">
              Hecho con ❤️ en Colombia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
