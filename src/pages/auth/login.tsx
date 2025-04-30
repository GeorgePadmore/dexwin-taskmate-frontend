import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/store/AuthContext'
import { CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData)
      // Navigation will happen automatically through the useEffect
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [formData, login])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Only clear error if the user is actively trying to fix it
    if (error) {
      setError('')
    }
  }, [error])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <header className="border-b border-[#E5E7EB] dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#4461F2]" />
            <span className="text-xl font-semibold dark:text-white">TodoMaster</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px] p-8 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-gray-800 dark:bg-gray-800/50">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#1C1E21] dark:text-white">Welcome Back</h1>
            <p className="text-[#6B7280] dark:text-gray-400 mt-2">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/30 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#4461F2] hover:bg-[#2941dc] text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-center text-[#6B7280] dark:text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#4461F2] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
} 