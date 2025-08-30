"use client"

import type { User } from "@/hooks/use-auth"
import { OverviewSection } from "./sections/overview-section"
import { FleetSection } from "./sections/fleet-section"
import { FinancialSection } from "./sections/financial-section"
import { DispatchSection } from "./sections/dispatch-section"
import { DocumentsSection } from "./sections/documents-section"
import { AISection } from "./sections/ai-section"
import { UsersSection } from "./sections/users-section"
import { AnalyticsSection } from "./sections/analytics-section"
import { SettingsSection } from "./sections/settings-section"
import { MaintenanceSection } from "./sections/maintenance-section"
import { DriversSection } from "./sections/drivers-section"
import { RoutesSection } from "./sections/routes-section"
import { LoadsSection } from "./sections/loads-section"
import { ProfileSection } from "./sections/profile-section"

interface DashboardContentProps {
  user: User
  activeSection: string
}

export function DashboardContent({ user, activeSection }: DashboardContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection user={user} />
      case "fleet":
        return <FleetSection user={user} />
      case "financial":
        return <FinancialSection user={user} />
      case "dispatch":
        return <DispatchSection user={user} />
      case "documents":
        return <DocumentsSection />
      case "ai-assistant":
        return <AISection user={user} />
      case "users":
        return <UsersSection user={user} />
      case "analytics":
        return <AnalyticsSection user={user} />
      case "settings":
        return <SettingsSection user={user} />
      case "maintenance":
        return <MaintenanceSection user={user} />
      case "drivers":
        return <DriversSection user={user} />
      case "routes":
        return <RoutesSection user={user} />
      case "loads":
        return <LoadsSection user={user} />
      case "profile":
        return <ProfileSection user={user} />
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )
    }
  }

  return <div className="space-y-6">{renderSection()}</div>
}
