// hooks/use-auth.ts
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser, login as loginApi, register as registerApi, logout as logoutApi } from "@/lib/auth"
import type { User, LoginData, RegisterData } from "@/types/auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginData) => Promise<{ success: boolean; message?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<{ success: boolean; message?: string }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => ({ success: false }),
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Failed to load user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (data: LoginData) => {
    try {
      const res = await loginApi(data)
      if (res.success && res.user) {
        setUser(res.user)
        router.replace("/dashboard")
        return { success: true, message: res.message || "Login successful" }
      }
      return { success: false, message: res.message || "Invalid username or password" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Login failed. Please try again." }
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const res = await registerApi(data)
      if (res.success && res.user) {
        setUser(res.user)
        router.replace("/dashboard")
        return { success: true, message: res.message || "Registration successful" }
      }
      return { success: false, message: res.message || "Username already exists" }
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, message: "Registration failed. Please try again." }
    }
  }

  const logout = async () => {
    try {
      const res = await logoutApi()
      if (res.success) {
        setUser(null)
        // Force a hard refresh to clear any cached state
        window.location.href = "/"
        return { success: true, message: res.message || "Logged out successfully" }
      }
      return { success: false, message: res.message || "Logout failed" }
    } catch (error) {
      console.error("Logout error:", error)
      return { success: false, message: "Logout failed. Please try again." }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
