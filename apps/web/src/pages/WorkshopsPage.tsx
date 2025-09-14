import { useState } from 'react'
import { Plus, Search, Filter, MapPin, Phone, Mail, Users, Settings } from 'lucide-react'

export function WorkshopsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const workshops = [
    {
      id: 1,
      name: 'Taller El Dorado',
      address: 'Calle 80 #12-34, Bogotá',
      phone: '+57 1 234-5678',
      email: 'contacto@tallerdorado.com',
      technicians: 8,
      status: 'active',
      lastActivity: 'Hace 2 horas'
    },
    {
      id: 2,
      name: 'Mecánica Central',
      address: 'Carrera 15 #45-67, Medellín',
      phone: '+57 4 567-8901',
      email: 'info@mecanicacentral.com',
      technicians: 12,
      status: 'active',
      lastActivity: 'Hace 1 día'
    },
    {
      id: 3,
      name: 'AutoServicio Norte',
      address: 'Avenida 68 #23-45, Bogotá',
      phone: '+57 1 345-6789',
      email: 'servicio@autonorte.com',
      technicians: 5,
      status: 'inactive',
      lastActivity: 'Hace 3 días'
    }
  ]

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || workshop.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-50">Talleres</h1>
            <p className="text-dark-300 mt-2">
              Gestiona todos los talleres asociados a tu cuenta
            </p>
          </div>
          <button className="btn btn-primary mt-4 sm:mt-0 inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Taller
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
                  placeholder="Buscar talleres..."
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
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
              <button className="btn btn-outline inline-flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="card group hover:border-primary-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-dark-50 group-hover:text-primary-400 transition-colors">
                    {workshop.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      workshop.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-sm text-dark-400 capitalize">
                      {workshop.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-dark-300">
                  <MapPin className="w-4 h-4 mr-2 text-dark-400" />
                  <span className="text-sm">{workshop.address}</span>
                </div>
                <div className="flex items-center text-dark-300">
                  <Phone className="w-4 h-4 mr-2 text-dark-400" />
                  <span className="text-sm">{workshop.phone}</span>
                </div>
                <div className="flex items-center text-dark-300">
                  <Mail className="w-4 h-4 mr-2 text-dark-400" />
                  <span className="text-sm">{workshop.email}</span>
                </div>
                <div className="flex items-center text-dark-300">
                  <Users className="w-4 h-4 mr-2 text-dark-400" />
                  <span className="text-sm">{workshop.technicians} técnicos</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                <span className="text-xs text-dark-500">
                  Última actividad: {workshop.lastActivity}
                </span>
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-sm">
                    Ver Detalles
                  </button>
                  <button className="btn btn-primary btn-sm">
                    Gestionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-semibold text-dark-50 mb-2">
              No se encontraron talleres
            </h3>
            <p className="text-dark-400 mb-6">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza agregando tu primer taller'
              }
            </p>
            <button className="btn btn-primary inline-flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Taller
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
