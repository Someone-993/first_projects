import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface HomeScreenProps {
  navigation: any
}

const categories = ["Business names", "Human names", "Game names", "Pet names", "Dish names", "Character names"]

export default function HomeScreen({ navigation }: HomeScreenProps) {
  console.log("HomeScreen");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chatbot AI</Text>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.botContainer}>
          <View style={styles.botAvatar}>
            <Ionicons name="chatbubble" size={24} color="#8B5CF6" />
          </View>
          <View style={styles.botMessage}>
            <Text style={styles.botText}>Hi, you can ask me anything about names</Text>
          </View>
        </View>

        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Popular categories:</Text>
          <View style={styles.chipContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chip}
                onPress={() => navigation.navigate("Chat", { category })}
              >
                <Text style={styles.chipText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Generate a name of…" placeholderTextColor="#9CA3AF" />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color="#8B5CF6" />
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  botContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 24,
    marginBottom: 32,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  botMessage: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  botText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
  },
  suggestionsContainer: {
    marginBottom: 24,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chipText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  micButton: {
    padding: 8,
  },
})
