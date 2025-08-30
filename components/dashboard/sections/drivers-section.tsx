"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { UserPlus, Search, MapPin, Clock, Phone, Mail, Truck } from "lucide-react"
import type { User } from "@/hooks/use-auth"

interface DriversSectionProps {
  user: User
}

const drivers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@truckflow.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    currentLocation: "Denver, CO",
    assignedTruck: "TRK-001",
    hoursRemaining: 8.5,
    lastUpdate: "2 mins ago",
    efficiency: 92,
    safetyScore: 98,
  },
  {
    id: 2,
    name: "Mike Wilson",
    email: "mike.wilson@truckflow.com",
    phone: "+1 (555) 234-5678",
    status: "driving",
    currentLocation: "Phoenix, AZ",
    assignedTruck: "TRK-003",
    hoursRemaining: 6.2,
    lastUpdate: "5 mins ago",
    efficiency: 88,
    safetyScore: 94,
  },
  {
    id: 3,
    name: "Sarah Davis",
    email: "sarah.davis@truckflow.com",
    phone: "+1 (555) 345-6789",
    status: "off-duty",
    currentLocation: "Las Vegas, NV",
    assignedTruck: "TRK-005",
    hoursRemaining: 11.0,
    lastUpdate: "1 hour ago",
    efficiency: 95,
    safetyScore: 99,
  },
  {
    id: 4,
    name: "Tom Johnson",
    email: "tom.johnson@truckflow.com",
    phone: "+1 (555) 456-7890",
    status: "sleeper",
    currentLocation: "Albuquerque, NM",
    assignedTruck: "TRK-002",
    hoursRemaining: 10.0,
    lastUpdate: "3 hours ago",
    efficiency: 85,
    safetyScore: 92,
  },
]

export function DriversSection({ user }: DriversSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "driving":
        return "bg-blue-100 text-blue-800"
      case "off-duty":
        return "bg-gray-100 text-gray-800"
      case "sleeper":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHoursColor = (hours: number) => {
    if (hours <= 2) return "text-red-600"
    if (hours <= 4) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === "fleet_manager" ? "Driver Management" : "Driver Status"}
          </h1>
          <p className="text-gray-600">
            {user.role === "fleet_manager"
              ? "Manage drivers and monitor performance"
              : "Monitor driver status and availability"}
          </p>
        </div>
        {user.role === "fleet_manager" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>Add a new driver to your fleet</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver-name" className="text-right">
                    Name
                  </Label>
                  <Input id="driver-name" placeholder="Full name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver-email" className="text-right">
                    Email
                  </Label>
                  <Input id="driver-email" type="email" placeholder="email@company.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver-phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="driver-phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="license" className="text-right">
                    CDL License
                  </Label>
                  <Input id="license" placeholder="License number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Driver</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Driver Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {drivers.filter((d) => d.status === "active" || d.status === "driving").length}
            </div>
            <p className="text-xs text-gray-600">Currently on duty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Off Duty</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers.filter((d) => d.status === "off-duty").length}</div>
            <p className="text-xs text-gray-600">Not currently driving</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Sleeper</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {drivers.filter((d) => d.status === "sleeper").length}
            </div>
            <p className="text-xs text-gray-600">Taking mandatory rest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Safety Score</CardTitle>
            <Badge className="h-4 w-4 bg-green-100 text-green-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(drivers.reduce((acc, d) => acc + d.safetyScore, 0) / drivers.length)}%
            </div>
            <p className="text-xs text-gray-600">Fleet average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList>
          <TabsTrigger value="status">Driver Status</TabsTrigger>
          {user.role === "fleet_manager" && <TabsTrigger value="performance">Performance</TabsTrigger>}
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Driver Status</CardTitle>
              <CardDescription>Real-time driver status and location information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search drivers..."
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
                    <SelectItem value="driving">Driving</SelectItem>
                    <SelectItem value="off-duty">Off Duty</SelectItem>
                    <SelectItem value="sleeper">Sleeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${driver.name}`} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{driver.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {driver.currentLocation}
                          </div>
                          <div className="flex items-center">
                            <Truck className="h-3 w-3 mr-1" />
                            {driver.assignedTruck}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Last update: {driver.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`font-semibold ${getHoursColor(driver.hoursRemaining)}`}>
                          {driver.hoursRemaining}h remaining
                        </div>
                        <div className="text-xs text-gray-500">Drive time</div>
                      </div>
                      <Badge className={getStatusColor(driver.status)}>
                        {driver.status.replace("-", " ").toUpperCase()}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === "fleet_manager" && (
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Driver Performance</CardTitle>
                <CardDescription>Performance metrics and safety scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${driver.name}`} />
                          <AvatarFallback>
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{driver.name}</h3>
                          <p className="text-sm text-gray-600">{driver.assignedTruck}</p>
                        </div>
                      </div>
                      <div className="flex space-x-8">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Efficiency</div>
                          <div className="font-semibold text-lg">{driver.efficiency}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Safety Score</div>
                          <div className="font-semibold text-lg">{driver.safetyScore}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Status</div>
                          <Badge className={getStatusColor(driver.status)}>
                            {driver.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
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
