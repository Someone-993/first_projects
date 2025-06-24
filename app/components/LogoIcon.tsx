import { Image } from "react-native"

interface LogoIconProps {
  size?: number
}

export default function LogoIcon({size = 100 }: LogoIconProps) {
  return (
    <Image
      source={require("../../assets/adaptive-icon.png")}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}
