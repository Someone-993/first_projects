import { TouchableOpacity, Text, View } from "react-native"

interface CheckBoxProps {
  checked: boolean
  onPress: () => void
  label: string
}

export default function CheckBox({ checked, onPress, label }: CheckBoxProps) {
  return (
    <TouchableOpacity className="flex-row items-center" onPress={onPress}>
      <View
        className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
          checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
        }`}
      >
        {checked && <Text className="text-white text-xs font-bold">✓</Text>}
      </View>
      <Text className="text-sm text-gray-700">{label}</Text>
    </TouchableOpacity>
  )
}
