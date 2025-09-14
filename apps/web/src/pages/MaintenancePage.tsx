import { useState } from 'react'
import { Plus, Search, Filter, Calendar, Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const maintenanceRecords = [
    {
      id: 1,
      vehicle: 'Toyota Corolla 2020',
      licensePlate: 'ABC-123',
      type: 'preventive',
      status: 'completed',
      technician: 'Juan Pérez',
      date: '2025-01-14',
      duration: '2h 30m',
      cost: 450000,
      description: 'Cambio de aceite y filtros'
    },
    {
      id: 2,
      vehicle: 'Honda Civic 2019',
      licensePlate: 'XYZ-789',
      type: 'corrective',
      status: 'in_progress',
      technician: 'María García',
      date: '2025-01-14',
      duration: '1h 45m',
      cost: 320000,
      description: 'Reparación del sistema de frenos'
    },
    {
      id: 3,
      vehicle: 'Ford Focus 2021',
      licensePlate: 'DEF-456',
      type: 'predictive',
      status: 'scheduled',
      technician: 'Carlos López',
      date: '2025-01-16',
      duration: '3h 00m',
      cost: 280000,
      description: 'Mantenimiento predictivo - Motor'
    },
    {
      id: 4,
      vehicle: 'Chevrolet Spark 2018',
      licensePlate: 'GHI-012',
      type: 'emergency',
      status: 'pending',
      technician: 'Ana Rodríguez',
      date: '2025-01-15',
      duration: '4h 15m',
      cost: 650000,
      description: 'Reparación de transmisión'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'scheduled':
        return <Calendar className="w-4 h-4 text-blue-400" />
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Wrench className="w-4 h-4 text-dark-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado'
      case 'in_progress':
        return 'En Progreso'
      case 'scheduled':
        return 'Programado'
      case 'pending':
        return 'Pendiente'
      default:
        return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'preventive':
        return 'Preventivo'
      case 'corrective':
        return 'Correctivo'
      case 'predictive':
        return 'Predictivo'
      case 'emergency':
        return 'Emergencia'
      default:
        return type
    }
  }

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.technician.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || record.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-50">Mantenimientos</h1>
            <p className="text-dark-300 mt-2">
              Gestiona todos los registros de mantenimiento
            </p>
          </div>
          <button className="btn btn-primary mt-4 sm:mt-0 inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Mantenimiento
          </button>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar mantenimientos..."
                  className="input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="input"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="completed">Completados</option>
                <option value="in_progress">En Progreso</option>
                <option value="scheduled">Programados</option>
                <option value="pending">Pendientes</option>
              </select>
              <button className="btn btn-outline inline-flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance Records Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Técnico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-dark-800/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-dark-50">
                          {record.vehicle}
                        </div>
                        <div className="text-sm text-dark-400">
                          {record.licensePlate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400">
                        {getTypeText(record.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(record.status)}
                        <span className="ml-2 text-sm text-dark-300">
                          {getStatusText(record.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                      {record.technician}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                      {new Date(record.date).toLocaleDateString('es-CO')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                      {record.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                      ${record.cost.toLocaleString('es-CO')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-400 hover:text-primary-300 mr-3">
                        Ver
                      </button>
                      <button className="text-dark-400 hover:text-dark-300">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-semibold text-dark-50 mb-2">
              No se encontraron mantenimientos
            </h3>
            <p className="text-dark-400 mb-6">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza registrando tu primer mantenimiento'
              }
            </p>
            <button className="btn btn-primary inline-flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Mantenimiento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
