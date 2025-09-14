import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { User, Settings, Save, Camera, Shield, Bell } from 'lucide-react'

export function ProfilePage() {
  const { user, logout } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Colombia'
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = () => {
    // Here you would typically call an API to update the user profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador'
      case 'workshop_owner':
        return 'Propietario de Taller'
      case 'technician':
        return 'Técnico'
      case 'student':
        return 'Estudiante'
      default:
        return role
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-50">Mi Perfil</h1>
          <p className="text-dark-300 mt-2">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-dark-900" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center border-2 border-dark-900 hover:bg-dark-600 transition-colors">
                  <Camera className="w-4 h-4 text-dark-300" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-dark-50 mb-1">
                {user?.name}
              </h2>
              <p className="text-dark-400 text-sm mb-4">
                {getRoleText(user?.role || '')}
              </p>
              
              <div className="flex items-center justify-center mb-4">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  user?.isEmailVerified ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-sm text-dark-300">
                  {user?.isEmailVerified ? 'Email verificado' : 'Email no verificado'}
                </span>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-outline w-full"
              >
                <Settings className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-dark-50 mb-4">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dark-400">Mantenimientos</span>
                  <span className="text-dark-50 font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Módulos Completados</span>
                  <span className="text-dark-50 font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Puntuación Promedio</span>
                  <span className="text-dark-50 font-medium">4.7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Miembro desde</span>
                  <span className="text-dark-50 font-medium">Ene 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark-50">
                  Información Personal
                </h2>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="btn btn-primary btn-sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </button>
                )}
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Nombre Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="input"
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div>
                  <label className="label">Dirección</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input"
                      placeholder="Calle 123 #45-67"
                    />
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input"
                      placeholder="Bogotá"
                    />
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input"
                      placeholder="Cundinamarca"
                    />
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input"
                      placeholder="110111"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Preferences */}
            <div className="card mt-6">
              <h2 className="text-xl font-semibold text-dark-50 mb-6">
                Preferencias
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-dark-50 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-primary-400" />
                    Notificaciones
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-dark-300">Notificaciones por email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-dark-300">Notificaciones push</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-dark-300">Notificaciones SMS</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-dark-50 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary-400" />
                    Seguridad
                  </h3>
                  <div className="space-y-3">
                    <button className="btn btn-outline w-full justify-start">
                      Cambiar Contraseña
                    </button>
                    <button className="btn btn-outline w-full justify-start">
                      Configurar 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card mt-6 border-red-500/20">
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Zona de Peligro
              </h2>
              <p className="text-dark-300 mb-4">
                Estas acciones son irreversibles. Por favor, procede con precaución.
              </p>
              <button
                onClick={logout}
                className="btn bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
