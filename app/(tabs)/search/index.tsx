"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Octicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useTheme } from "../../contexts/ThemeContext"

export default function SearchScreen() {
  const { colors } = useTheme()
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchUsers = async (username: string) => {
    const res = await fetch("https://api.github.com/search/users?q=" + username)
    const data = await res.json()
    return data
  }

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Пожалуйста, введите имя пользователя")
      return
    }

    setLoading(true)
    setError("")

    try {
      const data = await searchUsers(username)
      router.push({
        pathname: "/search/results",
        params: { results: JSON.stringify(data), searchTerm: username },
      })
    } catch (err) {
      setError("Произошла ошибка при поиске")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" }}
          style={styles.logo}
        />

        <Text style={[styles.title, { color: colors.text }]}>Поиск пользователей GitHub</Text>

        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Octicons name="search" size={20} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Введите имя пользователя GitHub"
            placeholderTextColor={colors.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.primary }]}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Поиск</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  searchButton: {
    borderRadius: 8,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#D32F2F",
    marginBottom: 10,
  },
})
