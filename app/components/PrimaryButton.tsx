import { TouchableOpacity, Text, View } from "react-native"

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  showArrow?: boolean
  disabled?: boolean
}

export default function PrimaryButton({ title, onPress, showArrow = false, disabled = false }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full h-12 rounded-lg flex-row items-center justify-center ${
        disabled ? "bg-gray-300" : "bg-blue-600"
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-base font-semibold ${disabled ? "text-gray-500" : "text-white"}`}>{title}</Text>
      {showArrow && (
        <View className="ml-2">
          <Text className="text-white text-sm font-bold">→</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}
