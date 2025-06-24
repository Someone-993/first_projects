import { useRef } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"

interface OtpInputProps {
  value: string[]
  onChange: (value: string[]) => void
  length: number
}

export default function OtpInput({ value, onChange, length }: OtpInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handleChangeText = (text: string, index: number) => {
    const newValue = [...value]
    newValue[index] = text
    onChange(newValue)

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <View className="flex-row justify-center space-x-4">
      {Array.from({ length }, (_, index) => (
        <TouchableOpacity
          key={index}
          className="w-16 h-16 border-2 border-gray-300 rounded-lg items-center justify-center bg-white"
          onPress={() => inputRefs.current[index]?.focus()}
        >
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref
            }}
            className="text-2xl font-bold text-gray-900 text-center w-full h-full"
            value={value[index] || ""}
            onChangeText={(text) => handleChangeText(text.slice(-1), index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}
