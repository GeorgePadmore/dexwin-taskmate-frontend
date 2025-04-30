import api from './api'

export interface SignupData {
  fullName: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface ApiResponse<T> {
  response_code: string
  response_desc: string
  success: boolean
  data: T
}

export interface User {
  id: string
  email: string
  fullName: string
}

export interface SignupResponse {
  email: string
  fullName: string
  verificationToken: string
}

export interface LoginResponse {
  token: string
  user: User
}

const authService = {
  signup: async (data: SignupData): Promise<ApiResponse<SignupResponse>> => {
    const response = await api.post<ApiResponse<SignupResponse>>('/auth/signup', data)
    return response as unknown as ApiResponse<SignupResponse>
  },

  verifyEmail: async (token: string): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>('/auth/verify-email', { token })
    return response as unknown as ApiResponse<null>
  },

  login: async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', data)
    const apiResponse = response as unknown as ApiResponse<LoginResponse>
    if (apiResponse.success && apiResponse.data) {
      localStorage.setItem('token', apiResponse.data.token)
      localStorage.setItem('user', JSON.stringify(apiResponse.data.user))
    }
    return apiResponse
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/auth/me')
    const apiResponse = response as unknown as ApiResponse<User>
    if (apiResponse.success) {
      localStorage.setItem('user', JSON.stringify(apiResponse.data))
    }
    return apiResponse
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },
}

export default authService