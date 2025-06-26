import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import AuthHeader from "../../components/AuthHeader";

export default function AuthIndex() {
  return (
    <View className="flex-1 bg-white px-6">
      <AuthHeader />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl mb-8 text-center">Welcome to VaultChain</Text>
        <View className="w-full space-y-4">
          <Pressable
            onPress={() => router.push("/login")}
            className="bg-blue-500 px-6 py-4 rounded-lg"
          >
            <Text className="text-white font-semibold text-center">Login</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/register")}
            className="bg-green-500 px-6 py-4 rounded-lg"
          >
            <Text className="text-white font-semibold text-center">
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
