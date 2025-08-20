"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Building, MapPin, Phone, Clock, Users, Star, Calendar } from "lucide-react"
import { ReservationModal } from "./reservation-modal"

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  description: string
  cuisine: string
  rating: number
  priceRange: string
  openingHours: string
  availableTables: number
}

interface RestaurantDetailsModalProps {
  restaurant: Restaurant
}

export function RestaurantDetailsModal({ restaurant }: RestaurantDetailsModalProps) {
  const [showReservationModal, setShowReservationModal] = useState(false)

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case "$":
        return "bg-green-100 text-green-800"
      case "$$":
        return "bg-blue-100 text-blue-800"
      case "$$$":
        return "bg-orange-100 text-orange-800"
      case "$$$$":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const mockTables = [
    { id: "1", number: 1, capacity: 2, available: true },
    { id: "2", number: 2, capacity: 4, available: true },
    { id: "3", number: 3, capacity: 6, available: false },
    { id: "4", number: 4, capacity: 2, available: true },
    { id: "5", number: 5, capacity: 8, available: true },
    { id: "6", number: 6, capacity: 4, available: false },
  ]

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          {restaurant.name}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-muted-foreground">{restaurant.description}</p>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{restaurant.rating}</span>
              <Badge className={getPriceRangeColor(restaurant.priceRange)}>{restaurant.priceRange}</Badge>
              <Badge variant="outline">{restaurant.cuisine}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact & Hours */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {restaurant.address}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {restaurant.phone}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Hours & Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {restaurant.openingHours}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                {restaurant.availableTables} tables available
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Available Tables */}
        <div className="space-y-3">
          <h3 className="font-semibold">Available Tables</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mockTables.map((table) => (
              <div
                key={table.id}
                className={`p-3 rounded-lg border text-center text-sm ${
                  table.available
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                <div className="font-semibold">Table {table.number}</div>
                <div className="text-xs">{table.capacity} seats</div>
                <div className="text-xs">{table.available ? "Available" : "Occupied"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Dialog open={showReservationModal} onOpenChange={setShowReservationModal}>
            <DialogTrigger asChild>
              <Button className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Make Reservation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ReservationModal restaurant={restaurant} onClose={() => setShowReservationModal(false)} />
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Restaurant
          </Button>
        </div>
      </div>
    </>
  )
}
