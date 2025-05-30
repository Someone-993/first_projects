"use client"

import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme, colors } = useTheme()

  const handleToggleTheme = () => {
    toggleTheme()
    Alert.alert("Успешно", `Тема изменена на ${!isDark ? "темную" : "светлую"}`)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Octicons name="gear" size={24} color={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Настройки</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
          <View style={styles.settingInfo}>
            <Octicons name={isDark ? "moon" : "sun"} size={20} color={colors.text} />
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Тема приложения</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                {isDark ? "Темная тема активна" : "Светлая тема активна"}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={handleToggleTheme}
            trackColor={{ false: "#E0E0E0", true: colors.primary }}
            thumbColor={isDark ? "#FFFFFF" : "#F5F5F5"}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  }
})
