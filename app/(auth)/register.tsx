import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { router } from "expo-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleRegister = () => {
    if (name && email && password) {
      login();
    }
  };

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold mb-8 text-center">
          Create Account
        </Text>

        <View className="space-y-4 mb-8">
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 px-4 py-3 rounded-lg"
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 px-4 py-3 rounded-lg"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 px-4 py-3 rounded-lg"
            secureTextEntry
          />
        </View>

        <Pressable
          onPress={handleRegister}
          className="bg-green-500 px-6 py-4 rounded-lg mb-4"
        >
          <Text className="text-white font-semibold text-center">
            Create Account
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/login")}
          className="bg-gray-200 px-6 py-4 rounded-lg"
        >
          <Text className="text-gray-700 font-semibold text-center">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
