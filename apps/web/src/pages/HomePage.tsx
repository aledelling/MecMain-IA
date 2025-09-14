import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Shield, Zap, Users, Target, CheckCircle } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
                <Brain className="w-4 h-4 mr-2" />
                Startup • IA • Mantenimiento
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-dark-50 leading-tight">
                La evolución del{' '}
                <span className="gradient-text">mantenimiento</span>{' '}
                inteligente
              </h1>
              
              <p className="text-xl text-dark-300 leading-relaxed max-w-2xl">
                Transformamos el mantenimiento mecánico en Colombia y Latinoamérica con inteligencia artificial: 
                entrenamiento autónomo, optimización predictiva y una plataforma intuitiva para talleres e industrias.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg inline-flex items-center"
                >
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="#servicios"
                  className="btn btn-outline btn-lg"
                >
                  Ver Servicios
                </Link>
              </div>
              
              <p className="text-sm text-dark-500">
                Paper 001 • 27 de julio de 2025 •{' '}
                <a href="mailto:aledelling@gmail.com" className="text-primary-400 hover:text-primary-300">
                  aledelling@gmail.com
                </a>
              </p>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/img/MainAgent.png"
                  alt="MecMain Agent"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-50 mb-4">
              ¿Qué es MecMain?
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Una plataforma integral que combina inteligencia artificial con experiencia técnica 
              para revolucionar el mantenimiento en la industria automotriz y más allá.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card group hover:border-primary-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Brain className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">
                Entrenamiento Autónomo
              </h3>
              <p className="text-dark-300">
                IA que personaliza y automatiza la capacitación del personal técnico, 
                adaptándose al nivel y necesidades de cada profesional.
              </p>
            </div>
            
            <div className="card group hover:border-primary-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Shield className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">
                Optimización Predictiva
              </h3>
              <p className="text-dark-300">
                Modelos avanzados para anticipar fallas y programar mantenimientos 
                preventivos, reduciendo costos y tiempo de inactividad.
              </p>
            </div>
            
            <div className="card group hover:border-primary-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">
                Escalabilidad Multisectorial
              </h3>
              <p className="text-dark-300">
                Soluciones adaptables a talleres, industria, servicios públicos 
                y formación técnica, creciendo con tu negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-50 mb-4">
              Aplicaciones
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Nuestra plataforma se adapta a diferentes sectores y necesidades, 
              ofreciendo soluciones especializadas para cada industria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group hover:border-primary-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500/20 transition-colors">
                <Users className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">
                Talleres Automotrices
              </h3>
              <p className="text-dark-300">
                Gestión integral de órdenes, repuestos y comunicación con clientes, 
                optimizando la operación diaria del taller.
              </p>
            </div>
            
            <div className="card text-center group hover:border-primary-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500/20 transition-colors">
                <Target className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">
                Mantenimiento Industrial
              </h3>
              <p className="text-dark-300">
                Planificación de paradas, sensores y alertas de condición para 
                maquinaria industrial y equipos críticos.
              </p>
            </div>
            
            <div className="card text-center group hover:border-primary-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">
                Formación Técnica
              </h3>
              <p className="text-dark-300">
                Alianzas con SENA e institutos para capacitación acelerada 
                basada en IA y realidad aumentada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-50 mb-6">
            ¿Listo para revolucionar tu mantenimiento?
          </h2>
          <p className="text-xl text-dark-300 mb-8">
            Únete a la nueva era del mantenimiento inteligente y lleva tu taller 
            o industria al siguiente nivel con MecMain IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-primary btn-lg inline-flex items-center"
            >
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="mailto:aledelling@gmail.com"
              className="btn btn-outline btn-lg"
            >
              Contactar Ventas
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
