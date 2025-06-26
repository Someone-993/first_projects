import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    console.log("Login button pressed");
    console.log("Email:", email);
    console.log("Password:", password);

    if (email && password) {
      console.log("Calling login function");
      login();
      Alert.alert("Success", "Login successful!");
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };
  useEffect(() => {
    router.push("/(tabs)");
  }, []);
  const testButton = () => {
    Alert.alert("Test", "Test button works!");
  };

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold mb-8 text-center">Login</Text>

        <View className="space-y-4 mb-8">
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
          onPress={handleLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#3B82F6" : "#3B82F6",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="px-6 py-4 rounded-lg mb-4"
        >
          <Text className="text-white font-semibold text-center text-lg">
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={testButton}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EF4444" : "#EF4444",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="px-6 py-4 rounded-lg mb-4"
        >
          <Text className="text-white font-semibold text-center text-lg">
            Test Button
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/register")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#E5E7EB" : "#E5E7EB",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="px-6 py-4 rounded-lg"
        >
          <Text className="text-gray-700 font-semibold text-center text-lg">
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
