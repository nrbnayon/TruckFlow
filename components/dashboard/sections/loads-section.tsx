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
import { Textarea } from "@/components/ui/textarea"
import { MapPin, DollarSign, Weight, Clock, Plus, Search, Truck, Calendar } from "lucide-react"
import type { User } from "@/hooks/use-auth"

interface LoadsSectionProps {
  user: User
}

const loads = [
  {
    id: 1,
    loadNumber: "LD-2024-001",
    origin: "Denver, CO",
    destination: "Phoenix, AZ",
    pickupDate: "2024-01-20",
    deliveryDate: "2024-01-21",
    weight: 45000,
    rate: 2400,
    mileage: 602,
    ratePerMile: 3.99,
    status: "assigned",
    driver: "John Smith",
    truck: "TRK-001",
    broker: "FreightCorp",
    commodity: "Electronics",
  },
  {
    id: 2,
    loadNumber: "LD-2024-002",
    origin: "Las Vegas, NV",
    destination: "Albuquerque, NM",
    pickupDate: "2024-01-22",
    deliveryDate: "2024-01-23",
    weight: 38000,
    rate: 1800,
    mileage: 345,
    ratePerMile: 5.22,
    status: "available",
    driver: null,
    truck: null,
    broker: "LogiTrans",
    commodity: "Food Products",
  },
  {
    id: 3,
    loadNumber: "LD-2024-003",
    origin: "Phoenix, AZ",
    destination: "Denver, CO",
    pickupDate: "2024-01-18",
    deliveryDate: "2024-01-19",
    weight: 42000,
    rate: 2200,
    mileage: 602,
    ratePerMile: 3.66,
    status: "completed",
    driver: "Mike Wilson",
    truck: "TRK-003",
    broker: "TransLogic",
    commodity: "Machinery",
  },
]

const availableLoads = [
  {
    id: 4,
    loadNumber: "LD-2024-004",
    origin: "Salt Lake City, UT",
    destination: "Denver, CO",
    pickupDate: "2024-01-25",
    deliveryDate: "2024-01-26",
    weight: 40000,
    rate: 1950,
    mileage: 525,
    ratePerMile: 3.71,
    broker: "MegaFreight",
    commodity: "Construction Materials",
    profitability: 85,
  },
  {
    id: 5,
    loadNumber: "LD-2024-005",
    origin: "Phoenix, AZ",
    destination: "Las Vegas, NV",
    pickupDate: "2024-01-24",
    deliveryDate: "2024-01-25",
    weight: 35000,
    rate: 1400,
    mileage: 295,
    ratePerMile: 4.75,
    broker: "SwiftTrans",
    commodity: "Retail Goods",
    profitability: 92,
  },
]

export function LoadsSection({ user }: LoadsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLoads = loads.filter((load) => {
    const matchesSearch =
      load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || load.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800"
      case "available":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProfitabilityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === "dispatcher" ? "Load Management" : "My Loads"}
          </h1>
          <p className="text-gray-600">
            {user.role === "dispatcher"
              ? "Manage and assign loads to drivers"
              : "View your assigned loads and delivery status"}
          </p>
        </div>
        {user.role === "dispatcher" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Load
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Load</DialogTitle>
                <DialogDescription>Create a new load for assignment</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input id="origin" placeholder="Pickup location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input id="destination" placeholder="Delivery location" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup-date">Pickup Date</Label>
                    <Input id="pickup-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-date">Delivery Date</Label>
                    <Input id="delivery-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input id="weight" type="number" placeholder="45000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Rate ($)</Label>
                    <Input id="rate" type="number" placeholder="2400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input id="mileage" type="number" placeholder="602" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="broker">Broker</Label>
                    <Input id="broker" placeholder="Broker name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commodity">Commodity</Label>
                    <Input id="commodity" placeholder="Type of goods" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional load details..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Load</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Load Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {loads.filter((l) => l.status === "assigned" || l.status === "in-transit").length}
            </div>
            <p className="text-xs text-gray-600">Currently assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${loads.reduce((acc, l) => acc + l.rate, 0).toLocaleString()}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate/Mile</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(loads.reduce((acc, l) => acc + l.ratePerMile, 0) / loads.length).toFixed(2)}
            </div>
            <p className="text-xs text-gray-600">Fleet average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((loads.filter((l) => l.status === "completed").length / loads.length) * 100)}%
            </div>
            <p className="text-xs text-gray-600">On-time delivery</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">{user.role === "dispatcher" ? "All Loads" : "My Loads"}</TabsTrigger>
          {user.role === "dispatcher" && <TabsTrigger value="available">Available Loads</TabsTrigger>}
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{user.role === "dispatcher" ? "Load Management" : "Assigned Loads"}</CardTitle>
              <CardDescription>
                {user.role === "dispatcher"
                  ? "Monitor all loads and their assignment status"
                  : "Your current and upcoming load assignments"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search loads..."
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
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredLoads.map((load) => (
                  <div key={load.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{load.loadNumber}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {load.origin} → {load.destination}
                          </div>
                          <div className="flex items-center">
                            <Weight className="h-3 w-3 mr-1" />
                            {load.weight.toLocaleString()} lbs
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {load.pickupDate} - {load.deliveryDate}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(load.status)}>
                        {load.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Rate</div>
                        <div className="font-semibold">${load.rate.toLocaleString()}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Rate/Mile</div>
                        <div className="font-semibold">${load.ratePerMile}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Driver</div>
                        <div className="font-semibold">{load.driver || "Unassigned"}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Truck</div>
                        <div className="font-semibold">{load.truck || "Unassigned"}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">Broker</div>
                        <div className="font-semibold">{load.broker}</div>
                      </div>
                    </div>

                    {user.role === "dispatcher" && load.status === "available" && (
                      <div className="flex justify-end">
                        <Button size="sm">Assign Load</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === "dispatcher" && (
          <TabsContent value="available" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Loads</CardTitle>
                <CardDescription>Unassigned loads available for pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableLoads.map((load) => (
                    <div key={load.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{load.loadNumber}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {load.origin} → {load.destination}
                            </div>
                            <div className="flex items-center">
                              <Weight className="h-3 w-3 mr-1" />
                              {load.weight.toLocaleString()} lbs
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {load.pickupDate} - {load.deliveryDate}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getProfitabilityColor(load.profitability)}`}>
                            {load.profitability}%
                          </div>
                          <div className="text-sm text-gray-600">Profitability</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Rate</div>
                          <div className="font-semibold">${load.rate.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Rate/Mile</div>
                          <div className="font-semibold">${load.ratePerMile}</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Mileage</div>
                          <div className="font-semibold">{load.mileage} mi</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Broker</div>
                          <div className="font-semibold">{load.broker}</div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Assign This Load</Button>
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
