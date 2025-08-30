"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, AlertTriangle, CheckCircle, Pause } from "lucide-react"

interface ELDData {
  driverId: string
  driverName: string
  truckNumber: string
  status: "driving" | "on_duty" | "sleeper" | "off_duty"
  hoursRemaining: number
  totalHours: number
  violations: string[]
  lastUpdate: string
}

const mockELDData: ELDData[] = [
  {
    driverId: "1",
    driverName: "John Smith",
    truckNumber: "TRK-001",
    status: "driving",
    hoursRemaining: 6.5,
    totalHours: 4.5,
    violations: [],
    lastUpdate: "2 minutes ago",
  },
  {
    driverId: "2",
    driverName: "Mike Johnson",
    truckNumber: "TRK-003",
    status: "on_duty",
    hoursRemaining: 2.5,
    totalHours: 8.5,
    violations: ["Approaching 11-hour limit"],
    lastUpdate: "5 minutes ago",
  },
  {
    driverId: "3",
    driverName: "Sarah Wilson",
    truckNumber: "TRK-005",
    status: "sleeper",
    hoursRemaining: 10,
    totalHours: 1,
    violations: [],
    lastUpdate: "1 hour ago",
  },
  {
    driverId: "4",
    driverName: "Tom Davis",
    truckNumber: "TRK-004",
    status: "off_duty",
    hoursRemaining: 11,
    totalHours: 0,
    violations: [],
    lastUpdate: "8 hours ago",
  },
]

export function ELDCompliance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "driving":
        return "default"
      case "on_duty":
        return "default"
      case "sleeper":
        return "secondary"
      case "off_duty":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "driving":
        return <Clock className="h-4 w-4" />
      case "on_duty":
        return <CheckCircle className="h-4 w-4" />
      case "sleeper":
        return <Pause className="h-4 w-4" />
      case "off_duty":
        return <Pause className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const driversWithViolations = mockELDData.filter((driver) => driver.violations.length > 0)
  const activeDrivers = mockELDData.filter((driver) => driver.status === "driving" || driver.status === "on_duty")

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDrivers.length}</div>
            <p className="text-xs text-muted-foreground">Currently on duty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{driversWithViolations.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Hours Left</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockELDData.reduce((sum, driver) => sum + driver.hoursRemaining, 0) / mockELDData.length).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">Per driver</p>
          </CardContent>
        </Card>
      </div>

      {/* Violation Alerts */}
      {driversWithViolations.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>HOS Violations Detected:</strong> {driversWithViolations.length} driver(s) require immediate
            attention to maintain compliance.
          </AlertDescription>
        </Alert>
      )}

      {/* Driver Status */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Hours of Service</CardTitle>
          <CardDescription>Real-time ELD data and compliance monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockELDData.map((driver) => (
              <Card key={driver.driverId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold">{driver.driverName}</h3>
                        <p className="text-sm text-gray-600">{driver.truckNumber}</p>
                      </div>
                      <Badge variant={getStatusColor(driver.status)} className="flex items-center gap-1">
                        {getStatusIcon(driver.status)}
                        {driver.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Hours Remaining:</span>
                        <span
                          className={`font-bold ${
                            driver.hoursRemaining < 2
                              ? "text-red-600"
                              : driver.hoursRemaining < 4
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {driver.hoursRemaining}h
                        </span>
                      </div>
                      <Progress
                        value={(driver.hoursRemaining / 11) * 100}
                        className="w-24"
                        // @ts-ignore
                        indicatorClassName={
                          driver.hoursRemaining < 2
                            ? "bg-red-500"
                            : driver.hoursRemaining < 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }
                      />
                    </div>
                  </div>
                  {driver.violations.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-600">Violations:</span>
                      </div>
                      <ul className="mt-1 text-sm text-red-600">
                        {driver.violations.map((violation, index) => (
                          <li key={index}>• {violation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">Last update: {driver.lastUpdate}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
