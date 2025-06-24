import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import AuthInput from "../components/AuthInput"
import PrimaryButton from "../components/PrimaryButton"
import AuthHeader from "../../components/AuthHeader"

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup")

  const handleRegister = () => {
    router.push("/(auth)/otp")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <View className="mb-8">
          <AuthHeader/>
        </View>

        <View className="flex-row space-x-4 mb-6">
          <View className="flex-1">
            <Text className="text-sm text-gray-700 mb-2">First Name</Text>
            <AuthInput value={firstName} onChangeText={setFirstName} placeholder="First Name" />
          </View>
          <View className="flex-1">
            <Text className="text-sm text-gray-700 mb-2">Last Name</Text>
            <AuthInput value={lastName} onChangeText={setLastName} placeholder="Last Name" />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm text-gray-700 mb-2">Email</Text>
          <AuthInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm text-gray-700 mb-2">Set Password</Text>
          <AuthInput value={password} onChangeText={setPassword} placeholder="Set your password" secureTextEntry />
        </View>

        <View className="mb-8">
          <Text className="text-sm text-gray-700 mb-2">Confirm Password</Text>
          <AuthInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />
        </View>

        <View className="mb-8">
          <PrimaryButton title="Register" onPress={handleRegister} showArrow />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
