"use client"

import { Stack } from "expo-router"
import { useTheme } from "../../contexts/ThemeContext"

export default function SearchLayout() {
  const { colors } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Поиск пользователей GitHub" }} />
      <Stack.Screen name="results" options={{ title: "Результаты поиска" }} />
      <Stack.Screen name="profile" options={{ title: "Профиль пользователя" }} />
    </Stack>
  )
}
