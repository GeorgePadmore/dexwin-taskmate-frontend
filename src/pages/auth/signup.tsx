import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User } from 'lucide-react'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement signup functionality
    console.log('Signup:', { fullName, email, password })
  }

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
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
          <h1 className="text-[32px] font-semibold text-[#1C1E21] mb-2">Create an Account</h1>
          <p className="text-[16px] text-[#6B7280]">
            Sign up to start managing your tasks efficiently
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-[16px] font-medium text-[#1C1E21] block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                placeholder="John Doe"
                required
                className="w-full h-12 pl-10 pr-3 text-[16px] rounded-[8px] border border-[#E5E7EB] bg-white placeholder:text-[#9CA3AF] focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2]"
              />
            </div>
          </div>

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
            <label htmlFor="password" className="text-[16px] font-medium text-[#1C1E21] block">
              Password
            </label>
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
            <p className="text-[14px] text-[#6B7280] mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#4461F2] hover:bg-[#2941dc] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2"
          >
            <span className="i-lucide-user-plus text-xl" />
            Sign Up
          </Button>

          <div className="text-center text-[16px] text-[#6B7280]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#4461F2] hover:text-[#2941dc] font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 