"use client"

import type { User } from "@/hooks/use-auth"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardContent } from "./dashboard-content"
import { useState } from "react"

interface DashboardProps {
  user: User
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} onLogout={onLogout} />
      <div className="flex">
        <DashboardSidebar userRole={user.role} activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <DashboardContent user={user} activeSection={activeSection} />
        </main>
      </div>
    </div>
  )
}
