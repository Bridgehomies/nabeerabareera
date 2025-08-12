"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

type ThreeDButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "default" | "outline" | "white"
  className?: string
  disabled?: boolean
}

export function ThreeDButton({ children, href, onClick, variant = "default", className = "", disabled = false }: ThreeDButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const baseStyles =
    "relative inline-flex font-bold text-center cursor-pointer px-6 py-3 uppercase items-center justify-center transition-transform duration-100"

  const variantStyles = {
    default: "bg-black text-white border-4 border-black hover:bg-red-600 hover:border-red-600",
    outline: "bg-white text-black border-4 border-black hover:bg-gray-100",
    white: "bg-white text-black border-4 border-white hover:bg-gray-100",
  }

  const shadowStyles = {
    default: isPressed ? "box-shadow: 2px 2px 0 0 #000" : "box-shadow: 4px 4px 0 0 #000",
    outline: isPressed ? "box-shadow: 2px 2px 0 0 #000" : "box-shadow: 4px 4px 0 0 #000",
    white: isPressed ? "box-shadow: 2px 2px 0 0 #4B5563" : "box-shadow: 4px 4px 0 0 #4B5563",
  }

  const handleMouseDown = () => !disabled && setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${shadowStyles[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
        style={{ transform: isPressed ? "translate(2px, 2px)" : "translate(0, 0)" }}
      >
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      style={{ transform: isPressed ? "translate(2px, 2px)" : "translate(0, 0)" }}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  )
}