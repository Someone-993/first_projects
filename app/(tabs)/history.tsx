"use client"

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { useRouter } from "expo-router"

const History = () => {
  const router = useRouter()

  const transactions = [
    {
      id: 1,
      date: "27 Feb 2025",
      type: "Transferred",
      time: "4:20 PM",
      amount: "-58 TRX",
      amountColor: "text-red-500",
      icon: "↗",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      currency: "TRX",
      value: 58,
      isOutgoing: true,
      recipient: "TRX7c0xc...8f0",
      networkFee: "2.5 TRX",
      status: "Completed",
    },
    {
      id: 2,
      date: "26 Feb 2025",
      type: "Received",
      time: "3:24 PM",
      amount: "+5 SOL",
      amountColor: "text-green-500",
      icon: "↙",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      currency: "SOL",
      value: 5,
      isOutgoing: false,
      sender: "SOL9x1a2...3b4c",
      networkFee: "0.001 SOL",
      status: "Completed",
    },
    {
      id: 3,
      date: "25 Feb 2025",
      type: "Received",
      time: "3:24 PM",
      amount: "+5 SOL",
      amountColor: "text-green-500",
      icon: "↙",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      currency: "SOL",
      value: 5,
      isOutgoing: false,
      sender: "SOL8y2b3...4c5d",
      networkFee: "0.001 SOL",
      status: "Completed",
    },
    {
      id: 4,
      date: "24 Feb 2025",
      type: "Transferred",
      time: "4:20 PM",
      amount: "-58 TRX",
      amountColor: "text-red-500",
      icon: "↗",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      currency: "TRX",
      value: 58,
      isOutgoing: true,
      recipient: "TRX6b9c8...7e8f",
      networkFee: "2.5 TRX",
      status: "Completed",
    },
  ]

  const handleTransactionPress = (transaction: any) => {
    router.push({
      pathname: "/(tabs)/receipt",
      params: {
        id: transaction.id,
        type: transaction.type,
        date: transaction.date,
        time: transaction.time,
        currency: transaction.currency,
        value: transaction.value,
        isOutgoing: transaction.isOutgoing,
        recipient: transaction.recipient || "",
        sender: transaction.sender || "",
        networkFee: transaction.networkFee,
        status: transaction.status,
      },
    })
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-3xl font-bold text-black mb-2">Activity</Text>

        <View className="mb-6">
          <Text className="text-blue-600 text-sm font-medium mb-1">💰 Total spent in Feb</Text>
          <Text className="text-3xl font-bold text-black mb-3">$ 22,870</Text>

          <View className="mb-2">
            <View className="w-full h-2 bg-gray-200 rounded-full">
              <View className="w-3/4 h-2 bg-blue-600 rounded-full"></View>
            </View>
          </View>
          <Text className="text-gray-500 text-sm">📊 Monthly spending limit: $30,000</Text>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold text-black">Transaction History</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-blue-600 text-sm font-medium mr-1">By Date</Text>
            <Image source={require("../../../assets/icon.png")} className="w-4 h-4" />
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
          {transactions.map((transaction, index) => (
            <View key={transaction.id}>
              {(index === 0 || transactions[index - 1].date !== transaction.date) && (
                <Text className="text-gray-400 text-xs font-medium mb-3 mt-2">{transaction.date}</Text>
              )}

              <TouchableOpacity
                className="bg-gray-50 p-4 rounded-lg"
                onPress={() => handleTransactionPress(transaction)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className={`w-10 h-10 rounded-full ${transaction.iconBg} items-center justify-center mr-3`}>
                      <Text className={`text-lg ${transaction.iconColor}`}>{transaction.icon}</Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-black font-semibold text-base">{transaction.type}</Text>
                      <Text className="text-gray-600 text-sm">{transaction.time}</Text>
                    </View>
                  </View>

                  <Text className={`font-semibold text-base ${transaction.amountColor}`}>{transaction.amount}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default History