import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TabBarButton = ({ route, descriptors }: any) => {
  const options = descriptors[route.key];
  const { route: tabRoute, options: tabOptions } = options;
  //   console.log("taboptions", JSON.stringify(tabOptions, null, 2));
  console.log("tabRoute", JSON.stringify(tabRoute, null, 2));
  console.log("route", JSON.stringify(route, null, 2));
  if (tabOptions?.tabBarItemStyle?.display === "none") return null;
  return (
    <Pressable
      onPress={() => router.push(route.name)}
      className="flex flex-col gap-1.5 px-3.5 items-center justify-center"
    >
      <Feather
        name="clock"
        style={{
          color: tabRoute.name === route.name ? "#003CFF" : "#0D1527",
        }}
        size={24}
      />
      <Text className="text-sm">{tabOptions.title}</Text>
    </Pressable>
  );
};
const TabBar = (props: BottomTabBarProps) => {
  console.log(JSON.stringify(props.navigation.getState(), null));
  return (
    <View className="bg-[#F8F9FA] h-24 items-center justify-center flex flex-row">
      {props.state.routes.map((route) => {
        return (
          <TabBarButton
            // navigation={props.navigation.}
            route={route as any}
            descriptors={props.descriptors}
            key={route.key}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
