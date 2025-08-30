"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockTrucks } from "@/lib/mock-data"
import { Truck, MapPin, Clock, DollarSign, Star } from "lucide-react"

interface LoadAssignmentProps {
  loadId: string
  loadNumber: string
  origin: string
  destination: string
  revenue: number
  onAssign: (truckId: string, driverId: string) => void
}

const mockDrivers = [
  {
    id: "1",
    name: "John Smith",
    rating: 4.8,
    experience: "5 years",
    currentLocation: "Dallas, TX",
    status: "available",
    hoursRemaining: 8.5,
  },
  {
    id: "2",
    name: "Mike Johnson",
    rating: 4.9,
    experience: "8 years",
    currentLocation: "Houston, TX",
    status: "available",
    hoursRemaining: 10,
  },
  {
    id: "3",
    name: "Sarah Wilson",
    rating: 4.7,
    experience: "3 years",
    currentLocation: "Austin, TX",
    status: "available",
    hoursRemaining: 9.5,
  },
]

export function LoadAssignment({ loadId, loadNumber, origin, destination, revenue, onAssign }: LoadAssignmentProps) {
  const [selectedTruck, setSelectedTruck] = useState("")
  const [selectedDriver, setSelectedDriver] = useState("")

  const availableTrucks = mockTrucks.filter((truck) => truck.status === "active" || truck.status === "idle")
  const availableDrivers = mockDrivers.filter((driver) => driver.status === "available")

  const handleAssign = () => {
    if (selectedTruck && selectedDriver) {
      onAssign(selectedTruck, selectedDriver)
    }
  }

  const getCompatibilityScore = (driver: any, truck: any) => {
    // Mock compatibility calculation based on location, experience, etc.
    const locationScore = driver.currentLocation.includes("TX") ? 0.4 : 0.2
    const experienceScore = Number.parseInt(driver.experience) > 5 ? 0.3 : 0.2
    const ratingScore = driver.rating > 4.5 ? 0.3 : 0.2
    return Math.round((locationScore + experienceScore + ratingScore) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Assignment</CardTitle>
        <CardDescription>
          Assign {loadNumber} ({origin} → {destination}) to available truck and driver
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Load Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{loadNumber}</h3>
              <p className="text-sm text-gray-600">
                {origin} → {destination}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-semibold">${revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Truck Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold">Select Truck</h4>
          <Select value={selectedTruck} onValueChange={setSelectedTruck}>
            <SelectTrigger>
              <SelectValue placeholder="Choose available truck" />
            </SelectTrigger>
            <SelectContent>
              {availableTrucks.map((truck) => (
                <SelectItem key={truck.id} value={truck.id}>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>
                      {truck.number} - {truck.make} {truck.model}
                    </span>
                    <Badge variant={truck.status === "active" ? "default" : "secondary"}>{truck.status}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Driver Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold">Select Driver</h4>
          <div className="grid gap-3">
            {availableDrivers.map((driver) => {
              const selectedTruckData = availableTrucks.find((t) => t.id === selectedTruck)
              const compatibility = selectedTruckData ? getCompatibilityScore(driver, selectedTruckData) : 0

              return (
                <Card
                  key={driver.id}
                  className={`cursor-pointer transition-all ${
                    selectedDriver === driver.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedDriver(driver.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-semibold">{driver.name}</h5>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{driver.rating}</span>
                            </div>
                            <span>{driver.experience}</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{driver.currentLocation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {selectedTruck && (
                          <div className="mb-1">
                            <Badge variant="outline">Match: {compatibility}%</Badge>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span>{driver.hoursRemaining}h available</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Assignment Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            {selectedTruck && selectedDriver ? "Ready to assign load" : "Select truck and driver to continue"}
          </div>
          <Button onClick={handleAssign} disabled={!selectedTruck || !selectedDriver}>
            Assign Load
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
