"use client"

import { useState, useEffect } from "react"

export type UserRole = "admin" | "fleet_manager" | "dispatcher" | "driver"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  company: string
}

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  "admin@trucking.com": {
    id: "1",
    name: "John Admin",
    email: "admin@trucking.com",
    role: "admin",
    company: "TruckCorp LLC",
  },
  "fleet@trucking.com": {
    id: "2",
    name: "Sarah Fleet",
    email: "fleet@trucking.com",
    role: "fleet_manager",
    company: "TruckCorp LLC",
  },
  "dispatch@trucking.com": {
    id: "3",
    name: "Mike Dispatch",
    email: "dispatch@trucking.com",
    role: "dispatcher",
    company: "TruckCorp LLC",
  },
  "driver@trucking.com": {
    id: "4",
    name: "Tom Driver",
    email: "driver@trucking.com",
    role: "driver",
    company: "TruckCorp LLC",
  },
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("trucking_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers[email.toLowerCase()]
    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("trucking_user", JSON.stringify(foundUser))
      return { success: true }
    }
    return { success: false, error: "Invalid credentials" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("trucking_user")
  }

  return { user, login, logout }
}
