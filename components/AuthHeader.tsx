import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { router, usePathname } from "expo-router";
import classNames from "classnames";

const DEFAULT_STYLE = "h-full grow items-center justify-center";
const AuthHeader = () => {
  const pathname = usePathname();
  return (
    <View className="flex flex-col items-center px-6 justify-center  gap-6">
      <Image
        source={require("../assets/Logo.svg")}
        style={{
          width: 100,
          height: 100,
        }}
        contentFit="contain"
      />
      <View className="flex flex-col gap-3 px-10 items-center">
        <Text className="text-[32px] color-[#19213D] font-poppins-semibold">
          Welcome back
        </Text>
        <Text className="text-sm color-[#19213D] font-poppins-regular">
          Create an account or log in to explore the app
        </Text>
      </View>
      <View className="w-full h-[42px] flex items-center flex-row p-0.5 rounded-md bg-[#F8F9FA]">
        <Pressable
          onPress={() => router.push("/register")}
          className={classNames(
            DEFAULT_STYLE,
            pathname === "/register" && "bg-white"
          )}
        >
          <Text>Sign Up</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/login")}
          className={classNames(
            DEFAULT_STYLE,
            pathname === "/login" && "bg-white"
          )}
        >
          <Text>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({});
