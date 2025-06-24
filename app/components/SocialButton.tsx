import { TouchableOpacity, Text } from "react-native"

interface SocialButtonProps {
  type: "google" | "apple" | "twitter"
  onPress?: () => void
}

export default function SocialButton({ type, onPress }: SocialButtonProps) {
  const getButtonContent = () => {
    switch (type) {
      case "google":
        return { text: "G", bgColor: "bg-white", textColor: "text-red-500" }
      case "apple":
        return { text: "", bgColor: "bg-black", textColor: "text-white" }
      case "twitter":
        return { text: "𝕏", bgColor: "bg-black", textColor: "text-white" }
      default:
        return { text: "", bgColor: "bg-gray-200", textColor: "text-gray-600" }
    }
  }

  const { text, bgColor, textColor } = getButtonContent()

  return (
    <TouchableOpacity
      className={`w-12 h-12 rounded-full border border-gray-300 items-center justify-center ${bgColor}`}
      onPress={onPress}
    >
      <Text className={`text-lg font-bold ${textColor}`}>{text}</Text>
    </TouchableOpacity>
  )
}
