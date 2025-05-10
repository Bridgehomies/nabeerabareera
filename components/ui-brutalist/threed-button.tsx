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
}

export function ThreeDButton({ children, href, onClick, variant = "default", className = "" }: ThreeDButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const baseStyles =
    "relative inline-flex font-bold text-center cursor-pointer px-6 py-3 transform transition-transform active:translate-y-1 active:translate-x-1 uppercase items-center justify-center"

  const variantStyles = {
    default: "bg-black text-white border-4 border-black hover:bg-red-600 hover:border-red-600",
    outline: "bg-white text-black border-4 border-black hover:bg-gray-100",
    white: "bg-white text-black border-4 border-white hover:bg-gray-100",
  }

  const shadowColor = variant === "white" ? "bg-gray-400" : "bg-black"

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  const buttonContent = (
    <>
      <span className={`${shadowColor} absolute top-2 left-2 w-full h-full -z-10`}></span>
      <span className={`block ${variantStyles[variant]} ${className}`}>{children}</span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseStyles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
        style={{ transform: isPressed ? "translate(2px, 2px)" : "translate(0, 0)" }}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={baseStyles}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      style={{ transform: isPressed ? "translate(2px, 2px)" : "translate(0, 0)" }}
    >
      {buttonContent}
    </button>
  )
}
