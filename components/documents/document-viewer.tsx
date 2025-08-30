"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar, User, CheckCircle, XCircle } from "lucide-react"

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

interface DocumentViewerProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
  onApprove?: (document: Document) => void
  onReject?: (document: Document) => void
}

export function DocumentViewer({ document, isOpen, onClose, onApprove, onReject }: DocumentViewerProps) {
  if (!document) return null

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] md:min-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {document.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                  <div>
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Document preview not available</p>
                    <p className="text-sm text-gray-500">
                      In a real application, this would show the actual document content
                    </p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download to View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(document.status)}>
                      {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="mt-1">{getTypeLabel(document.type)}</p>
                </div>

                {document.loadId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Load ID</label>
                    <p className="mt-1">{document.loadId}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">Upload Date</label>
                  <p className="mt-1 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">File Size</label>
                  <p className="mt-1">{(document.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>

                {document.uploadedBy && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Uploaded By</label>
                    <p className="mt-1 flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {document.uploadedBy}
                    </p>
                  </div>
                )}

                {document.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1 text-sm">{document.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {document.extractedData && (
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(document.extractedData).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <p className="mt-1">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {document.status === "processed" && (onApprove || onReject) && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {onApprove && (
                    <Button onClick={() => onApprove(document)} className="w-full bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Document
                    </Button>
                  )}
                  {onReject && (
                    <Button onClick={() => onReject(document)} variant="destructive" className="w-full">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Document
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
