"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, MenuIcon as Restaurant, LogOut, Home, Users, Calendar, Building, Package, UserCheck } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "super_admin" | "admin" | "customer"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getNavigationItems = () => {
    const baseItems = [{ name: "Dashboard", href: `/${role}`, icon: Home }]

    switch (role) {
      case "super_admin":
        return [
          ...baseItems,
          { name: "Restaurants", href: "/super-admin/restaurants", icon: Building },
          { name: "Users", href: "/super-admin/users", icon: Users },
          { name: "Admins", href: "/super-admin/admins", icon: UserCheck },
        ]
      case "admin":
        return [
          ...baseItems,
          { name: "Tables", href: "/admin/tables", icon: Restaurant },
          { name: "Staff", href: "/admin/staff", icon: Users },
          { name: "Products", href: "/admin/products", icon: Package },
          { name: "Reservations", href: "/admin/reservations", icon: Calendar },
        ]
      case "customer":
        return [
          ...baseItems,
          { name: "Restaurants", href: "/customer/restaurants", icon: Building },
          { name: "My Reservations", href: "/customer/reservations", icon: Calendar },
        ]
      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  const Sidebar = ({ mobile = false }) => (
    <div className={cn("flex flex-col h-full", mobile ? "w-full" : "w-64")}>
      <div className="flex items-center gap-2 p-6 border-b">
        <Restaurant className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">RestaurantMS</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              onClick={() => mobile && setSidebarOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 py-4 border-b lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex items-center gap-2">
            <Restaurant className="h-6 w-6 text-primary" />
            <span className="font-bold">RestaurantMS</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
