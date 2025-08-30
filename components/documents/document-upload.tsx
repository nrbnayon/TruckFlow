"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText } from "lucide-react"

interface DocumentUploadProps {
  onUpload: (document: any) => void
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    loadId: "",
    description: "",
    file: null as File | null,
  })

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.dataTransfer.files[0] }))
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.file || !formData.type) return

    setUploading(true)

    // Simulate upload and OCR processing
    setTimeout(() => {
      const newDocument = {
        id: Date.now().toString(),
        name: formData.file!.name,
        type: formData.type,
        loadId: formData.loadId,
        description: formData.description,
        uploadDate: new Date().toISOString(),
        status: "processed",
        size: formData.file!.size,
        extractedData:
          formData.type === "bol"
            ? {
                shipper: "ABC Logistics",
                consignee: "XYZ Distribution",
                weight: "45,000 lbs",
                commodity: "General Freight",
              }
            : null,
      }

      onUpload(newDocument)
      setFormData({ type: "", loadId: "", description: "", file: null })
      setUploading(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Document Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bol">Bill of Lading</SelectItem>
                  <SelectItem value="rate-confirmation">Rate Confirmation</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="delivery-receipt">Delivery Receipt</SelectItem>
                  <SelectItem value="pod">Proof of Delivery</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="loadId">Load ID (Optional)</Label>
              <Input
                id="loadId"
                value={formData.loadId}
                onChange={(e) => setFormData((prev) => ({ ...prev, loadId: e.target.value }))}
                placeholder="L-2024-001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Additional notes about this document..."
              rows={2}
            />
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {formData.file ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{formData.file.name}</p>
                  <p className="text-sm text-gray-500">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-gray-500">Supports PDF, JPG, PNG files up to 10MB</p>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="mt-4 bg-transparent">
                    Choose File
                  </Button>
                </Label>
              </div>
            )}
          </div>

          <Button type="submit" disabled={!formData.file || !formData.type || uploading} className="w-full">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              "Upload Document"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
