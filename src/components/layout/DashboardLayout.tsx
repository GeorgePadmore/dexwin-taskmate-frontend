import { Link } from 'react-router-dom'
import { CheckCircle, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/AuthContext'
import { useTheme } from '@/store/ThemeContext'
import { useNavigate } from 'react-router-dom'

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Helper to get initials from full name
const getInitials = (fullName: string) => {
  if (!fullName) return ''
  const names = fullName.trim().split(' ')
  if (names.length === 1) return names[0][0].toUpperCase()
  return (names[0][0] + names[names.length - 1][0]).toUpperCase()
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout, isAuthenticated, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="border-b border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#4461F2]" />
            <span className="text-xl font-semibold dark:text-white">TodoMaster</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-10 h-10 text-[#1C1E21] dark:text-white"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-[#1C1E21] dark:text-white hover:text-[#4461F2] dark:hover:text-[#4461F2] hover:bg-transparent"
            >
              Logout
            </Button>
            {!isAuthenticated ? (
              <Button
                size="sm"
                asChild
                className="bg-[#4461F2] hover:bg-[#2941dc] text-white rounded-full px-4"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            ) : user ? (
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4461F2] text-white font-bold text-lg select-none"
                title={user.fullName}
                aria-label={user.fullName}
              >
                {getInitials(user.fullName)}
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
          {children}
        </div>
      </main>
    </div>
  )
} 