import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./contexts/ThemeContext"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
