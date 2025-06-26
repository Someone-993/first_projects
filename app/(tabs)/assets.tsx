import { View, Text, ScrollView } from "react-native"

const Assets = () => {
  const assets = [
    { name: "Bitcoin", symbol: "BTC", value: "$8,250.00", change: "+1.2%" },
    { name: "Ethereum", symbol: "ETH", value: "$3,200.00", change: "+0.8%" },
    { name: "Cardano", symbol: "ADA", value: "$1,000.00", change: "-0.5%" },
  ]

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-3xl font-bold mb-6">Portfolio</Text>

        <View className="bg-green-50 p-6 rounded-lg mb-6">
          <Text className="text-lg font-semibold mb-2">Total Portfolio Value</Text>
          <Text className="text-3xl font-bold text-green-600">$12,450.00</Text>
          <Text className="text-green-600 mt-2">+1.8% this week</Text>
        </View>

        <View className="space-y-4">
          <Text className="text-xl font-semibold">Your Assets</Text>

          {assets.map((asset, index) => (
            <View key={index} className="bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold">{asset.name}</Text>
                  <Text className="text-gray-600">{asset.symbol}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-semibold">{asset.value}</Text>
                  <Text className={asset.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                    {asset.change}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Assets