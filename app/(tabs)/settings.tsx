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

  const styles = getStyles(colors)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Octicons name="gear" size={24} color={colors.text} />
        <Text style={styles.headerTitle}>Настройки</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Octicons name={isDark ? "moon" : "sun"} size={20} color={colors.text} />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Тема приложения</Text>
              <Text style={styles.settingDescription}>{isDark ? "Темная тема активна" : "Светлая тема активна"}</Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={handleToggleTheme}
            trackColor={{ false: "#E0E0E0", true: colors.primary }}
            thumbColor={isDark ? "#FFFFFF" : "#F5F5F5"}
          />
        </View>

        <TouchableOpacity style={styles.themeButton} onPress={handleToggleTheme}>
          <Octicons name="paintbrush" size={20} color="#FFFFFF" />
          <Text style={styles.themeButtonText}>Переключить на {isDark ? "светлую" : "темную"} тему</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>О приложении</Text>
          <Text style={styles.infoText}>GitHub User Search v1.0.0</Text>
          <Text style={styles.infoText}>Поиск пользователей GitHub с поддержкой тем</Text>
          <Text style={styles.infoText}>Создано с использованием React Native и Expo Router</Text>
        </View>

        <View style={styles.featuresList}>
          <Text style={styles.featuresTitle}>Возможности:</Text>
          <View style={styles.featureItem}>
            <Octicons name="search" size={16} color={colors.primary} />
            <Text style={styles.featureText}>Поиск пользователей GitHub</Text>
          </View>
          <View style={styles.featureItem}>
            <Octicons name="moon" size={16} color={colors.primary} />
            <Text style={styles.featureText}>Светлая и темная тема</Text>
          </View>
          <View style={styles.featureItem}>
            <Octicons name="device-mobile" size={16} color={colors.primary} />
            <Text style={styles.featureText}>Адаптивный дизайн</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 15,
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
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
      color: colors.text,
      marginBottom: 4,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    themeButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 15,
      marginTop: 10,
      elevation: 3,
    },
    themeButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 10,
    },
    infoSection: {
      marginTop: 30,
      padding: 20,
      backgroundColor: colors.surface,
      borderRadius: 12,
      elevation: 2,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    featuresList: {
      marginTop: 20,
      padding: 20,
      backgroundColor: colors.surface,
      borderRadius: 12,
      elevation: 2,
    },
    featuresTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 15,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    featureText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 10,
    },
  })
