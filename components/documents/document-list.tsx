"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Search, Calendar } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  loadId?: string
  description: string
  uploadDate: string
  status: "pending" | "processed" | "approved" | "rejected"
  size: number
  extractedData?: any
  uploadedBy?: string
}

interface DocumentListProps {
  documents: Document[]
  onView: (document: Document) => void
  onDownload: (document: Document) => void
}

export function DocumentList({ documents, onView, onDownload }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.loadId && doc.loadId.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processed":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      bol: "Bill of Lading",
      "rate-confirmation": "Rate Confirmation",
      invoice: "Invoice",
      "delivery-receipt": "Delivery Receipt",
      pod: "Proof of Delivery",
      other: "Other",
    }
    return labels[type] || type
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Library
        </CardTitle>

        {/* Filters */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="bol">Bill of Lading</SelectItem>
              <SelectItem value="rate-confirmation">Rate Confirmation</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="delivery-receipt">Delivery Receipt</SelectItem>
              <SelectItem value="pod">Proof of Delivery</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{document.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{getTypeLabel(document.type)}</span>
                      {document.loadId && (
                        <>
                          <span>•</span>
                          <span>Load: {document.loadId}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{(document.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    {document.description && <p className="text-sm text-gray-600 mt-1">{document.description}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(document.status)}>
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => onView(document)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDownload(document)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {document.extractedData && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Extracted Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(document.extractedData).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-blue-700 font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span className="ml-2 text-blue-800">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No documents found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
