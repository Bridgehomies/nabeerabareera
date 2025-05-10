"use client"

import { useEffect, useRef, useState } from "react"

export function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if we're in a browser environment and if it's not a touch-only device
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsSupported(true)

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      }

      const handleMouseLeave = () => {
        setIsVisible(false)
      }

      window.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Don't render anything if custom cursor is not supported
  if (!isSupported) return null

  return (
    <div
      ref={followerRef}
      className="fixed w-8 h-8 border-2 border-black bg-transparent rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
      }}
    />
  )
}
