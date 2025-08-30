"use client"

import type { UserRole } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Truck,
  Users,
  MapPin,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  Wrench,
  Navigation,
  Brain,
} from "lucide-react"

interface DashboardSidebarProps {
  userRole: UserRole
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = {
  admin: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "fleet", label: "Fleet Management", icon: Truck },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "dispatch", label: "Dispatch", icon: MapPin },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "ai-assistant", label: "AI Assistant", icon: Brain },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ],
  fleet_manager: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "fleet", label: "Fleet Monitoring", icon: Truck },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "drivers", label: "Driver Management", icon: Users },
    { id: "ai-assistant", label: "AI Assistant", icon: Brain },
    { id: "analytics", label: "Reports", icon: BarChart3 },
  ],
  dispatcher: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "dispatch", label: "Dispatch Board", icon: MapPin },
    { id: "routes", label: "Route Planning", icon: Navigation },
    { id: "loads", label: "Load Management", icon: Truck },
    { id: "ai-assistant", label: "AI Assistant", icon: Brain },
    { id: "drivers", label: "Driver Status", icon: Users },
  ],
  driver: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "loads", label: "My Loads", icon: Truck },
    { id: "routes", label: "Routes", icon: Navigation },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "profile", label: "Profile", icon: Users },
  ],
}

export function DashboardSidebar({ userRole, activeSection, onSectionChange }: DashboardSidebarProps) {
  const items = menuItems[userRole] || []

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeSection === item.id && "bg-blue-600 text-white hover:bg-blue-700",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
