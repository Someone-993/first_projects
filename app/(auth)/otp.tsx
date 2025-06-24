import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import OtpInput from "../components/OtpInput"
import SecondaryButton from "../components/SecondaryButton"
import PrimaryButton from "../components/PrimaryButton"
import LogoIcon from "../components/LogoIcon"

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", ""])

  const handleBack = () => {
    router.back()
  }

  const handleSend = () => {
    console.log("OTP:", otp.join(""))
  }

  const handleResend = () => {
    console.log("Resend OTP")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="items-center mt-8 mb-8">
          <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center">
            <LogoIcon/>
          </View>
        </View>

        <View className="mb-12">
          <Text className="text-2xl font-bold text-center text-gray-900 mb-4">Enter verification code</Text>
          <Text className="text-base text-center text-gray-600 leading-5">
            We've sent a code to <Text className="text-blue-600">Lois@gmail.com</Text>
          </Text>
        </View>

        <View className="mb-8">
          <OtpInput value={otp} onChange={setOtp} length={4} />
        </View>

        <View className="mb-12">
          <Text className="text-center text-gray-600 text-sm">
            Didn't get a code?{" "}
            <TouchableOpacity onPress={handleResend}>
              <Text className="text-blue-600">Click to resend.</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View className="flex-1" />

        <View className="flex-row space-x-4 mb-8">
          <View className="flex-1">
            <SecondaryButton title="Back" onPress={handleBack} />
          </View>
          <View className="flex-1">
            <PrimaryButton title="Send" onPress={handleSend} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
