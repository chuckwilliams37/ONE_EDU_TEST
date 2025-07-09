'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, UserRole, ChildProfile } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  userRole: UserRole | null
  childProfile: ChildProfile | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setUserRole: (role: UserRole) => void
  setChildProfile: (profile: ChildProfile) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRoleState] = useState<UserRole | null>(null)
  const [childProfile, setChildProfileState] = useState<ChildProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const role = localStorage.getItem('userRole') as UserRole
        setUserRoleState(role)
        if (role === 'child') {
          const profile = localStorage.getItem('childProfile')
          if (profile) {
            setChildProfileState(JSON.parse(profile))
          }
        }
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (event === 'SIGNED_OUT') {
          setUserRoleState(null)
          setChildProfileState(null)
          localStorage.removeItem('userRole')
          localStorage.removeItem('childProfile')
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role)
    localStorage.setItem('userRole', role)
  }

  const setChildProfile = (profile: ChildProfile) => {
    setChildProfileState(profile)
    localStorage.setItem('childProfile', JSON.stringify(profile))
  }

  return (
    <AuthContext.Provider value={{
      user,
      userRole,
      childProfile,
      loading,
      signUp,
      signIn,
      signOut,
      setUserRole,
      setChildProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}