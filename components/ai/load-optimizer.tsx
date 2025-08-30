"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, MapPin, Clock, DollarSign, Fuel, Star } from "lucide-react"

interface OptimizedLoad {
  id: string
  origin: string
  destination: string
  rate: number
  miles: number
  profitScore: number
  estimatedProfit: number
  fuelCost: number
  transitTime: string
  commodity: string
  weight: string
  reasons: string[]
}

const mockOptimizedLoads: OptimizedLoad[] = [
  {
    id: "L-2024-045",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    rate: 3200,
    miles: 925,
    profitScore: 92,
    estimatedProfit: 2400,
    fuelCost: 800,
    transitTime: "18 hours",
    commodity: "Electronics",
    weight: "42,000 lbs",
    reasons: ["High rate per mile", "Backhaul available", "Preferred customer"],
  },
  {
    id: "L-2024-046",
    origin: "Atlanta, GA",
    destination: "Miami, FL",
    rate: 1800,
    miles: 650,
    profitScore: 88,
    estimatedProfit: 1350,
    fuelCost: 450,
    transitTime: "12 hours",
    commodity: "Food Products",
    weight: "38,500 lbs",
    reasons: ["Short haul efficiency", "Low fuel cost", "Quick turnaround"],
  },
  {
    id: "L-2024-047",
    origin: "Phoenix, AZ",
    destination: "Los Angeles, CA",
    rate: 1200,
    miles: 370,
    profitScore: 85,
    estimatedProfit: 850,
    fuelCost: 350,
    transitTime: "8 hours",
    commodity: "Retail Goods",
    weight: "35,000 lbs",
    reasons: ["High density route", "Minimal deadhead", "Same-day delivery premium"],
  },
]

export function LoadOptimizer() {
  const [loads] = useState(mockOptimizedLoads)
  const [selectedLoad, setSelectedLoad] = useState<OptimizedLoad | null>(null)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI Load Optimization
          </CardTitle>
          <p className="text-sm text-gray-600">Loads ranked by profitability, efficiency, and strategic value</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loads.map((load, index) => (
              <div
                key={load.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedLoad?.id === load.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedLoad(load)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                    <h3 className="font-medium">{load.id}</h3>
                    <Badge className={getScoreBadgeColor(load.profitScore)}>{load.profitScore}% Score</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${load.estimatedProfit.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Est. Profit</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{load.origin}</p>
                      <p className="text-xs text-gray-500">to {load.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">${load.rate.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">${(load.rate / load.miles).toFixed(2)}/mi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">${load.fuelCost}</p>
                      <p className="text-xs text-gray-500">Fuel cost</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{load.transitTime}</p>
                      <p className="text-xs text-gray-500">{load.miles} miles</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Profit Score</span>
                    <span className={`text-sm font-medium ${getScoreColor(load.profitScore)}`}>
                      {load.profitScore}%
                    </span>
                  </div>
                  <Progress value={load.profitScore} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {load.reasons.map((reason, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {reason}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedLoad && (
        <Card>
          <CardHeader>
            <CardTitle>Load Details: {selectedLoad.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Route Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span>{selectedLoad.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destination:</span>
                      <span>{selectedLoad.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span>{selectedLoad.miles} miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transit Time:</span>
                      <span>{selectedLoad.transitTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cargo Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commodity:</span>
                      <span>{selectedLoad.commodity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span>{selectedLoad.weight}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Financial Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Rate:</span>
                      <span className="font-medium">${selectedLoad.rate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel Cost:</span>
                      <span className="text-red-600">-${selectedLoad.fuelCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Other Expenses:</span>
                      <span className="text-red-600">-$200</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium">
                      <span>Estimated Profit:</span>
                      <span className="text-green-600">${selectedLoad.estimatedProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit Margin:</span>
                      <span>{((selectedLoad.estimatedProfit / selectedLoad.rate) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Assign Load to Truck</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
