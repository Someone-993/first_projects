"use client"

import { View, Text, ScrollView, Pressable, TextInput } from "react-native"
import { useState } from "react"

const Swap = () => {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [fromAsset, setFromAsset] = useState("BTC")
  const [toAsset, setToAsset] = useState("ETH")

  const handleSwap = () => {
    if (fromAmount && toAmount) {
      console.log("Swapping", fromAmount, fromAsset, "to", toAmount, toAsset)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-3xl font-bold mb-6">Swap Assets</Text>

        <View className="space-y-6">
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">From</Text>
            <View className="flex-row space-x-4">
              <TextInput
                placeholder="0.00"
                value={fromAmount}
                onChangeText={setFromAmount}
                className="flex-1 border border-gray-300 px-4 py-3 rounded-lg"
                keyboardType="numeric"
              />
              <Pressable className="bg-blue-500 px-4 py-3 rounded-lg">
                <Text className="text-white font-semibold">{fromAsset}</Text>
              </Pressable>
            </View>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">To</Text>
            <View className="flex-row space-x-4">
              <TextInput
                placeholder="0.00"
                value={toAmount}
                onChangeText={setToAmount}
                className="flex-1 border border-gray-300 px-4 py-3 rounded-lg"
                keyboardType="numeric"
              />
              <Pressable className="bg-green-500 px-4 py-3 rounded-lg">
                <Text className="text-white font-semibold">{toAsset}</Text>
              </Pressable>
            </View>
          </View>

          <View className="bg-blue-50 p-4 rounded-lg">
            <Text className="text-sm text-gray-600 mb-1">Exchange Rate</Text>
            <Text className="text-lg font-semibold">
              1 {fromAsset} = 15.2 {toAsset}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">Fee: 0.1%</Text>
          </View>

          <Pressable
            onPress={handleSwap}
            className="bg-blue-500 px-6 py-4 rounded-lg"
            disabled={!fromAmount || !toAmount}
          >
            <Text className="text-white font-semibold text-center text-lg">
              Swap {fromAsset} to {toAsset}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default Swap