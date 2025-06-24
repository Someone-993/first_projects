import { TouchableOpacity, Text } from "react-native"

interface SecondaryButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
}

export default function SecondaryButton({ title, onPress, disabled = false }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full h-12 rounded-lg border border-gray-300 items-center justify-center ${disabled ? "bg-gray-100" : "bg-white"}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-base font-semibold ${disabled ? "text-gray-400" : "text-gray-700"}`}>{title}</Text>
    </TouchableOpacity>
  )
}
