import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import authService, { User, LoginData, SignupData } from '@/services/auth'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (data: LoginData) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  verifyEmail: (token: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated())
  const [user, setUser] = useState<User | null>(() => authService.getUser())

  useEffect(() => {
    if (isAuthenticated && !user) {
      authService.getProfile()
        .then(response => {
          if (response.success) {
            setUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
          }
        })
        .catch(() => {
          setIsAuthenticated(false)
          setUser(null)
        })
    }
  }, [isAuthenticated, user])

  const login = useCallback(async (data: LoginData) => {
    const response = await authService.login(data)
    if (response.success) {
      setIsAuthenticated(true)
      setUser(response.data.user)
    } else {
      throw new Error(response.response_desc)
    }
  }, [])

  const signup = useCallback(async (data: SignupData) => {
    const response = await authService.signup(data)
    if (!response.success) {
      throw new Error(response.response_desc)
    }
  }, [])

  const verifyEmail = useCallback(async (token: string) => {
    const response = await authService.verifyEmail(token)
    if (!response.success) {
      throw new Error(response.response_desc)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        signup, 
        logout,
        verifyEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 