"use client"
import { LoginForm } from "@/components/auth/login-form"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { user, login, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <LoginForm onLogin={login} />
      </div>
    )
  }

  return <Dashboard user={user} onLogout={logout} />
}
