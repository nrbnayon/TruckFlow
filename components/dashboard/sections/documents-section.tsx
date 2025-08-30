"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentUpload } from "@/components/documents/document-upload"
import { DocumentList } from "@/components/documents/document-list"
import { DocumentViewer } from "@/components/documents/document-viewer"

// Mock documents data
const mockDocuments = [
  {
    id: "1",
    name: "BOL_Load_001.pdf",
    type: "bol",
    loadId: "L-2024-001",
    description: "Bill of lading for Chicago to Dallas shipment",
    uploadDate: "2024-01-15T10:30:00Z",
    status: "approved" as const,
    size: 2048000,
    uploadedBy: "John Driver",
    extractedData: {
      shipper: "ABC Logistics",
      consignee: "XYZ Distribution",
      weight: "45,000 lbs",
      commodity: "General Freight",
    },
  },
  {
    id: "2",
    name: "Rate_Confirmation_002.pdf",
    type: "rate-confirmation",
    loadId: "L-2024-002",
    description: "Rate confirmation for Atlanta route",
    uploadDate: "2024-01-14T14:20:00Z",
    status: "processed" as const,
    size: 1536000,
    uploadedBy: "Sarah Dispatcher",
  },
  {
    id: "3",
    name: "Invoice_INV_003.pdf",
    type: "invoice",
    description: "Invoice for completed delivery",
    uploadDate: "2024-01-13T09:15:00Z",
    status: "pending" as const,
    size: 1024000,
    uploadedBy: "Mike Admin",
  },
]

export function DocumentsSection() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [viewerOpen, setViewerOpen] = useState(false)

  const handleUpload = (newDocument: any) => {
    setDocuments((prev) => [newDocument, ...prev])
  }

  const handleView = (document: any) => {
    setSelectedDocument(document)
    setViewerOpen(true)
  }

  const handleDownload = (document: any) => {
    // Simulate download
    console.log("Downloading:", document.name)
  }

  const handleApprove = (document: any) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === document.id ? { ...doc, status: "approved" as const } : doc)))
    setViewerOpen(false)
  }

  const handleReject = (document: any) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === document.id ? { ...doc, status: "rejected" as const } : doc)))
    setViewerOpen(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="library">Document Library</TabsTrigger>
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <DocumentList documents={documents} onView={handleView} onDownload={handleDownload} />
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <DocumentUpload onUpload={handleUpload} />
        </TabsContent>
      </Tabs>

      <DocumentViewer
        document={selectedDocument}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}
