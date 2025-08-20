"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, UserCheck, TrendingUp, Globe, Activity } from "lucide-react"

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalUsers: 0,
    totalAdmins: 0,
    totalRevenue: 0,
    activeReservations: 0,
    systemHealth: 0,
  })

  const mockStats = {
    totalRestaurants: 12,
    totalUsers: 2847,
    totalAdmins: 24,
    totalRevenue: 485620,
    activeReservations: 156,
    systemHealth: 98,
  }

  const recentRestaurants = [
    {
      id: "1",
      name: "Bella Vista Downtown",
      location: "New York, NY",
      status: "active",
      addedDate: "2024-01-10",
    },
    {
      id: "2",
      name: "Ocean Breeze Marina",
      location: "Miami, FL",
      status: "pending",
      addedDate: "2024-01-08",
    },
    {
      id: "3",
      name: "Garden Terrace Uptown",
      location: "Chicago, IL",
      status: "active",
      addedDate: "2024-01-05",
    },
  ]

  const recentAdmins = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@restaurant.com",
      restaurant: "Bella Vista",
      assignedDate: "2024-01-12",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@restaurant.com",
      restaurant: "Ocean Breeze",
      assignedDate: "2024-01-10",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats)
    }, 1000)
  }, [])

  return (
    <DashboardLayout role="super_admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage the entire restaurant network and system operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRestaurants}</div>
              <p className="text-xs text-muted-foreground">Across the network</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Restaurant Admins</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAdmins}</div>
              <p className="text-xs text-muted-foreground">Active administrators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reservations</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeReservations}</div>
              <p className="text-xs text-muted-foreground">Network-wide</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Restaurants */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Restaurants</CardTitle>
              <CardDescription>Newly added restaurants to the network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.location} • Added {restaurant.addedDate}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        restaurant.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Admin Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Admin Assignments</CardTitle>
              <CardDescription>Newly assigned restaurant administrators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAdmins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {admin.email} • {admin.restaurant}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">{admin.assignedDate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
