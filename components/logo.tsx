import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
  animationType?: "breathe" | "float" | "gentle" | "sleeping"
}

export function Logo({ size = "md", className = "", animated = false, animationType = "sleeping" }: LogoProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-32 h-32",
  }

  const animationMap = {
    breathe: "animate-breathe",
    float: "animate-float",
    gentle: "animate-gentle-breathe",
    sleeping: "animate-sleeping",
  }

  const animationClass = animated ? animationMap[animationType] : ""

  return (
    <div className={`relative ${sizeMap[size]} ${animationClass} ${className}`}>
      <Image src="/images/sleeping-lamb-logo.png" alt="The Sleepism logo" fill className="object-contain" priority />
    </div>
  )
}
