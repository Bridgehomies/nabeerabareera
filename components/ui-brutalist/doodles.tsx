"use client"

import { useEffect, useState } from "react"

export function CircleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40C5 59.33 20.67 75 40 75Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 8"
      />
      <path
        d="M40 65C53.807 65 65 53.807 65 40C65 26.193 53.807 15 40 15C26.193 15 15 26.193 15 40C15 53.807 26.193 65 40 65Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
    </svg>
  )
}

export function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 5L35.5 20.5H52L38.5 30L44 45.5L30 35.5L16 45.5L21.5 30L8 20.5H24.5L30 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ZigzagDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="120"
      height="20"
      viewBox="0 0 120 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15C10 5 15 15 20 5C25 15 30 5 35 15C40 5 45 15 50 5C55 15 60 5 65 15C70 5 75 15 80 5C85 15 90 5 95 15C100 5 105 15 110 5C115 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="80"
      height="20"
      viewBox="0 0 80 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H70M70 10L60 5M70 10L60 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CrossDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10L30 30M30 10L10 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SquiggleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="100"
      height="30"
      viewBox="0 0 100 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15C10 5 15 25 20 15C25 5 30 25 35 15C40 5 45 25 50 15C55 5 60 25 65 15C70 5 75 25 80 15C85 5 90 25 95 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DotsDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`doodle ${className}`}
      width="80"
      height="20"
      viewBox="0 0 80 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="3" fill="currentColor" />
      <circle cx="25" cy="10" r="3" fill="currentColor" />
      <circle cx="40" cy="10" r="3" fill="currentColor" />
      <circle cx="55" cy="10" r="3" fill="currentColor" />
      <circle cx="70" cy="10" r="3" fill="currentColor" />
    </svg>
  )
}

export function RandomDoodles({ count = 5 }: { count?: number }) {
  const [doodles, setDoodles] = useState<JSX.Element[]>([])

  useEffect(() => {
    const doodleComponents = [
      CircleDoodle,
      StarDoodle,
      ZigzagDoodle,
      ArrowDoodle,
      CrossDoodle,
      SquiggleDoodle,
      DotsDoodle,
    ]

    const newDoodles = []
    for (let i = 0; i < count; i++) {
      const DoodleComponent = doodleComponents[Math.floor(Math.random() * doodleComponents.length)]
      const top = Math.random() * 100
      const left = Math.random() * 100
      const rotation = Math.random() * 360
      const scale = 0.5 + Math.random() * 1.5

      newDoodles.push(
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${rotation}deg) scale(${scale})`,
            zIndex: 1,
            opacity: 0.7,
          }}
        >
          <DoodleComponent className="text-accent" />
        </div>,
      )
    }
    setDoodles(newDoodles)
  }, [count])

  return <div className="doodle-container absolute inset-0 overflow-hidden">{doodles}</div>
}

export function DoodleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      <RandomDoodles count={20} />
    </div>
  )
}
