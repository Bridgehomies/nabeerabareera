"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"


type AnimatedButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "accent" | "white"
  animation?: "bounce" | "shake" | "glitch" | "rotate" | "pulse" | "wobble" | "fly"
  className?: string
  size?: "sm" | "md" | "lg"
  iconPosition?: "left" | "right" | "none"
  icon?: React.ReactNode
}

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  animation = "bounce",
  className = "",
  size = "md",
  iconPosition = "right",
  icon,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const baseStyles =
    "relative group font-bold text-center cursor-pointer transform transition-all duration-300 uppercase flex items-center justify-center overflow-hidden"

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  }

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-secondary text-black hover:bg-secondary-hover",
    outline: "bg-white text-primary hover:bg-primary hover:text-white",
    accent: "bg-accent text-white hover:bg-accent-hover",
    white: "bg-white text-black hover:bg-black hover:text-white",
  }

  const animationStyles = {
    bounce: isHovered ? "transform scale-110" : "",
    shake: isHovered ? "animate-shake" : "",
    glitch: isHovered ? "animate-glitch" : "",
    rotate: isHovered ? "rotate-3" : "",
    pulse: isHovered ? "animate-pulse" : "",
    wobble: isHovered ? "animate-wobble" : "",
    fly: isHovered ? "animate-fly" : "",
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
  }
  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  // Add doodle effect on hover
  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const addDoodle = () => {
      const doodle = document.createElement("span")
      doodle.className = "absolute inline-block rounded-full bg-white opacity-70"

      const size = Math.random() * 10 + 5
      doodle.style.width = `${size}px`
      doodle.style.height = `${size}px`

      doodle.style.top = `${Math.random() * 100}%`
      doodle.style.left = `${Math.random() * 100}%`

      button.appendChild(doodle)

      setTimeout(() => {
        doodle.remove()
      }, 1000)
    }

    let interval: NodeJS.Timeout
    if (isHovered) {
      interval = setInterval(addDoodle, 200)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isHovered])

  

  const buttonContent = (
    <>
      {/* Diagonal cut corners */}
      <span className="absolute top-0 left-0 w-4 h-4 bg-background transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
      <span className="absolute top-0 right-0 w-4 h-4 bg-background transform translate-x-1/2 -translate-y-1/2 rotate-45"></span>
      <span className="absolute bottom-0 left-0 w-4 h-4 bg-background transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
      <span className="absolute bottom-0 right-0 w-4 h-4 bg-background transform translate-x-1/2 translate-y-1/2 rotate-45"></span>

      {/* Button content with border */}
      <span
        className={`
        block ${variantStyles[variant]} ${animationStyles[animation]} ${className} 
        transition-all duration-300 z-10 border-4 border-dashed
        ${
          variant === "primary"
            ? "border-primary-dark"
            : variant === "secondary"
              ? "border-secondary-dark"
              : variant === "accent"
                ? "border-accent-dark"
                : "border-gray-800"
        }
        ${sizeStyles[size]}
      `}
      >
        
        {children}
        
      </span>

      {/* Background shadow */}
      <span
        className={`
        absolute inset-0 ${
          variant === "primary"
            ? "bg-primary-dark"
            : variant === "secondary"
              ? "bg-secondary-dark"
              : variant === "accent"
                ? "bg-accent-dark"
                : "bg-gray-800"
        } transform translate-x-2 translate-y-2 -z-10
      `}
      ></span>
    </>
  )

  if (href) {
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ transform: isPressed ? "translate(2px, 2px)" : "translate(0, 0)" }}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ transform: isPressed ? "translate(2px, 2px)" : "translate(0, 0)" }}
    >
      {buttonContent}
    </button>
  )
}