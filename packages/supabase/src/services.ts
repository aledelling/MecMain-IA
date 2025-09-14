import { supabase } from './client'
import type { Database } from './types'

type Tables = Database['public']['Tables']
type User = Tables['users']['Row']
type Workshop = Tables['workshops']['Row']
type MaintenanceRecord = Tables['maintenance_records']['Row']
type Vehicle = Tables['vehicles']['Row']
type TrainingModule = Tables['training_modules']['Row']

// Auth Services
export const authService = {
  async signUp(email: string, password: string, userData: {
    name: string
    role: 'admin' | 'workshop_owner' | 'technician' | 'student'
    workshop_id?: string
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }
}

// User Services
export const userService = {
  async getProfile(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserWorkshops(userId: string): Promise<Workshop[]> {
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Workshop Services
export const workshopService = {
  async getWorkshops(filters?: {
    page?: number
    limit?: number
    search?: string
    city?: string
    specialty?: string
  }): Promise<{ data: Workshop[], count: number }> {
    let query = supabase
      .from('workshops')
      .select('*', { count: 'exact' })

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.city) {
      query = query.eq('address->>city', filters.city)
    }

    if (filters?.specialty) {
      query = query.contains('specialties', [filters.specialty])
    }

    if (filters?.page && filters?.limit) {
      const from = (filters.page - 1) * filters.limit
      const to = from + filters.limit - 1
      query = query.range(from, to)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error, count } = await query
    
    if (error) throw error
    return { data: data || [], count: count || 0 }
  },

  async createWorkshop(workshop: any): Promise<Workshop> {
    const { data, error } = await supabase
      .from('workshops')
      .insert(workshop)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getWorkshopById(id: string): Promise<Workshop> {
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async updateWorkshop(id: string, updates: any): Promise<Workshop> {
    const { data, error } = await supabase
      .from('workshops')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteWorkshop(id: string) {
    const { error } = await supabase
      .from('workshops')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Maintenance Services
export const maintenanceService = {
  async getMaintenanceRecords(workshopId: string, filters?: {
    page?: number
    limit?: number
    status?: string
    type?: string
    vehicle_id?: string
  }): Promise<{ data: MaintenanceRecord[], count: number }> {
    let query = supabase
      .from('maintenance_records')
      .select('*', { count: 'exact' })
      .eq('workshop_id', workshopId)

    if (filters?.vehicle_id) {
      query = query.eq('vehicle_id', filters.vehicle_id)
    }

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }

    if (filters?.page && filters?.limit) {
      const from = (filters.page - 1) * filters.limit
      const to = from + filters.limit - 1
      query = query.range(from, to)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error, count } = await query
    
    if (error) throw error
    return { data: data || [], count: count || 0 }
  },

  async createMaintenanceRecord(record: any): Promise<MaintenanceRecord> {
    const { data, error } = await supabase
      .from('maintenance_records')
      .insert(record)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateMaintenanceRecord(id: string, updates: any): Promise<MaintenanceRecord> {
    const { data, error } = await supabase
      .from('maintenance_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteMaintenanceRecord(id: string) {
    const { error } = await supabase
      .from('maintenance_records')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Vehicle Services
export const vehicleService = {
  async getVehicles(workshopId: string): Promise<Vehicle[]> {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('workshop_id', workshopId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createVehicle(vehicle: any): Promise<Vehicle> {
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicle)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Training Services
export const trainingService = {
  async getModules(): Promise<TrainingModule[]> {
    const { data, error } = await supabase
      .from('training_modules')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getModuleById(id: string): Promise<TrainingModule> {
    const { data, error } = await supabase
      .from('training_modules')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}

// Real-time Services
export const realtimeService = {
  subscribeToMaintenanceRecords(workshopId: string, callback: (payload: any) => void) {
    return supabase
      .channel('maintenance_records')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'maintenance_records',
        filter: `workshop_id=eq.${workshopId}`
      }, callback)
      .subscribe()
  },

  subscribeToWorkshops(callback: (payload: any) => void) {
    return supabase
      .channel('workshops')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'workshops'
      }, callback)
      .subscribe()
  }
}