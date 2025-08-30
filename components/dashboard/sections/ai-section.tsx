import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAssistant } from "@/components/ai/ai-assistant"
import { LoadOptimizer } from "@/components/ai/load-optimizer"
import { PerformanceAnalytics } from "@/components/ai/performance-analytics"
import type { User } from "@/hooks/use-auth"

interface AISectionProps {
  user: User
}

export function AISection({ user }: AISectionProps) {
  // Show different tabs based on user role
  const getTabsForRole = () => {
    switch (user.role) {
      case "admin":
        return (
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="optimizer">Load Optimizer</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>
        )
      case "fleet_manager":
        return (
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>
        )
      case "dispatcher":
        return (
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="optimizer">Load Optimizer</TabsTrigger>
          </TabsList>
        )
      default:
        return (
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-gray-600">Intelligent insights and recommendations for your trucking operations</p>
        </div>
      </div>

      <Tabs defaultValue="assistant" className="w-full">
        {getTabsForRole()}

        <TabsContent value="assistant" className="space-y-4">
          <AIAssistant />
        </TabsContent>

        {(user.role === "admin" || user.role === "dispatcher") && (
          <TabsContent value="optimizer" className="space-y-4">
            <LoadOptimizer />
          </TabsContent>
        )}

        {(user.role === "admin" || user.role === "fleet_manager") && (
          <TabsContent value="analytics" className="space-y-4">
            <PerformanceAnalytics />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
