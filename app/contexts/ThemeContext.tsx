"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  colors: {
    background: string
    surface: string
    text: string
    textSecondary: string
    primary: string
    border: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light")

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const isDark = theme === "dark"

  const colors = {
    background: isDark ? "#121212" : "#F5F5F5",
    surface: isDark ? "#1E1E1E" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#333333",
    textSecondary: isDark ? "#BBBBBB" : "#757575",
    primary: "#2196F3",
    border: isDark ? "#333333" : "#E0E0E0",
  }

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>{children}</ThemeContext.Provider>
}
