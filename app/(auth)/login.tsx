import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import AuthInput from "../components/AuthInput"
import PrimaryButton from "../components/PrimaryButton"
import SocialButton from "../components/SocialButton"
import CheckBox from "../components/CheckBox"
import AuthHeader from "../../components/AuthHeader"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  const handleLogin = () => {
    router.push("/(auth)/otp")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <View className="mb-8">
          <AuthHeader/>
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

        <View className="mb-4">
          <Text className="text-sm text-gray-700 mb-2">Password</Text>
          <AuthInput value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry />
        </View>

        <View className="flex-row items-center justify-between mb-8">
          <CheckBox checked={rememberMe} onPress={() => setRememberMe(!rememberMe)} label="Remember me" />
          <TouchableOpacity>
            <Text className="text-blue-600 text-sm">Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <PrimaryButton title="Log In" onPress={handleLogin} showArrow />
        </View>

        <View className="mb-6">
          <Text className="text-center text-gray-500 text-sm mb-6">Or login with</Text>
          <View className="flex-row justify-center space-x-4">
            <SocialButton type="google" />
            <SocialButton type="apple" />
            <SocialButton type="twitter" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
