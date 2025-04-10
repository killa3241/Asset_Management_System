//hooks/use-auth.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, login, logout, register } from "@/lib/auth"
import type { AuthResponse, LoginData, RegisterData, User } from "@/types/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginData) => Promise<AuthResponse>
  register: (data: RegisterData) => Promise<AuthResponse>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUserFromSession() {
      setLoading(true)
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUserFromSession()
  }, [])

  const handleLogin = async (data: LoginData) => {
    const response = await login(data)
    console.log("Login response:", response)
    if (response.success && response.user) {
      setUser(response.user)
      router.push("/dashboard")
    }
    return response
  }

  const handleRegister = async (data: RegisterData) => {
    const response = await register(data)
    if (response.success && response.user) {
      setUser(response.user)
      router.push("/dashboard")
    }
    return response
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push("/auth/login-register")
  }

  const value: AuthContextType = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
