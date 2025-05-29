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

export default function SearchScreen() {
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.content}>
        <Image
          source={{ uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" }}
          style={styles.logo}
        />

        <Text style={styles.title}>Поиск пользователей GitHub</Text>

        <View style={styles.inputContainer}>
          <Octicons name="search" size={20} color="#757575" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Введите имя пользователя GitHub"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Поиск</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    color: "#333333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
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
    backgroundColor: "#2196F3",
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
