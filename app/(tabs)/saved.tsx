import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const historyItems = [
  {
    id: "1",
    question: "Give me random names.",
    answer: 'How about "Serendipity"? It evokes elegance and...',
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    question: "Give me random names.",
    answer: 'Best choice would be "Serendipity"? It evokes elegance and...',
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    question: "Give me random names.",
    answer: 'How about "Serendipity"? It evokes elegance and...',
    timestamp: "1 day ago",
  },
  {
    id: "4",
    question: "Give me random names.",
    answer: 'How about "Serendipity"? It evokes elegance and...',
    timestamp: "2 days ago",
  },
  {
    id: "5",
    question: "Give me random names.",
    answer: 'How about "Serendipity"? It evokes elegance and...',
    timestamp: "3 days ago",
  },
  {
    id: "6",
    question: "Give me random names.",
    answer: 'How about "Serendipity"? It evokes elegance and...',
    timestamp: "1 week ago",
  },
]

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conversation History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {historyItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.historyItem}>
            <View style={styles.itemContent}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingTop: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
