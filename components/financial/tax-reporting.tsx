"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Calculator, DollarSign, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const quarterlyData = [
  { quarter: "Q1 2024", revenue: 125000, expenses: 89000, taxable: 36000, estimated: 7200 },
  { quarter: "Q2 2024", revenue: 142000, expenses: 98000, taxable: 44000, estimated: 8800 },
  { quarter: "Q3 2024", revenue: 138000, expenses: 95000, taxable: 43000, estimated: 8600 },
  { quarter: "Q4 2024", revenue: 155000, expenses: 105000, taxable: 50000, estimated: 10000 },
]

const deductionCategories = [
  { name: "Fuel", amount: 35000, color: "#3b82f6" },
  { name: "Maintenance", amount: 18000, color: "#ef4444" },
  { name: "Insurance", amount: 12000, color: "#10b981" },
  { name: "Depreciation", amount: 15000, color: "#f59e0b" },
  { name: "Other", amount: 9000, color: "#8b5cf6" },
]

const taxForms = [
  {
    form: "Form 1120",
    description: "U.S. Corporation Income Tax Return",
    dueDate: "2024-03-15",
    status: "pending",
    estimatedTax: 34600,
  },
  {
    form: "Form 941",
    description: "Quarterly Federal Tax Return",
    dueDate: "2024-01-31",
    status: "filed",
    estimatedTax: 8600,
  },
  {
    form: "Form 2290",
    description: "Heavy Highway Vehicle Use Tax",
    dueDate: "2024-08-31",
    status: "filed",
    estimatedTax: 550,
  },
]

export function TaxReporting() {
  const currentYear = new Date().getFullYear()
  const totalRevenue = quarterlyData.reduce((sum, q) => sum + q.revenue, 0)
  const totalExpenses = quarterlyData.reduce((sum, q) => sum + q.expenses, 0)
  const totalTaxable = quarterlyData.reduce((sum, q) => sum + q.taxable, 0)
  const totalEstimated = quarterlyData.reduce((sum, q) => sum + q.estimated, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed":
        return "default"
      case "pending":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Tax Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{currentYear} YTD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deductions</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Tax deductible</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxable Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTaxable.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">After deductions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Tax</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEstimated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">20% effective rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quarterly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quarterly">Quarterly Reports</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="forms">Tax Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="quarterly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Tax Summary</CardTitle>
              <CardDescription>Revenue, expenses, and estimated tax liability by quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar dataKey="estimated" fill="#10b981" name="Estimated Tax" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {quarterlyData.map((quarter) => (
              <Card key={quarter.quarter}>
                <CardHeader>
                  <CardTitle className="text-lg">{quarter.quarter}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-semibold">${quarter.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expenses:</span>
                    <span className="font-semibold">${quarter.expenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span className="font-semibold">${quarter.taxable.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Estimated Tax:</span>
                    <span className="font-semibold text-green-600">${quarter.estimated.toLocaleString()}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-3 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deduction Breakdown</CardTitle>
                <CardDescription>Tax-deductible expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deductionCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deductionCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deduction Details</CardTitle>
                <CardDescription>Itemized business deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deductionCategories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="font-semibold">${category.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 border-t-2 border-gray-300 font-bold">
                    <span>Total Deductions:</span>
                    <span>${deductionCategories.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Forms & Filings</CardTitle>
              <CardDescription>Required tax forms and filing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxForms.map((form) => (
                  <Card key={form.form} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold">{form.form}</h3>
                            <p className="text-sm text-gray-600">{form.description}</p>
                            <p className="text-xs text-gray-500">Due: {form.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-semibold">${form.estimatedTax.toLocaleString()}</div>
                            <p className="text-sm text-gray-500">Estimated tax</p>
                          </div>
                          <Badge variant={getStatusColor(form.status)}>{form.status}</Badge>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
