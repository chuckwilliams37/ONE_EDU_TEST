'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageCircle, 
  Trophy, 
  Star, 
  Zap, 
  Lightbulb, 
  Crown,
  Target,
  Award,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  LogOut
} from 'lucide-react'

export default function DashboardPage() {
  const { user, userRole, childProfile, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || userRole !== 'child' || !childProfile) {
      router.push('/')
    }
  }, [user, userRole, childProfile, router])

  if (!childProfile) return null

  const xpProgress = 50
  const level = 1
  const xpToNextLevel = 50

  const skills = [
    { name: 'Communication', level: childProfile.skills.communication, icon: MessageCircle },
    { name: 'Problem Solving', level: childProfile.skills.problemSolving, icon: Lightbulb },
    { name: 'Leadership', level: childProfile.skills.leadership, icon: Crown }
  ]

  const badges = [
    { name: 'First Chat', icon: MessageCircle },
    { name: 'Quick Learner', icon: Zap }
  ]

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
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                aria-label="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome back, {childProfile.name}</h1>
                <p className="text-gray-600 text-sm">Ready to learn something amazing today?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push('/chat')}
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Astra
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-gray-600" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">
                  50 XP
                </span>
                <span className="text-gray-600">Level {level}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Current Level</span>
                <span>{xpToNextLevel} XP to Level {level + 1}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <Card key={index}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <skill.icon className="w-5 h-5 text-gray-600" />
                  {skill.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">Level {skill.level}</span>
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < skill.level ? 'bg-gray-600' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="w-5 h-5 text-gray-600" />
              Your Badges
            </CardTitle>
            <CardDescription>
              Awesome achievements you've unlocked!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center">
                    {badge.name}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-50">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-500 text-center">
                  Next Badge
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">Chat with Astra</h3>
                  <p className="text-gray-600 text-sm">Continue your learning conversation</p>
                </div>
                <Button
                  onClick={() => router.push('/chat')}
                  variant="outline"
                  size="sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}