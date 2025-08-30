"use client"

import type { User } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockLoads, mockTrucks } from "@/lib/mock-data"
import { MapPin, Search, Truck, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"
import { AddLoadDialog } from "@/components/dispatch/add-load-dialog"
import { RouteOptimizer } from "@/components/dispatch/route-optimizer"
import { LoadAssignment } from "@/components/dispatch/load-assignment"
import { ELDCompliance } from "@/components/dispatch/eld-compliance"

interface DispatchSectionProps {
  user: User
}

export function DispatchSection({ user }: DispatchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [loads, setLoads] = useState(mockLoads)
  const [selectedLoad, setSelectedLoad] = useState<any>(null)

  const filteredLoads = loads.filter(
    (load) =>
      load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddLoad = (newLoad: any) => {
    setLoads([...loads, newLoad])
  }

  const handleAssignLoad = (loadId: string, truckId: string, driverId: string) => {
    setLoads(
      loads.map((load) =>
        load.id === loadId
          ? {
              ...load,
              truckId,
              driverName: "Assigned Driver", // In real app, get from driver data
              status: "assigned",
            }
          : load,
      ),
    )
    setSelectedLoad(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "assigned":
        return "default"
      case "in_transit":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Calendar className="h-4 w-4" />
      case "assigned":
        return <Truck className="h-4 w-4" />
      case "in_transit":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <MapPin className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dispatch Management</h1>
          <p className="text-gray-600">Manage loads, assignments, and shipment tracking</p>
        </div>
        {(user.role === "admin" || user.role === "dispatcher") && <AddLoadDialog onAddLoad={handleAddLoad} />}
      </div>

      {/* Dispatch Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loads</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loads.filter((l) => l.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loads.filter((l) => l.status === "in_transit").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loads.filter((l) => l.status === "delivered").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="loads">Load Board</TabsTrigger>
          <TabsTrigger value="routes">Route Planning</TabsTrigger>
          <TabsTrigger value="assignment">Load Assignment</TabsTrigger>
          <TabsTrigger value="eld">ELD Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="loads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Load Board</CardTitle>
              <CardDescription>View and manage all loads and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search loads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredLoads.map((load) => (
                  <Card key={load.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold">{load.loadNumber}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {load.origin} → {load.destination}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-semibold">${load.revenue.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-500">{load.distance} miles</p>
                          </div>
                          <Badge variant={getStatusColor(load.status)} className="flex items-center gap-1">
                            {getStatusIcon(load.status)}
                            {load.status.replace("_", " ")}
                          </Badge>
                          {(user.role === "admin" || user.role === "dispatcher") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedLoad(load)}
                              disabled={load.status !== "pending"}
                            >
                              {load.status === "pending" ? "Assign" : "View"}
                            </Button>
                          )}
                        </div>
                      </div>
                      {load.truckId && load.driverName && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Truck className="h-4 w-4 text-blue-600" />
                              <span>{mockTrucks.find((t) => t.id === load.truckId)?.number || "Unknown Truck"}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{load.driverName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>Pickup: {load.pickupDate}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes">
          <RouteOptimizer origin="Dallas, TX" destination="Los Angeles, CA" />
        </TabsContent>

        <TabsContent value="assignment">
          {selectedLoad ? (
            <LoadAssignment
              loadId={selectedLoad.id}
              loadNumber={selectedLoad.loadNumber}
              origin={selectedLoad.origin}
              destination={selectedLoad.destination}
              revenue={selectedLoad.revenue}
              onAssign={(truckId, driverId) => handleAssignLoad(selectedLoad.id, truckId, driverId)}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No Load Selected</h3>
                <p className="text-gray-600">
                  Select a pending load from the Load Board to assign it to a truck and driver.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="eld">
          <ELDCompliance />
        </TabsContent>
      </Tabs>
    </div>
  )
}
