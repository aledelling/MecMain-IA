import { apiClient } from './apiClient'

export interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
    workshopId?: string
    isEmailVerified: boolean
  }
  accessToken: string
  refreshToken: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: string
  workshopId?: string
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    })
    return response.data.data
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/register', data)
    return response.data.data
  },

  async logout(refreshToken: string): Promise<void> {
    await apiClient.post('/auth/logout', { refreshToken })
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post('/auth/refresh', { refreshToken })
    return response.data.data
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password })
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token })
  }
}
