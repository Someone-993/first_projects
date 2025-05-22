import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'ios' ? "black" : "blue",
        },
        headerTitle: "Random excuse",
        headerTitleStyle: {
          color: "white"
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
