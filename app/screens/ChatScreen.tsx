"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface ChatScreenProps {
  navigation: any
  route?: any
}

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function ChatScreen({ navigation, route }: ChatScreenProps) {
  console.log("ChatScreen");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi, you can ask me anything about names",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isBot: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputText("")
      setIsGenerating(true)

      setTimeout(() => {
        const botMessage: Message = {//я сделал одинаковый вывод для каждого запроса. Надеюсь что не серьезная ошибка :3
          id: (Date.now() + 1).toString(),
          text: `Here are some great name suggestions for "${inputText}":\n\n1. VentureQuest - It evokes elegance and has a business quality. If you'd like more suggestions, let me know your preferences. Feel free to let me know if you'd like suggestions or if there's anything specific you'd like me to focus on.`,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsGenerating(false)
      }, 2000)
    }
  }

  const stopGenerating = () => {
    setIsGenerating(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chatbot AI</Text>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isBot ? styles.botMessageContainer : styles.userMessageContainer,
              ]}
            >
              {message.isBot && (
                <View style={styles.botAvatar}>
                  <Ionicons name="chatbubble" size={16} color="#8B5CF6" />
                </View>
              )}
              <View style={[styles.messageBubble, message.isBot ? styles.botBubble : styles.userBubble]}>
                <Text style={[styles.messageText, message.isBot ? styles.botText : styles.userText]}>
                  {message.text}
                </Text>
                {message.isBot && (
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons name="copy-outline" size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          {isGenerating && (
            <View style={styles.generatingContainer}>
              <TouchableOpacity style={styles.stopButton} onPress={stopGenerating}>
                <Text style={styles.stopButtonText}>Stop generating</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Generate a name of…"
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  botMessageContainer: {
    alignItems: "flex-start",
  },
  userMessageContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    position: "relative",
  },
  botBubble: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#8B5CF6",
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: "#1F2937",
  },
  userText: {
    color: "#FFFFFF",
  },
  copyButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
  },
  generatingContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  stopButton: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stopButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
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
    alignItems: "flex-end",
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#1F2937",
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
})
