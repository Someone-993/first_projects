"use client"

import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"

const Receipt = () => {
  const router = useRouter()
  const params = useLocalSearchParams()

  const transactionData = {
    id: params.id as string,
    type: params.type as string,
    date: params.date as string,
    time: params.time as string,
    currency: params.currency as string,
    value: Number.parseFloat(params.value as string),
    isOutgoing: params.isOutgoing === "true",
    recipient: params.recipient as string,
    sender: params.sender as string,
    networkFee: params.networkFee as string,
    status: params.status as string,
  }

  const generateTransactionId = () => {
    const prefix =
      transactionData.currency === "TRX" ? "0x7c0xc" : transactionData.currency === "SOL" ? "0x9a1b2" : "0x5d6e7"
    return `${prefix}...${Math.random().toString(36).substr(2, 3)}`
  }

  const formatDateTime = () => {
    const dateStr = transactionData.date
    const timeStr = transactionData.time
    const dateParts = dateStr.split(" ")
    const day = dateParts[0]
    const month = dateParts[1] === "Feb" ? "02" : "01"
    const year = dateParts[2]

    const [time, period] = timeStr.split(" ")
    const [hours, minutes] = time.split(":")
    let hour24 = Number.parseInt(hours)
    if (period === "PM" && hour24 !== 12) hour24 += 12
    if (period === "AM" && hour24 === 12) hour24 = 0

    return `${day}-${month}-${year}, ${hour24.toString().padStart(2, "0")}:${minutes}:00`
  }

  const transactionId = generateTransactionId()
  const formattedDateTime = formatDateTime()
  const actionText = transactionData.isOutgoing ? "Payment Success!" : "Received Successfully!"
  const actionDescription = transactionData.isOutgoing ? "Your payment has been successfully sent." : "You have successfully received the payment."

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-black">Receipt</Text>
          <TouchableOpacity>
            <Text className="text-2xl">📤</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mb-8">
          <View
            className={`w-16 h-16 ${transactionData.isOutgoing ? "bg-blue-600" : "bg-green-600"} rounded-full items-center justify-center mb-4`}
          >
            <Image source={require("../../assets/icon.png")} className="w-8 h-8" />
          </View>

          <Text className="text-2xl font-bold text-black mb-2">{actionText}</Text>
          <Text className="text-gray-500 text-center">{actionDescription}</Text>
        </View>

        <View className="bg-gray-50 rounded-lg p-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-semibold text-black">Transaction Details</Text>
            <Text className="text-xl">^</Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Transaction ID</Text>
              <Text className="text-black font-medium">{transactionId}</Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Status</Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2"></View>
                <Text className="text-green-600 font-medium">{transactionData.status}</Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Date & Time</Text>
              <Text className="text-black font-medium">{formattedDateTime}</Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Type</Text>
              <Text className="text-black font-medium">{transactionData.type}</Text>
            </View>

            {transactionData.isOutgoing && transactionData.recipient && (
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600">Recipient</Text>
                <Text className="text-black font-medium">{transactionData.recipient}</Text>
              </View>
            )}

            {!transactionData.isOutgoing && transactionData.sender && (
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600">Sender</Text>
                <Text className="text-black font-medium">{transactionData.sender}</Text>
              </View>
            )}

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Amount</Text>
              <Text className="text-black font-medium">
                {transactionData.value} {transactionData.currency}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Network Fee</Text>
              <Text className="text-black font-medium">{transactionData.networkFee}</Text>
            </View>

            <View className="h-px bg-gray-200 my-2"></View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Total {transactionData.isOutgoing ? "Sent" : "Received"}</Text>
              <Text className="text-black font-bold text-lg">
                {transactionData.isOutgoing ? "-" : "+"}
                {transactionData.value} {transactionData.currency}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Receipt