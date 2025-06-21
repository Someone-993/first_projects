import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { router } from "expo-router"

export default function OnboardingScreen() {//не очень понимаю что происходит с images и как их правильно разместить. Также была проблема с другими имеджами. Оставил провальные варианты в проекте, а остальные заполнил плейсхолдерами
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.diamondGrid}>
            <View style={[styles.diamond, styles.diamond1]}>
              <Image source={{ uri: "/placeholder.svg?height=80&width=80" }} style={styles.avatarImage} />
            </View>
            <View style={[styles.diamond, styles.diamond2]}>
              <Image source={{ uri: "/placeholder.svg?height=80&width=80" }} style={styles.avatarImage} />
            </View>
            <View style={[styles.diamond, styles.diamond3]}>
              <Image source={require('../assets/images/pic1.png')} style={styles.avatarImage} />
            </View>
            <View style={[styles.diamond, styles.diamond4]}>
              <Image source={{ uri: "/placeholder.svg?height=80&width=80" }} style={styles.avatarImage} />
            </View>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Your One-Stop Name Solution</Text>
          <Text style={styles.description}>Simplify the process of finding the perfect and professional name</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/login")}>
            <Text style={styles.nextButtonText}>Next</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  diamondGrid: {
    width: 200,
    height: 200,
    position: "relative",
  },
  diamond: {
    width: 80,
    height: 80,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    overflow: "hidden",
  },
  diamond1: {
    top: 0,
    left: 60,
    backgroundColor: "#8B5CF6",
  },
  diamond2: {
    top: 60,
    left: 0,
    backgroundColor: "#8B5CF6",
  },
  diamond3: {
    top: 60,
    right: 0,
    backgroundColor: "#8B5CF6",
  },
  diamond4: {
    bottom: 0,
    left: 60,
    backgroundColor: "#8B5CF6",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    transform: [{ rotate: "-45deg" }],
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  nextButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
