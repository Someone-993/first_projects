"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Building, MapPin, Phone, Clock, Users, Search } from "lucide-react"
import { RestaurantDetailsModal } from "@/components/modals/restaurant-details-modal"

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

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)

  const mockRestaurants: Restaurant[] = [
    {
      id: "1",
      name: "Bella Vista",
      address: "123 Main St, Downtown",
      phone: "+1 (555) 123-4567",
      description: "Fine dining with authentic Italian cuisine and an extensive wine selection",
      cuisine: "Italian",
      rating: 4.8,
      priceRange: "$$$",
      openingHours: "11:00 AM - 10:00 PM",
      availableTables: 12,
    },
    {
      id: "2",
      name: "Ocean Breeze",
      address: "456 Beach Ave, Waterfront",
      phone: "+1 (555) 987-6543",
      description: "Fresh seafood and ocean views with a relaxed coastal atmosphere",
      cuisine: "Seafood",
      rating: 4.6,
      priceRange: "$$",
      openingHours: "12:00 PM - 11:00 PM",
      availableTables: 8,
    },
    {
      id: "3",
      name: "Garden Terrace",
      address: "789 Park Blvd, Uptown",
      phone: "+1 (555) 456-7890",
      description: "Farm-to-table dining experience with organic ingredients",
      cuisine: "American",
      rating: 4.7,
      priceRange: "$$",
      openingHours: "10:00 AM - 9:00 PM",
      availableTables: 15,
    },
    {
      id: "4",
      name: "Spice Route",
      address: "321 Curry Lane, Little India",
      phone: "+1 (555) 234-5678",
      description: "Authentic Indian cuisine with traditional spices and flavors",
      cuisine: "Indian",
      rating: 4.5,
      priceRange: "$",
      openingHours: "11:30 AM - 10:30 PM",
      availableTables: 10,
    },
    {
      id: "5",
      name: "Le Petit Bistro",
      address: "654 French Quarter, Historic District",
      phone: "+1 (555) 345-6789",
      description: "Classic French bistro with traditional dishes and cozy ambiance",
      cuisine: "French",
      rating: 4.9,
      priceRange: "$$$$",
      openingHours: "5:00 PM - 11:00 PM",
      availableTables: 6,
    },
    {
      id: "6",
      name: "Tokyo Nights",
      address: "987 Sakura Street, Japan Town",
      phone: "+1 (555) 567-8901",
      description: "Modern Japanese cuisine with sushi bar and teppanyaki grill",
      cuisine: "Japanese",
      rating: 4.4,
      priceRange: "$$$",
      openingHours: "6:00 PM - 12:00 AM",
      availableTables: 9,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRestaurants(mockRestaurants)
      setFilteredRestaurants(mockRestaurants)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredRestaurants(filtered)
  }, [searchTerm, restaurants])

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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Restaurants</h1>
            <p className="text-muted-foreground">Discover and book tables at our partner restaurants</p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search restaurants, cuisine, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        {restaurant.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{restaurant.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={getPriceRangeColor(restaurant.priceRange)}>{restaurant.priceRange}</Badge>
                      <div className={`text-sm font-semibold ${getRatingColor(restaurant.rating)}`}>
                        ★ {restaurant.rating}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {restaurant.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {restaurant.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {restaurant.openingHours}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {restaurant.availableTables} tables available
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline">{restaurant.cuisine}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedRestaurant(restaurant)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <RestaurantDetailsModal restaurant={restaurant} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all restaurants.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
