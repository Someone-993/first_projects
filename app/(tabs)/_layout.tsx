import { Tabs } from "expo-router"
import { Octicons } from "@expo/vector-icons"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 8,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
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
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, size }) => <Octicons name="person" color={color} size={size} />,
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
