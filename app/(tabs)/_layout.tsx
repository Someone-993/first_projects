import { View, Text } from "react-native"
import { Tabs } from "expo-router"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { Scan } from "iconsax-react-native"
import classNames from "classnames"

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 96,
        },
        tabBarLabel: (props) => <Text className="text-sm">{props.children}</Text>,
        // tabBarButton: (props) => <View>{props}</View>,
        tabBarActiveTintColor: "#003CFF",
        tabBarInactiveTintColor: "#0D1527",
      }}
      //   tabBar={TabBar}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: (props: {
            focused: boolean
            size: number
            color: string
          }) => (
            <View>
              <Feather size={24} color={props.color} name="home" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          title: "Assets",
          tabBarIcon: (props: {
            focused: boolean
            size: number
            color: string
          }) => (
            <View>
              <Feather size={24} color={props.color} name="grid" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="swap"
        options={{
          title: "Swap",
          tabBarLabel: () => <></>,
          tabBarIcon: (props: {
            focused: boolean
            size: number
            color: string
          }) => (
            <View
              className={classNames(
                "h-16 w-16 min-h-16 mt-4 min-w-16 flex flex-col items-center justify-center  rounded-full",
              )}
              style={{
                backgroundColor: !props.focused ? "white" : "#003CFF",
              }}
            >
              <Scan size={18} color={props.focused ? "white" : "#003CFF"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: (props: {
            focused: boolean
            size: number
            color: string
          }) => <MaterialCommunityIcons size={24} color={props.color} name="clock" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: (props: {
            focused: boolean
            size: number
            color: string
          }) => <MaterialCommunityIcons size={24} color={props.color} name="cog" />,
        }}
      />
      <Tabs.Screen
        name="receipt"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout