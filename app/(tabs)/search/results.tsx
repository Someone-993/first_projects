import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"

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

  if (!results || !results.items) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.searchInfo}>
          Найдено {results.total_count} пользователей по запросу "{searchTerm}"
        </Text>
      </View>

      {results.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Octicons name="search" size={50} color="#BDBDBD" />
          <Text style={styles.emptyText}>Пользователи не найдены</Text>
        </View>
      ) : (
        <FlatList
          data={results.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{item.login}</Text>
                <Text style={styles.userType}>{item.type}</Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
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
    backgroundColor: "#F5F5F5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  searchInfo: {
    fontSize: 16,
    color: "#616161",
  },
  listContent: {
    padding: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
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
    color: "#333333",
  },
  userType: {
    fontSize: 14,
    color: "#757575",
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: "#2196F3",
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
    color: "#757575",
    marginTop: 10,
  },
})
