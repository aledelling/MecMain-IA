export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'workshop_owner' | 'technician' | 'student'
          workshop_id: string | null
          is_email_verified: boolean
          is_active: boolean
          profile_image: string | null
          phone: string | null
          address: Json | null
          preferences: Json | null
          training_progress: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'admin' | 'workshop_owner' | 'technician' | 'student'
          workshop_id?: string | null
          is_email_verified?: boolean
          is_active?: boolean
          profile_image?: string | null
          phone?: string | null
          address?: Json | null
          preferences?: Json | null
          training_progress?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'workshop_owner' | 'technician' | 'student'
          workshop_id?: string | null
          is_email_verified?: boolean
          is_active?: boolean
          profile_image?: string | null
          phone?: string | null
          address?: Json | null
          preferences?: Json | null
          training_progress?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      workshops: {
        Row: {
          id: string
          name: string
          description: string | null
          owner_id: string
          address: Json
          contact: Json
          services: string[]
          specialties: string[]
          certifications: Json[]
          operating_hours: Json
          settings: Json
          statistics: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          owner_id: string
          address: Json
          contact: Json
          services?: string[]
          specialties?: string[]
          certifications?: Json[]
          operating_hours?: Json
          settings?: Json
          statistics?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          owner_id?: string
          address?: Json
          contact?: Json
          services?: string[]
          specialties?: string[]
          certifications?: Json[]
          operating_hours?: Json
          settings?: Json
          statistics?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      maintenance_records: {
        Row: {
          id: string
          workshop_id: string
          vehicle_id: string
          technician_id: string
          type: 'preventive' | 'corrective' | 'predictive' | 'emergency'
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          title: string
          description: string | null
          diagnosis: string | null
          actions_taken: string | null
          parts_used: Json[]
          cost: number
          duration_minutes: number
          scheduled_date: string
          completed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workshop_id: string
          vehicle_id: string
          technician_id: string
          type: 'preventive' | 'corrective' | 'predictive' | 'emergency'
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          title: string
          description?: string | null
          diagnosis?: string | null
          actions_taken?: string | null
          parts_used?: Json[]
          cost?: number
          duration_minutes?: number
          scheduled_date: string
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workshop_id?: string
          vehicle_id?: string
          technician_id?: string
          type?: 'preventive' | 'corrective' | 'predictive' | 'emergency'
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          title?: string
          description?: string | null
          diagnosis?: string | null
          actions_taken?: string | null
          parts_used?: Json[]
          cost?: number
          duration_minutes?: number
          scheduled_date?: string
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          workshop_id: string
          make: string
          model: string
          year: number
          license_plate: string
          vin: string | null
          color: string | null
          mileage: number | null
          fuel_type: string | null
          transmission: string | null
          engine_size: string | null
          owner_name: string | null
          owner_phone: string | null
          owner_email: string | null
          notes: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workshop_id: string
          make: string
          model: string
          year: number
          license_plate: string
          vin?: string | null
          color?: string | null
          mileage?: number | null
          fuel_type?: string | null
          transmission?: string | null
          engine_size?: string | null
          owner_name?: string | null
          owner_phone?: string | null
          owner_email?: string | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workshop_id?: string
          make?: string
          model?: string
          year?: number
          license_plate?: string
          vin?: string | null
          color?: string | null
          mileage?: number | null
          fuel_type?: string | null
          transmission?: string | null
          engine_size?: string | null
          owner_name?: string | null
          owner_phone?: string | null
          owner_email?: string | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      training_modules: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          duration_minutes: number
          lessons: Json[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          duration_minutes: number
          lessons?: Json[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          duration_minutes?: number
          lessons?: Json[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'workshop_owner' | 'technician' | 'student'
      maintenance_type: 'preventive' | 'corrective' | 'predictive' | 'emergency'
      maintenance_status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
      training_difficulty: 'beginner' | 'intermediate' | 'advanced'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
