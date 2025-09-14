import { useState } from 'react'
import { Play, Clock, CheckCircle, Star, BookOpen, Award, Target } from 'lucide-react'

export function TrainingPage() {
  const [, setSelectedModule] = useState<string | null>(null)

  const modules = [
    {
      id: 1,
      title: 'Fundamentos de Mantenimiento Automotriz',
      description: 'Aprende los conceptos básicos del mantenimiento preventivo y correctivo en vehículos.',
      duration: '2 horas',
      difficulty: 'Principiante',
      progress: 100,
      status: 'completed',
      rating: 4.8,
      lessons: 8,
      category: 'Básico'
    },
    {
      id: 2,
      title: 'Diagnóstico con Herramientas Digitales',
      description: 'Domina el uso de escáneres OBD y herramientas de diagnóstico modernas.',
      duration: '3 horas',
      difficulty: 'Intermedio',
      progress: 65,
      status: 'in_progress',
      rating: 4.6,
      lessons: 12,
      category: 'Tecnología'
    },
    {
      id: 3,
      title: 'Mantenimiento Predictivo con IA',
      description: 'Aprende a usar la inteligencia artificial para predecir fallas en vehículos.',
      duration: '4 horas',
      difficulty: 'Avanzado',
      progress: 0,
      status: 'not_started',
      rating: 0,
      lessons: 15,
      category: 'IA'
    },
    {
      id: 4,
      title: 'Gestión de Taller y Atención al Cliente',
      description: 'Mejora tus habilidades de gestión y comunicación con clientes.',
      duration: '2.5 horas',
      difficulty: 'Intermedio',
      progress: 0,
      status: 'not_started',
      rating: 0,
      lessons: 10,
      category: 'Gestión'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'Intermedio':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'Avanzado':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-dark-500/10 text-dark-400 border-dark-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'in_progress':
        return <Play className="w-5 h-5 text-blue-400" />
      case 'not_started':
        return <BookOpen className="w-5 h-5 text-dark-400" />
      default:
        return <BookOpen className="w-5 h-5 text-dark-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado'
      case 'in_progress':
        return 'En Progreso'
      case 'not_started':
        return 'No Iniciado'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-50">Capacitación</h1>
          <p className="text-dark-300 mt-2">
            Mejora tus habilidades con nuestros módulos de entrenamiento inteligente
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-dark-400 text-sm">Módulos Disponibles</p>
                <p className="text-2xl font-bold text-dark-50">12</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-dark-400 text-sm">Completados</p>
                <p className="text-2xl font-bold text-dark-50">3</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-dark-400 text-sm">En Progreso</p>
                <p className="text-2xl font-bold text-dark-50">1</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-dark-400 text-sm">Puntuación Promedio</p>
                <p className="text-2xl font-bold text-dark-50">4.7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="card group hover:border-primary-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(module.status)}
                  <span className="ml-2 text-sm text-dark-400">
                    {getStatusText(module.status)}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-dark-50 mb-2 group-hover:text-primary-400 transition-colors">
                {module.title}
              </h3>
              
              <p className="text-dark-300 text-sm mb-4 line-clamp-2">
                {module.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Progreso</span>
                  <span className="text-dark-300">{module.progress}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm text-dark-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {module.lessons} lecciones
                  </div>
                </div>

                {module.rating > 0 && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-dark-300">{module.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                <span className="text-xs text-dark-500 bg-dark-800 px-2 py-1 rounded">
                  {module.category}
                </span>
                <button 
                  className={`btn btn-sm ${
                    module.status === 'completed' 
                      ? 'btn-outline' 
                      : module.status === 'in_progress'
                      ? 'btn-primary'
                      : 'btn-primary'
                  }`}
                  onClick={() => setSelectedModule(module.id.toString())}
                >
                  {module.status === 'completed' ? 'Repasar' : 
                   module.status === 'in_progress' ? 'Continuar' : 'Comenzar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="mt-12">
          <div className="card">
            <h2 className="text-xl font-semibold text-dark-50 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-400" />
              Recomendaciones de IA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
                <h3 className="font-medium text-primary-300 mb-2">
                  Próximo Módulo Recomendado
                </h3>
                <p className="text-sm text-primary-200">
                  Basado en tu progreso, te recomendamos continuar con "Diagnóstico con Herramientas Digitales" 
                  para completar tu formación en tecnología automotriz.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <h3 className="font-medium text-yellow-300 mb-2">
                  Área de Mejora
                </h3>
                <p className="text-sm text-yellow-200">
                  Considera reforzar tus conocimientos en mantenimiento predictivo para 
                  aprovechar al máximo las herramientas de IA disponibles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
