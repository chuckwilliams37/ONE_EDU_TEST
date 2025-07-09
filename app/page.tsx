'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2, Sparkles } from 'lucide-react'

export default function Home() {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth')
      } else if (userRole === 'child') {
        router.push('/dashboard')
      } else if (userRole === 'parent') {
        router.push('/parent')
      } else {
        router.push('/role-select')
      }
    }
  }, [user, userRole, loading, router])

  if (loading) {
    return ( 
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Astra</h1>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Loading your learning adventure...</p>
          </div>
          <Loader2 className="w-8 h-8 text-gray-600 animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  return null
}