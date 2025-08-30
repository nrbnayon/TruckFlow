"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Phone, Mail, MapPin } from "lucide-react"

interface Driver {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  status: "available" | "driving" | "off_duty"
  currentLocation?: string
  truckAssigned?: string
}

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@trucking.com",
    phone: "(555) 123-4567",
    licenseNumber: "CDL-123456",
    status: "driving",
    currentLocation: "Dallas, TX",
    truckAssigned: "TRK-001",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@trucking.com",
    phone: "(555) 234-5678",
    licenseNumber: "CDL-234567",
    status: "driving",
    currentLocation: "Phoenix, AZ",
    truckAssigned: "TRK-003",
  },
  {
    id: "3",
    name: "Sarah Wilson",
    email: "sarah.wilson@trucking.com",
    phone: "(555) 345-6789",
    licenseNumber: "CDL-345678",
    status: "available",
    currentLocation: "Houston, TX",
  },
  {
    id: "4",
    name: "Tom Davis",
    email: "tom.davis@trucking.com",
    phone: "(555) 456-7890",
    licenseNumber: "CDL-456789",
    status: "off_duty",
    currentLocation: "Denver, CO",
  },
]

export function DriverManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDrivers = mockDrivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "driving":
        return "default"
      case "off_duty":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Driver Management</CardTitle>
            <CardDescription>Manage driver assignments and status</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{driver.name}</h3>
                      <Badge variant={getStatusColor(driver.status)}>{driver.status.replace("_", " ")}</Badge>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{driver.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{driver.currentLocation}</span>
                      </div>
                      {driver.truckAssigned && (
                        <div className="text-sm">
                          <span className="font-medium">Assigned: </span>
                          <span className="text-blue-600">{driver.truckAssigned}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
