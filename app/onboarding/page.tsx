'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [interests, setInterests] = useState('')
  const { user, setChildProfile } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return

    const profile = {
      id: user.id,
      name,
      age: parseInt(age),
      interests,
      xp: 0,
      skills: {
        communication: 1,
        problemSolving: 1,
        leadership: 1
      }
    }

    setChildProfile(profile)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome!</h1>
          </div>
          <p className="text-gray-600">Let's get to know you better</p>
        </div>

        {/* Onboarding Form */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-900">Tell us about yourself</CardTitle>
            <CardDescription>
              This helps Astra personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  What's your name?
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">
                  How old are you?
                </Label>
                <Select value={age} onValueChange={setAge} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 6 }, (_, i) => (
                      <SelectItem key={i + 8} value={String(i + 8)}>
                        {i + 8} years old
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">
                  What do you love to do?
                </Label>
                <Textarea
                  id="interests"
                  placeholder="Tell us about your hobbies, favorite activities, or things you're curious about..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  required
                  className="resize-none"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!name || !age || !interests}
              >
                Meet Astra
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}