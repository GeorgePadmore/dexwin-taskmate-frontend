import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import authService from '@/services/auth'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      setMessage('Invalid or missing verification token.')
      return
    }
    setStatus('loading')
    authService.verifyEmail(token)
      .then((response) => {
        if (response.success) {
          setStatus('success')
          setMessage('Your email has been verified! You can now log in.')
        } else {
          setStatus('error')
          setMessage(response.response_desc)
        }
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Verification failed. Please try again.')
      })
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="w-full max-w-[400px] bg-white rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-[#1C1E21]">Email Verification</h1>
        {status === 'loading' && (
          <div className="text-[#4461F2]">Verifying your email...</div>
        )}
        {status === 'success' && (
          <>
            <div className="text-green-600 mb-4">{message}</div>
            <Button asChild className="w-full bg-[#4461F2] hover:bg-[#2941dc] text-white mt-2">
              <Link to="/login">Go to Login</Link>
            </Button>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-red-500 mb-4">{message}</div>
            <Button asChild className="w-full bg-[#4461F2] hover:bg-[#2941dc] text-white mt-2">
              <Link to="/signup">Back to Signup</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
} 