import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement login functionality
    console.log('Login:', { email, password })
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="w-full max-w-[460px] bg-white rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-8">
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-semibold text-[#1C1E21] mb-2">Welcome Back</h1>
          <p className="text-[16px] text-[#6B7280]">
            Enter your credentials to access your tasks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[16px] font-medium text-[#1C1E21] block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
                className="w-full h-12 pl-10 pr-3 text-[16px] rounded-[8px] border border-[#E5E7EB] bg-white placeholder:text-[#9CA3AF] focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-[16px] font-medium text-[#1C1E21]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[14px] text-[#4461F2] hover:text-[#2941dc]"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full h-12 pl-10 pr-3 text-[16px] rounded-[8px] border border-[#E5E7EB] bg-white focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#4461F2] hover:bg-[#2941dc] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2"
          >
            <span className="i-lucide-log-in text-xl" />
            Sign In
          </Button>

          <div className="text-center text-[16px] text-[#6B7280]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4461F2] hover:text-[#2941dc] font-medium">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 