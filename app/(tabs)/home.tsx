import { View, Text, ScrollView, Pressable } from "react-native"
import { router } from "expo-router"

const Home = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-3xl font-bold mb-6">Dashboard</Text>

        <View className="bg-blue-50 p-6 rounded-lg mb-6">
          <Text className="text-lg font-semibold mb-2">Total Balance</Text>
          <Text className="text-3xl font-bold text-blue-600">$12,450.00</Text>
          <Text className="text-green-600 mt-2">+2.5% today</Text>
        </View>

        <View className="space-y-4 mb-6">
          <Text className="text-xl font-semibold">Quick Actions</Text>

          <Pressable onPress={() => router.push("/(tabs)/swap")} className="bg-blue-500 p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">Swap Assets</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/(tabs)/assets")} className="bg-green-500 p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">View Portfolio</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/(tabs)/history")} className="bg-purple-500 p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">Transaction History</Text>
          </Pressable>
        </View>

        <View className="bg-gray-50 p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Recent Activity</Text>
          <Text className="text-gray-600">No recent transactions</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Home