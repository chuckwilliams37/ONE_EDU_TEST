'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2, Sparkles, Heart, Star } from 'lucide-react'

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
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
              <Sparkles className="w-10 h-10 text-purple-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center animate-bounce">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
              <Star className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">ONE EDU</h1>
            <p className="text-white/80">Loading your learning adventure...</p>
          </div>
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  return null
}