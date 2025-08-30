"use client"

import type { User } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTrucks } from "@/lib/mock-data"
import { Truck, Search, MapPin, Wrench, Calendar, Fuel } from "lucide-react"
import { useState } from "react"
import { AddTruckDialog } from "@/components/fleet/add-truck-dialog"
import { DriverManagement } from "@/components/fleet/driver-management"
import { MaintenanceTracker } from "@/components/fleet/maintenance-tracker"

interface FleetSectionProps {
  user: User
}

export function FleetSection({ user }: FleetSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [trucks, setTrucks] = useState(mockTrucks)

  const filteredTrucks = trucks.filter(
    (truck) =>
      truck.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTruck = (newTruck: any) => {
    setTrucks([...trucks, newTruck])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "maintenance":
        return "destructive"
      case "idle":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Truck className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "idle":
        return <MapPin className="h-4 w-4" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Manage your trucks, drivers, and maintenance schedules</p>
        </div>
        {(user.role === "admin" || user.role === "fleet_manager") && <AddTruckDialog onAddTruck={handleAddTruck} />}
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trucks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trucks.filter((t) => t.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trucks.filter((t) => t.status === "maintenance").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle</CardTitle>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trucks.filter((t) => t.status === "idle").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Fleet Inventory</TabsTrigger>
          <TabsTrigger value="drivers">Driver Management</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Inventory</CardTitle>
              <CardDescription>View and manage all trucks in your fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search trucks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTrucks.map((truck) => (
                  <Card key={truck.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{truck.number}</CardTitle>
                        <Badge variant={getStatusColor(truck.status)} className="flex items-center gap-1">
                          {getStatusIcon(truck.status)}
                          {truck.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {truck.year} {truck.make} {truck.model}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{truck.location}</span>
                      </div>
                      {truck.driver && (
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                          <span>{truck.driver}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm">
                        <Fuel className="h-4 w-4 text-gray-500" />
                        <span>{truck.mileage.toLocaleString()} miles</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Next service: {truck.nextMaintenance}</span>
                      </div>
                      {(user.role === "admin" || user.role === "fleet_manager") && (
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Assign
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <DriverManagement />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
