"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { useTheme } from "../../contexts/ThemeContext"

interface GitHubUserDetails {
  login: string
  id: number
  avatar_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  type: string
}

export default function ProfileScreen() {
  const { colors } = useTheme()
  const { userLogin, userAvatar, userType, userId } = useLocalSearchParams<{
    userLogin: string
    userAvatar: string
    userType: string
    userId: string
  }>()

  const [userDetails, setUserDetails] = useState<GitHubUserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (userLogin) {
      fetchUserDetails()
    }
  }, [userLogin])

  const fetchUserDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.github.com/users/${userLogin}`)
      const data = await response.json()

      if (response.ok) {
        setUserDetails(data)
      } else {
        setError("Не удалось загрузить информацию о пользователе")
      }
    } catch (err) {
      setError("Произошла ошибка при загрузке данных")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Загрузка профиля...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Octicons name="alert" size={50} color={colors.textSecondary} />
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>{error}</Text>
        <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.primary }]} onPress={fetchUserDetails}>
          <Text style={styles.retryButtonText}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!userDetails) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>Пользователь не найден</Text>
      </View>
    )
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={{ uri: userDetails.avatar_url }} style={[styles.avatar, { borderColor: colors.primary }]} />
        <Text style={[styles.name, { color: colors.text }]}>{userDetails.name || userDetails.login}</Text>
        <Text style={[styles.username, { color: colors.textSecondary }]}>@{userDetails.login}</Text>
        <View style={[styles.typeContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.typeText}>{userDetails.type}</Text>
        </View>
      </View>

      {userDetails.bio && (
        <View style={[styles.bioContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.bio, { color: colors.text }]}>{userDetails.bio}</Text>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{userDetails.public_repos}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Репозитории</Text>
        </View>
        <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{userDetails.followers}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Подписчики</Text>
        </View>
        <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{userDetails.following}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Подписки</Text>
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Информация</Text>

        {userDetails.company && (
          <View style={styles.infoRow}>
            <Octicons name="organization" size={16} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{userDetails.company}</Text>
          </View>
        )}

        {userDetails.location && (
          <View style={styles.infoRow}>
            <Octicons name="location" size={16} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{userDetails.location}</Text>
          </View>
        )}

        {userDetails.blog && (
          <View style={styles.infoRow}>
            <Octicons name="link" size={16} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{userDetails.blog}</Text>
          </View>
        )}

        {userDetails.email && (
          <View style={styles.infoRow}>
            <Octicons name="mail" size={16} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{userDetails.email}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Octicons name="calendar" size={16} color={colors.primary} />
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Присоединился {formatDate(userDetails.created_at)}
          </Text>
        </View>
      </View>
    </ScrollView>
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
    padding: 20,
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
  },
  typeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  bioContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  infoCard: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  retryButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
})
