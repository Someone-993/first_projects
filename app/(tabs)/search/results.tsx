"use client"

import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { useLocalSearchParams, router } from "expo-router"
import { useTheme } from "../../contexts/ThemeContext"

interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  type: string
}

interface SearchResults {
  items: GitHubUser[]
  total_count: number
}

export default function ResultsScreen() {
  const { colors } = useTheme()
  const { results: resultsParam, searchTerm } = useLocalSearchParams<{
    results: string
    searchTerm: string
  }>()

  let results: SearchResults | null = null

  try {
    if (resultsParam) {
      results = JSON.parse(resultsParam) as SearchResults
    }
  } catch (error) {
    console.error("Failed to parse results:", error)
  }

  const handleViewProfile = (user: GitHubUser) => {
    router.push({
      pathname: "/search/profile",
      params: {
        userLogin: user.login,
        userAvatar: user.avatar_url,
        userType: user.type,
        userId: user.id.toString(),
      },
    })
  }

  if (!results || !results.items) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.searchInfo, { color: colors.textSecondary }]}>
          Найдено {results.total_count} пользователей по запросу "{searchTerm}"
        </Text>
      </View>

      {results.items.length === 0 ? (
        <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
          <Octicons name="search" size={50} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Пользователи не найдены</Text>
        </View>
      ) : (
        <FlatList
          data={results.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={[styles.username, { color: colors.text }]}>{item.login}</Text>
                <Text style={[styles.userType, { color: colors.textSecondary }]}>{item.type}</Text>
              </View>
              <TouchableOpacity
                style={[styles.viewButton, { backgroundColor: colors.primary }]}
                onPress={() => handleViewProfile(item)}
              >
                <Text style={styles.viewButtonText}>Просмотр</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
  },
  searchInfo: {
    fontSize: 16,
  },
  listContent: {
    padding: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userType: {
    fontSize: 14,
    marginTop: 2,
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
  },
})
