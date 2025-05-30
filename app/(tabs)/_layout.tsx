"use client"

import { Tabs } from "expo-router"
import { Octicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

export default function TabsLayout() {
  const { colors, isDark } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          elevation: 8,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Поиск",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Octicons name="search" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          tabBarIcon: ({ color, size }) => <Octicons name="gear" color={color} size={size} />,
        }}
      />
    </Tabs>
  )
}
