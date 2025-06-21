import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface ProfileScreenProps {
  navigation: any
}

const menuItems = [
  { icon: "settings-outline", title: "Settings", color: "#6B7280" },
  { icon: "notifications-outline", title: "Notifications", color: "#6B7280" },
  { icon: "time-outline", title: "History", color: "#6B7280" },
  { icon: "help-circle-outline", title: "Support and Help", color: "#6B7280" },
  { icon: "log-out-outline", title: "Logout", color: "#EF4444" },
]

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  console.log("ProfileScreen");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={require('../../assets/images/profile.png')} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>Muhammad Haris</Text>
          <Text style={styles.userEmail}>muhammad@example.com</Text>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === "History") {
                  navigation.navigate("Saved")
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
                <Text style={[styles.menuItemText, { color: item.color }]}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#6B7280",
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
  },
})
