"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Wrench, AlertTriangle, CheckCircle, Plus } from "lucide-react"

interface MaintenanceRecord {
  id: string
  truckId: string
  truckNumber: string
  type: "routine" | "repair" | "inspection"
  description: string
  status: "scheduled" | "in_progress" | "completed" | "overdue"
  scheduledDate: string
  completedDate?: string
  cost?: number
  mileage: number
}

const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "1",
    truckId: "1",
    truckNumber: "TRK-001",
    type: "routine",
    description: "Oil change and filter replacement",
    status: "scheduled",
    scheduledDate: "2024-02-15",
    mileage: 125000,
  },
  {
    id: "2",
    truckId: "2",
    truckNumber: "TRK-002",
    type: "repair",
    description: "Brake system repair",
    status: "in_progress",
    scheduledDate: "2024-01-20",
    mileage: 180000,
    cost: 1200,
  },
  {
    id: "3",
    truckId: "3",
    truckNumber: "TRK-003",
    type: "inspection",
    description: "DOT annual inspection",
    status: "completed",
    scheduledDate: "2024-01-10",
    completedDate: "2024-01-10",
    mileage: 95000,
    cost: 150,
  },
  {
    id: "4",
    truckId: "4",
    truckNumber: "TRK-004",
    type: "routine",
    description: "Tire rotation and alignment",
    status: "overdue",
    scheduledDate: "2024-01-05",
    mileage: 220000,
  },
]

export function MaintenanceTracker() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "secondary"
      case "in_progress":
        return "default"
      case "completed":
        return "default"
      case "overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-4 w-4" />
      case "in_progress":
        return <Wrench className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "routine":
        return "bg-blue-100 text-blue-800"
      case "repair":
        return "bg-red-100 text-red-800"
      case "inspection":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overdueCount = mockMaintenanceRecords.filter((r) => r.status === "overdue").length
  const scheduledCount = mockMaintenanceRecords.filter((r) => r.status === "scheduled").length
  const inProgressCount = mockMaintenanceRecords.filter((r) => r.status === "in_progress").length

  return (
    <div className="space-y-6">
      {/* Maintenance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">Currently being serviced</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledCount}</div>
            <p className="text-xs text-muted-foreground">Upcoming maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Track all maintenance activities and schedules</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMaintenanceRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{record.truckNumber}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                            {record.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Scheduled: {record.scheduledDate}</span>
                          <span>Mileage: {record.mileage.toLocaleString()}</span>
                          {record.cost && <span>Cost: ${record.cost}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={getStatusColor(record.status)} className="flex items-center gap-1">
                        {getStatusIcon(record.status)}
                        {record.status.replace("_", " ")}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
