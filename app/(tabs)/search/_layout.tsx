import { Stack } from "expo-router"

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Поиск пользователей GitHub" }} />
      <Stack.Screen name="results" options={{ title: "Результаты поиска" }} />
    </Stack>
  )
}
