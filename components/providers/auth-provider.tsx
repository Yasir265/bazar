"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/* Demo admin account: admin@bazaar.pk / admin123 */
const DEMO_ADMIN: User = {
  id: "admin-001",
  email: "admin@bazaar.pk",
  name: "Admin",
  role: "admin",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("bazaar_user")
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
    }
    setIsLoading(false)
  }, [])

  const persist = useCallback((u: User | null) => {
    setUser(u)
    if (u) localStorage.setItem("bazaar_user", JSON.stringify(u))
    else localStorage.removeItem("bazaar_user")
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    if (email === "admin@bazaar.pk" && password === "admin123") {
      persist(DEMO_ADMIN)
      return { success: true }
    }
    const usersRaw = localStorage.getItem("bazaar_users") ?? "[]"
    const users: Array<User & { password: string }> = JSON.parse(usersRaw)
    const found = users.find((u) => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...safe } = found
      persist(safe)
      return { success: true }
    }
    return { success: false, error: "Invalid email or password" }
  }, [persist])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const usersRaw = localStorage.getItem("bazaar_users") ?? "[]"
    const users: Array<User & { password: string }> = JSON.parse(usersRaw)
    if (users.some((u) => u.email === email) || email === "admin@bazaar.pk") {
      return { success: false, error: "An account with this email already exists" }
    }
    const newUser = { id: `user-${Date.now()}`, email, name, role: "customer" as const, password }
    users.push(newUser)
    localStorage.setItem("bazaar_users", JSON.stringify(users))
    const { password: _, ...safe } = newUser
    persist(safe)
    return { success: true }
  }, [persist])

  const logout = useCallback(() => persist(null), [persist])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be inside AuthProvider")
  return ctx
}
