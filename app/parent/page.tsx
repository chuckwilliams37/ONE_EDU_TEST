'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, ArrowLeft, Calendar, Bell, Settings, BarChart } from 'lucide-react'

export default function ParentPage() {
  const { user, userRole, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || userRole !== 'parent') {
      router.push('/')
    }
  }, [user, userRole, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push('/')}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Parent Dashboard</h1>
                <p className="text-gray-600 text-sm">Monitor your child's learning journey</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                Thank you for registering as a parent! This feature is currently in development.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  The parent dashboard will include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <BarChart className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Progress Reports</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Learning Schedule</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Activity Notifications</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Account Settings</span>
                  </div>
                </div>
              </div>
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  We're working hard to bring you these features soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}