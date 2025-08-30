"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Navigation, Clock, Plus, Search, Route, Fuel } from "lucide-react"
import type { User } from "@/hooks/use-auth"

interface RoutesSectionProps {
  user: User
}

const routes = [
  {
    id: 1,
    name: "Denver to Phoenix",
    origin: "Denver, CO",
    destination: "Phoenix, AZ",
    distance: 602,
    estimatedTime: "9h 15m",
    fuelCost: 180,
    tollCost: 25,
    status: "active",
    driver: "John Smith",
    truck: "TRK-001",
    progress: 65,
  },
  {
    id: 2,
    name: "Las Vegas to Albuquerque",
    origin: "Las Vegas, NV",
    destination: "Albuquerque, NM",
    distance: 345,
    estimatedTime: "5h 30m",
    fuelCost: 105,
    tollCost: 0,
    status: "planned",
    driver: "Sarah Davis",
    truck: "TRK-005",
    progress: 0,
  },
  {
    id: 3,
    name: "Phoenix to Denver",
    origin: "Phoenix, AZ",
    destination: "Denver, CO",
    distance: 602,
    estimatedTime: "9h 20m",
    fuelCost: 185,
    tollCost: 25,
    status: "completed",
    driver: "Mike Wilson",
    truck: "TRK-003",
    progress: 100,
  },
]

const optimizedRoutes = [
  {
    id: 1,
    route: "Denver → Phoenix → Las Vegas",
    totalDistance: 947,
    estimatedTime: "14h 45m",
    fuelSavings: 45,
    efficiency: 92,
    recommended: true,
  },
  {
    id: 2,
    route: "Denver → Albuquerque → Phoenix",
    totalDistance: 1024,
    estimatedTime: "15h 30m",
    fuelSavings: 25,
    efficiency: 88,
    recommended: false,
  },
]

export function RoutesSection({ user }: RoutesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || route.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === "dispatcher" ? "Route Planning" : "My Routes"}
          </h1>
          <p className="text-gray-600">
            {user.role === "dispatcher"
              ? "Plan and optimize routes for maximum efficiency"
              : "View your assigned routes and navigation"}
          </p>
        </div>
        {user.role === "dispatcher" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Plan Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Plan New Route</DialogTitle>
                <DialogDescription>Create an optimized route for a driver</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="origin" className="text-right">
                    Origin
                  </Label>
                  <Input id="origin" placeholder="Starting location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destination" className="text-right">
                    Destination
                  </Label>
                  <Input id="destination" placeholder="End location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver" className="text-right">
                    Driver
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="sarah">Sarah Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="truck" className="text-right">
                    Truck
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select truck" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRK-001">TRK-001 - Freightliner</SelectItem>
                      <SelectItem value="TRK-002">TRK-002 - Peterbilt</SelectItem>
                      <SelectItem value="TRK-003">TRK-003 - Kenworth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Plan Route</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Route Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Route className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{routes.filter((r) => r.status === "active").length}</div>
            <p className="text-xs text-gray-600">Currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <Navigation className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {routes.reduce((acc, r) => acc + r.distance, 0).toLocaleString()} mi
            </div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
            <Fuel className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${routes.reduce((acc, r) => acc + r.fuelCost, 0)}</div>
            <p className="text-xs text-gray-600">Estimated total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-gray-600">Route optimization</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Routes</TabsTrigger>
          {user.role === "dispatcher" && <TabsTrigger value="optimization">Route Optimization</TabsTrigger>}
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{user.role === "dispatcher" ? "All Routes" : "My Routes"}</CardTitle>
              <CardDescription>
                {user.role === "dispatcher"
                  ? "Monitor all active and planned routes"
                  : "Your assigned routes and progress"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredRoutes.map((route) => (
                  <div key={route.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{route.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {route.origin} → {route.destination}
                          </div>
                          <div className="flex items-center">
                            <Navigation className="h-3 w-3 mr-1" />
                            {route.distance} mi
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {route.estimatedTime}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(route.status)}>{route.status.toUpperCase()}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Driver</div>
                        <div className="font-semibold">{route.driver}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Truck</div>
                        <div className="font-semibold">{route.truck}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Fuel Cost</div>
                        <div className="font-semibold">${route.fuelCost}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Progress</div>
                        <div className="font-semibold">{route.progress}%</div>
                      </div>
                    </div>

                    {route.status === "active" && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${route.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === "dispatcher" && (
          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Route Optimization</CardTitle>
                <CardDescription>Optimized route suggestions for maximum efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizedRoutes.map((route) => (
                    <div
                      key={route.id}
                      className={`p-4 border rounded-lg ${route.recommended ? "border-green-200 bg-green-50" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{route.route}</h3>
                          {route.recommended && <Badge className="bg-green-100 text-green-800 mt-1">RECOMMENDED</Badge>}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{route.efficiency}%</div>
                          <div className="text-sm text-gray-600">Efficiency</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-2 bg-white rounded border">
                          <div className="text-sm text-gray-600">Total Distance</div>
                          <div className="font-semibold">{route.totalDistance} mi</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded border">
                          <div className="text-sm text-gray-600">Estimated Time</div>
                          <div className="font-semibold">{route.estimatedTime}</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded border">
                          <div className="text-sm text-gray-600">Fuel Savings</div>
                          <div className="font-semibold text-green-600">${route.fuelSavings}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button variant={route.recommended ? "default" : "outline"}>
                          {route.recommended ? "Use This Route" : "Select Route"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
