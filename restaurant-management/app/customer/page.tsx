"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Calendar, Clock, MapPin } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  description: string
}

interface Reservation {
  id: string
  restaurantName: string
  tableNumber: number
  date: string
  time: string
  guests: number
  status: "confirmed" | "pending" | "cancelled"
}

export default function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch restaurants
      const restaurantsResponse = await fetch("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (restaurantsResponse.ok) {
        const restaurantsData = await restaurantsResponse.json()
        setRestaurants(restaurantsData.slice(0, 3)) // Show only first 3
      }

      // Fetch recent reservations
      const reservationsResponse = await fetch("/api/reservations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (reservationsResponse.ok) {
        const reservationsData = await reservationsResponse.json()
        setRecentReservations(reservationsData.slice(0, 3)) // Show only recent 3
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const mockRestaurants: Restaurant[] = [
    {
      id: "1",
      name: "Bella Vista",
      address: "123 Main St, Downtown",
      phone: "+1 (555) 123-4567",
      description: "Fine dining with Italian cuisine",
    },
    {
      id: "2",
      name: "Ocean Breeze",
      address: "456 Beach Ave, Waterfront",
      phone: "+1 (555) 987-6543",
      description: "Fresh seafood and ocean views",
    },
    {
      id: "3",
      name: "Garden Terrace",
      address: "789 Park Blvd, Uptown",
      phone: "+1 (555) 456-7890",
      description: "Farm-to-table dining experience",
    },
  ]

  const mockReservations: Reservation[] = [
    {
      id: "1",
      restaurantName: "Bella Vista",
      tableNumber: 12,
      date: "2024-01-15",
      time: "19:00",
      guests: 4,
      status: "confirmed",
    },
    {
      id: "2",
      restaurantName: "Ocean Breeze",
      tableNumber: 8,
      date: "2024-01-20",
      time: "18:30",
      guests: 2,
      status: "pending",
    },
  ]

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Discover amazing restaurants and manage your reservations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Restaurants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockRestaurants.length}</div>
              <p className="text-xs text-muted-foreground">In our network</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReservations.length}</div>
              <p className="text-xs text-muted-foreground">Upcoming bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Restaurants */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Restaurants</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {restaurant.name}
                  </CardTitle>
                  <CardDescription>{restaurant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {restaurant.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {restaurant.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Reservations */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Reservations</h2>
          <div className="space-y-4">
            {mockReservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{reservation.restaurantName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Table {reservation.tableNumber} • {reservation.guests} guests
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.date} at {reservation.time}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
