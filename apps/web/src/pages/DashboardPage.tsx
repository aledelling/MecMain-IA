import { useAuthStore } from '@/store/authStore'
import { BarChart3, Users, Wrench, Brain, TrendingUp, CheckCircle } from 'lucide-react'

export function DashboardPage() {
  const { user } = useAuthStore()

  const stats = [
    {
      name: 'Talleres Activos',
      value: '12',
      change: '+2 este mes',
      changeType: 'positive',
      icon: Users
    },
    {
      name: 'Mantenimientos Completados',
      value: '156',
      change: '+23% vs mes anterior',
      changeType: 'positive',
      icon: CheckCircle
    },
    {
      name: 'Técnicos Capacitados',
      value: '48',
      change: '+8 nuevos',
      changeType: 'positive',
      icon: Brain
    },
    {
      name: 'Eficiencia Promedio',
      value: '94%',
      change: '+5% vs mes anterior',
      changeType: 'positive',
      icon: TrendingUp
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'maintenance',
      title: 'Mantenimiento completado - Toyota Corolla 2020',
      time: 'Hace 2 horas',
      status: 'completed'
    },
    {
      id: 2,
      type: 'training',
      title: 'Nuevo módulo de capacitación completado',
      time: 'Hace 4 horas',
      status: 'completed'
    },
    {
      id: 3,
      type: 'prediction',
      title: 'Predicción de falla generada - Honda Civic 2019',
      time: 'Hace 6 horas',
      status: 'warning'
    },
    {
      id: 4,
      type: 'workshop',
      title: 'Nuevo taller registrado - Taller El Dorado',
      time: 'Hace 1 día',
      status: 'info'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-50">
            ¡Bienvenido, {user?.name}!
          </h1>
          <p className="text-dark-300 mt-2">
            Aquí tienes un resumen de tu actividad en MecMain IA
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-dark-50 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-dark-50 mb-6">
                Actividad Reciente
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-4 rounded-lg bg-dark-800/50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-400' :
                      activity.status === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-dark-50 font-medium">{activity.title}</p>
                      <p className="text-dark-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-dark-50 mb-6">
                Acciones Rápidas
              </h2>
              <div className="space-y-3">
                <button className="w-full btn btn-primary flex items-center justify-center">
                  <Wrench className="w-4 h-4 mr-2" />
                  Nuevo Mantenimiento
                </button>
                <button className="w-full btn btn-outline flex items-center justify-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Iniciar Capacitación
                </button>
                <button className="w-full btn btn-outline flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Reportes
                </button>
                <button className="w-full btn btn-outline flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Gestionar Talleres
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="card mt-6">
              <h2 className="text-xl font-semibold text-dark-50 mb-4">
                Insights de IA
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-primary-500/10 rounded-lg border border-primary-500/20">
                  <p className="text-sm text-primary-300">
                    <strong>Recomendación:</strong> Considera programar mantenimiento preventivo para 3 vehículos en los próximos 7 días.
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-sm text-yellow-300">
                    <strong>Alerta:</strong> Patrón de fallas detectado en frenos de vehículos Honda 2018-2020.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
