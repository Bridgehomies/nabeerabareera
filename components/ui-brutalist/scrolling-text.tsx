"use client"

import { useEffect, useRef } from "react"

type ScrollingTextProps = {
  messages: string[]
  speed?: number
}

export function ScrollingText({ messages, speed = 50 }: ScrollingTextProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollContent = scrollContainer.querySelector("div")
    if (!scrollContent) return

    let position = 0
    const scrollWidth = scrollContent.offsetWidth

    const scroll = () => {
      position--
      if (position <= -scrollWidth / 2) {
        position = 0
      }

      scrollContent.style.transform = `translateX(${position}px)`
      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [messages])

  // Create repeated messages to ensure seamless scrolling
  const repeatedMessages = [...messages, ...messages]

  return (
    <div ref={scrollRef} className="bg-black text-white py-3 overflow-hidden border-t-4  border-white">
      <div className="whitespace-nowrap inline-block">
        {repeatedMessages.map((message, index) => (
          <span key={index} className="text-xl font-bold uppercase mx-8">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
