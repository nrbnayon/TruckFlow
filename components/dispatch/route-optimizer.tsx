"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation, MapPin, Clock, Fuel, DollarSign, Zap } from "lucide-react"

interface RouteOption {
  id: string
  name: string
  distance: number
  duration: string
  fuelCost: number
  tollCost: number
  efficiency: number
  weatherRisk: "low" | "medium" | "high"
  trafficRisk: "low" | "medium" | "high"
}

const mockRouteOptions: RouteOption[] = [
  {
    id: "1",
    name: "Interstate Route (I-20 → I-10)",
    distance: 1435,
    duration: "20h 15m",
    fuelCost: 485,
    tollCost: 45,
    efficiency: 92,
    weatherRisk: "low",
    trafficRisk: "medium",
  },
  {
    id: "2",
    name: "Scenic Route (US-287 → US-380)",
    distance: 1520,
    duration: "22h 30m",
    fuelCost: 515,
    tollCost: 0,
    efficiency: 78,
    weatherRisk: "medium",
    trafficRisk: "low",
  },
  {
    id: "3",
    name: "Express Route (I-35 → I-40)",
    distance: 1398,
    duration: "19h 45m",
    fuelCost: 475,
    tollCost: 85,
    efficiency: 95,
    weatherRisk: "low",
    trafficRisk: "high",
  },
]

interface RouteOptimizerProps {
  origin: string
  destination: string
}

export function RouteOptimizer({ origin, destination }: RouteOptimizerProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const bestRoute = mockRouteOptions.reduce((best, current) => (current.efficiency > best.efficiency ? current : best))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Route Optimization
            </CardTitle>
            <CardDescription>
              AI-optimized routes from {origin} to {destination}
            </CardDescription>
          </div>
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            View Map
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRouteOptions.map((route) => (
            <Card
              key={route.id}
              className={`hover:shadow-md transition-shadow ${route.id === bestRoute.id ? "ring-2 ring-blue-500" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{route.name}</h3>
                    {route.id === bestRoute.id && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Zap className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Efficiency: {route.efficiency}%</span>
                    <Progress value={route.efficiency} className="w-16" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{route.distance} miles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <span>${route.fuelCost}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>Tolls: ${route.tollCost}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Weather:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(route.weatherRisk)}`}>
                        {route.weatherRisk}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Traffic:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(route.trafficRisk)}`}>
                        {route.trafficRisk}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Select Route
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">AI Recommendations</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Best fuel efficiency: Express Route saves $10 in fuel costs</li>
            <li>• Weather alert: Light rain expected on Day 2 for Scenic Route</li>
            <li>• Traffic optimization: Avoid I-35 during rush hours (7-9 AM, 5-7 PM)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
