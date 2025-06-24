import { View, TextInput } from "react-native"

interface AuthInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric"
}

export default function AuthInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
}: AuthInputProps) {
  return (
    <View className="relative">
      <TextInput
        className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  )
}
