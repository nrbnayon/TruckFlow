"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Send, TrendingUp, Route, DollarSign, Truck, AlertTriangle, CheckCircle } from "lucide-react"

interface Recommendation {
  id: string
  type: "load" | "route" | "financial" | "maintenance" | "driver"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  impact: string
  action?: string
  data?: any
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "load",
    priority: "high",
    title: "High-Profit Load Available",
    description: "Load from Chicago to Dallas offers 15% higher profit margin than average",
    impact: "+$2,400 potential revenue",
    action: "Assign to Truck #1247",
    data: { loadId: "L-2024-045", rate: "$3,200", miles: 925 },
  },
  {
    id: "2",
    type: "route",
    priority: "medium",
    title: "Route Optimization Opportunity",
    description: "Alternative route saves 45 minutes and reduces fuel consumption by 8%",
    impact: "Save $85 in fuel costs",
    action: "Update route for Load L-2024-043",
  },
  {
    id: "3",
    type: "financial",
    priority: "high",
    title: "Cash Flow Alert",
    description: "Projected cash shortfall in 2 weeks based on current receivables",
    impact: "Potential $15,000 shortfall",
    action: "Accelerate collections on overdue invoices",
  },
  {
    id: "4",
    type: "maintenance",
    priority: "medium",
    title: "Preventive Maintenance Due",
    description: "Truck #1247 approaching maintenance interval - schedule to avoid downtime",
    impact: "Prevent potential $3,500 breakdown",
    action: "Schedule maintenance for next week",
  },
]

export function AIAssistant() {
  const [recommendations] = useState(mockRecommendations)
  const [query, setQuery] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      message:
        "Hello! I'm your AI assistant. I can help you optimize loads, routes, and operations. What would you like to know?",
    },
  ])

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "load":
        return <DollarSign className="h-4 w-4" />
      case "route":
        return <Route className="h-4 w-4" />
      case "financial":
        return <TrendingUp className="h-4 w-4" />
      case "maintenance":
        return <Truck className="h-4 w-4" />
      case "driver":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const handleSendMessage = () => {
    if (!query.trim()) return

    setChatMessages((prev) => [...prev, { type: "user", message: query }])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current fleet utilization, I recommend focusing on the Chicago-Dallas corridor for maximum profitability.",
        "Your fuel costs are 12% above industry average. Consider route optimization and driver training programs.",
        "Load L-2024-045 has the highest profit potential this week. Assign your most efficient driver for best results.",
        "Weather conditions suggest delaying the Denver route by 2 hours to avoid potential delays and safety issues.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages((prev) => [...prev, { type: "ai", message: randomResponse }])
    }, 1000)

    setQuery("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recommendations Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(rec.type)}
                    <h3 className="font-medium">{rec.title}</h3>
                  </div>
                  <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{rec.impact}</span>
                  {rec.action && (
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {rec.action}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Ask AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-lg">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.type === "user" ? "bg-blue-600 text-white" : "bg-white border"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about loads, routes, or operations..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={!query.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuery("What are the most profitable loads this week?")}
              >
                Profitable Loads
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuery("Optimize routes for fuel efficiency")}>
                Route Optimization
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuery("Analyze driver performance")}>
                Driver Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
