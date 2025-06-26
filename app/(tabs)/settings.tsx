import { View, Text, TouchableOpacity, ScrollView } from "react-native"

const Settings = () => {
  const menuItems = [
    { icon: "👤", title: "Profile", hasArrow: true },
    { icon: "🔒", title: "Security", hasArrow: true },
    { icon: "🌐", title: "Language", hasArrow: true },
    { icon: "🔔", title: "Notifications", hasArrow: true },
    { icon: "💬", title: "Help & Feedback", hasArrow: true },
    { icon: "📄", title: "Legal & Terms", hasArrow: true },
    { icon: "🚪", title: "Log Out", hasArrow: false, isLogout: true },
  ]

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-8">
        <Text className="text-3xl font-bold text-black mb-6">Settings</Text>

        <View className="bg-blue-600 rounded-lg p-6 mb-6">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-white bg-opacity-20 rounded-full items-center justify-center mr-3">
              <Text className="text-white text-lg"> </Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg">Verify your identity</Text>
              <Text className="text-blue-100 text-sm">Confirm to unlock features</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-lg overflow-hidden space-y-0">
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} className="bg-gray-50 p-4 rounded-lg mb-2">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-lg">{item.icon}</Text>
                </View>

                <Text className={`flex-1 text-lg font-semibold ${item.isLogout ? "text-red-500" : "text-black"}`}>
                  {item.title}
                </Text>

                {item.hasArrow && <Text className="text-gray-400 text-lg">›</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Settings