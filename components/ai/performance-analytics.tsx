"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, User, Truck, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const driverPerformanceData = [
  { name: "John Smith", efficiency: 92, safety: 88, onTime: 95, fuelEconomy: 7.2 },
  { name: "Sarah Johnson", efficiency: 89, safety: 94, onTime: 91, fuelEconomy: 7.8 },
  { name: "Mike Davis", efficiency: 85, safety: 82, onTime: 88, fuelEconomy: 6.9 },
  { name: "Lisa Wilson", efficiency: 91, safety: 90, onTime: 93, fuelEconomy: 7.5 },
]

const fleetEfficiencyData = [
  { month: "Jan", efficiency: 85, utilization: 78, maintenance: 92 },
  { month: "Feb", efficiency: 87, utilization: 82, maintenance: 89 },
  { month: "Mar", efficiency: 89, utilization: 85, maintenance: 91 },
  { month: "Apr", efficiency: 91, utilization: 88, maintenance: 88 },
  { month: "May", efficiency: 88, utilization: 84, maintenance: 93 },
  { month: "Jun", efficiency: 92, utilization: 89, maintenance: 90 },
]

const aiInsights = [
  {
    type: "driver",
    priority: "high",
    title: "Driver Training Opportunity",
    description: "Mike Davis shows 15% higher fuel consumption than fleet average",
    recommendation: "Enroll in fuel-efficient driving course",
    impact: "Potential $2,400/year savings",
  },
  {
    type: "fleet",
    priority: "medium",
    title: "Route Optimization",
    description: "Chicago-Detroit route shows consistent delays during peak hours",
    recommendation: "Adjust departure times by 2 hours",
    impact: "12% improvement in on-time delivery",
  },
  {
    type: "maintenance",
    priority: "high",
    title: "Predictive Maintenance Alert",
    description: "Truck #1247 showing early signs of brake wear based on telematics",
    recommendation: "Schedule brake inspection within 7 days",
    impact: "Prevent potential $3,500 breakdown",
  },
]

export function PerformanceAnalytics() {
  const [selectedDriver, setSelectedDriver] = useState(driverPerformanceData[0])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 80) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Driver Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {driverPerformanceData.map((driver) => (
                    <div
                      key={driver.name}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedDriver.name === driver.name ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedDriver(driver)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{driver.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getScoreBg(driver.efficiency)} ${getScoreColor(driver.efficiency)}`}>
                            {driver.efficiency}% Overall
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Safety: </span>
                          <span className={getScoreColor(driver.safety)}>{driver.safety}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">On-Time: </span>
                          <span className={getScoreColor(driver.onTime)}>{driver.onTime}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">MPG: </span>
                          <span>{driver.fuelEconomy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis: {selectedDriver.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Efficiency</span>
                      <span className={`font-medium ${getScoreColor(selectedDriver.efficiency)}`}>
                        {selectedDriver.efficiency}%
                      </span>
                    </div>
                    <Progress value={selectedDriver.efficiency} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Safety Score</span>
                      <span className={`font-medium ${getScoreColor(selectedDriver.safety)}`}>
                        {selectedDriver.safety}%
                      </span>
                    </div>
                    <Progress value={selectedDriver.safety} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">On-Time Delivery</span>
                      <span className={`font-medium ${getScoreColor(selectedDriver.onTime)}`}>
                        {selectedDriver.onTime}%
                      </span>
                    </div>
                    <Progress value={selectedDriver.onTime} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Fuel Economy:</span>
                        <span className="ml-2 font-medium">{selectedDriver.fuelEconomy} MPG</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Miles This Month:</span>
                        <span className="ml-2 font-medium">8,450</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Loads Completed:</span>
                        <span className="ml-2 font-medium">24</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Revenue Generated:</span>
                        <span className="ml-2 font-medium">$48,200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Fleet Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fleetEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" name="Efficiency %" />
                    <Line type="monotone" dataKey="utilization" stroke="#10b981" name="Utilization %" />
                    <Line type="monotone" dataKey="maintenance" stroke="#f59e0b" name="Maintenance Score %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Fleet Efficiency</span>
                </div>
                <div className="text-2xl font-bold text-green-600">92%</div>
                <p className="text-xs text-gray-600">+3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Average Utilization</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <p className="text-xs text-gray-600">+1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium">Maintenance Score</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">90%</div>
                <p className="text-xs text-gray-600">-2% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                AI-Powered Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {insight.type === "driver" && <User className="h-4 w-4" />}
                        {insight.type === "fleet" && <Truck className="h-4 w-4" />}
                        {insight.type === "maintenance" && <AlertTriangle className="h-4 w-4" />}
                        <h3 className="font-medium">{insight.title}</h3>
                      </div>
                      <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg mb-2">
                      <p className="text-sm font-medium text-blue-900">Recommendation:</p>
                      <p className="text-sm text-blue-800">{insight.recommendation}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">{insight.impact}</span>
                      <button className="text-sm text-blue-600 hover:underline">View Details →</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
