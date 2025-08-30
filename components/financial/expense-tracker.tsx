"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Search, Plus, Receipt, Fuel, Wrench, Shield, DollarSign } from "lucide-react"

interface Expense {
  id: string
  description: string
  category: "fuel" | "maintenance" | "insurance" | "permits" | "tolls" | "other"
  amount: number
  date: string
  truckNumber?: string
  vendor: string
  receiptUrl?: string
  status: "pending" | "approved" | "rejected"
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Fuel - Dallas to LA route",
    category: "fuel",
    amount: 485,
    date: "2024-01-15",
    truckNumber: "TRK-001",
    vendor: "Shell",
    status: "approved",
  },
  {
    id: "2",
    description: "Brake system repair",
    category: "maintenance",
    amount: 1200,
    date: "2024-01-20",
    truckNumber: "TRK-002",
    vendor: "Mike's Truck Repair",
    status: "approved",
  },
  {
    id: "3",
    description: "Commercial insurance premium",
    category: "insurance",
    amount: 2400,
    date: "2024-01-01",
    vendor: "TruckGuard Insurance",
    status: "approved",
  },
  {
    id: "4",
    description: "Highway tolls - I-35 corridor",
    category: "tolls",
    amount: 45,
    date: "2024-01-18",
    truckNumber: "TRK-003",
    vendor: "TxTag",
    status: "pending",
  },
]

export function ExpenseTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [expenses, setExpenses] = useState(mockExpenses)
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
    truckNumber: "",
    vendor: "",
    notes: "",
  })

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (expense.truckNumber && expense.truckNumber.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fuel":
        return <Fuel className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "insurance":
        return <Shield className="h-4 w-4" />
      case "tolls":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Receipt className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fuel":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-red-100 text-red-800"
      case "insurance":
        return "bg-green-100 text-green-800"
      case "tolls":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const pendingExpenses = expenses
    .filter((e) => e.status === "pending")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const expensesByCategory = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      category: newExpense.category as any,
      amount: Number.parseFloat(newExpense.amount),
      date: newExpense.date,
      truckNumber: newExpense.truckNumber || undefined,
      vendor: newExpense.vendor,
      status: "pending",
    }
    setExpenses([expense, ...expenses])
    setNewExpense({
      description: "",
      category: "",
      amount: "",
      date: "",
      truckNumber: "",
      vendor: "",
      notes: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Expense Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Costs</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(expensesByCategory.fuel || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Largest category</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {expenses.filter((e) => e.status === "pending").length} expenses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Mile</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.85</div>
            <p className="text-xs text-muted-foreground">Operating cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Expense Tracking</CardTitle>
              <CardDescription>Track and categorize all business expenses</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>Record a new business expense for tracking and tax purposes.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddExpense}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        placeholder="Fuel purchase at Shell station"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newExpense.category}
                          onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fuel">Fuel</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="permits">Permits</SelectItem>
                            <SelectItem value="tolls">Tolls</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newExpense.date}
                          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="truckNumber">Truck (Optional)</Label>
                        <Input
                          id="truckNumber"
                          value={newExpense.truckNumber}
                          onChange={(e) => setNewExpense({ ...newExpense, truckNumber: e.target.value })}
                          placeholder="TRK-001"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor">Vendor</Label>
                      <Input
                        id="vendor"
                        value={newExpense.vendor}
                        onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                        placeholder="Shell, Mike's Repair, etc."
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Expense</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fuel">Fuel</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="permits">Permits</SelectItem>
                <SelectItem value="tolls">Tolls</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <Card key={expense.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getCategoryColor(expense.category)}`}>
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{expense.description}</h3>
                        <p className="text-sm text-gray-600">{expense.vendor}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{expense.date}</span>
                          {expense.truckNumber && (
                            <>
                              <span>•</span>
                              <span>{expense.truckNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold">${expense.amount.toLocaleString()}</div>
                        <Badge variant={getStatusColor(expense.status)}>{expense.status}</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
