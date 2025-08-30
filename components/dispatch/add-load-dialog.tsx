"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface AddLoadDialogProps {
  onAddLoad: (load: any) => void
}

export function AddLoadDialog({ onAddLoad }: AddLoadDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    loadNumber: "",
    origin: "",
    destination: "",
    pickupDate: "",
    deliveryDate: "",
    revenue: "",
    distance: "",
    weight: "",
    commodity: "",
    brokerName: "",
    brokerContact: "",
    specialInstructions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newLoad = {
      id: Date.now().toString(),
      ...formData,
      revenue: Number.parseFloat(formData.revenue),
      distance: Number.parseInt(formData.distance),
      weight: Number.parseInt(formData.weight),
      status: "pending",
    }
    onAddLoad(newLoad)
    setFormData({
      loadNumber: "",
      origin: "",
      destination: "",
      pickupDate: "",
      deliveryDate: "",
      revenue: "",
      distance: "",
      weight: "",
      commodity: "",
      brokerName: "",
      brokerContact: "",
      specialInstructions: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Load
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Load</DialogTitle>
          <DialogDescription>Create a new load for dispatch and assignment.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loadNumber">Load Number</Label>
                <Input
                  id="loadNumber"
                  value={formData.loadNumber}
                  onChange={(e) => setFormData({ ...formData, loadNumber: e.target.value })}
                  placeholder="LD-2024-004"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Input
                  id="commodity"
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  placeholder="Electronics"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="Dallas, TX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Los Angeles, CA"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  placeholder="3500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (miles)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  placeholder="1435"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="45000"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brokerName">Broker Name</Label>
                <Input
                  id="brokerName"
                  value={formData.brokerName}
                  onChange={(e) => setFormData({ ...formData, brokerName: e.target.value })}
                  placeholder="ABC Logistics"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brokerContact">Broker Contact</Label>
                <Input
                  id="brokerContact"
                  value={formData.brokerContact}
                  onChange={(e) => setFormData({ ...formData, brokerContact: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                placeholder="Any special handling requirements or delivery instructions..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Load</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
