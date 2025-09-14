import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@mecmain/supabase'
import { User as SupabaseUser } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'workshop_owner' | 'technician' | 'student'
  workshopId?: string
  isEmailVerified: boolean
}

interface AuthState {
  user: User | null
  supabaseUser: SupabaseUser | null
  isAuthenticated: boolean
  isInitialized: boolean
  isLoading: boolean
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  initializeAuth: () => void
  setLoading: (loading: boolean) => void
  setUser: (user: User | null) => void
  setSupabaseUser: (user: SupabaseUser | null) => void
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: string
  workshopId?: string
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      supabaseUser: null,
      isAuthenticated: false,
      isInitialized: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const { user } = await authService.signIn(email, password)
          
          if (!user) throw new Error('Login failed')
          
          // Get user profile from our users table
          const userProfile = await getUserProfile(user.id)
          
          set({
            user: userProfile,
            supabaseUser: user,
            isAuthenticated: true,
            isLoading: false
          })
          
          toast.success('¡Bienvenido a MecMain IA!')
        } catch (error: any) {
          set({ isLoading: false })
          toast.error(error.message || 'Error al iniciar sesión')
          throw error
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        try {
          const { user: authUser } = await authService.signUp(data.email, data.password, {
            name: data.name,
            role: data.role as any,
            workshop_id: data.workshopId
          })
          
          if (!authUser) throw new Error('Registration failed')
          
          // Get user profile from our users table
          const userProfile = await getUserProfile(authUser.id)
          
          set({
            user: userProfile,
            supabaseUser: authUser,
            isAuthenticated: true,
            isLoading: false
          })
          
          toast.success('¡Cuenta creada exitosamente!')
        } catch (error: any) {
          set({ isLoading: false })
          toast.error(error.message || 'Error al crear la cuenta')
          throw error
        }
      },

      logout: async () => {
        try {
          await authService.signOut()
          
          set({
            user: null,
            supabaseUser: null,
            isAuthenticated: false,
            isLoading: false
          })
          
          toast.success('Sesión cerrada exitosamente')
        } catch (error: any) {
          console.error('Error during logout:', error)
          // Still clear local state even if logout fails
          set({
            user: null,
            supabaseUser: null,
            isAuthenticated: false,
            isLoading: false
          })
        }
      },

      initializeAuth: async () => {
        try {
          const user = await authService.getCurrentUser()
          
          if (user) {
            // Get user profile from our users table
            const userProfile = await getUserProfile(user.id)
            
            set({
              user: userProfile,
              supabaseUser: user,
              isAuthenticated: true
            })
          }
        } catch (error) {
          console.error('Error initializing auth:', error)
        } finally {
          set({ isInitialized: true })
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setUser: (user: User | null) => {
        set({ user })
      },

      setSupabaseUser: (user: SupabaseUser | null) => {
        set({ supabaseUser: user })
      }
    }),
    {
      name: 'mecmain-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

// Helper function to get user profile from our users table
async function getUserProfile(userId: string): Promise<User | null> {
  try {
    // This would typically be an API call to get the user profile
    // For now, we'll return a basic profile based on the auth user
    return {
      id: userId,
      email: '', // Will be filled from auth user
      name: '',
      role: 'technician',
      isEmailVerified: false
    }
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}