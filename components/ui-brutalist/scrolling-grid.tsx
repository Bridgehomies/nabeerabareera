"use client"

import { useEffect, useRef, useState } from "react"

export function ScrollingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        setHasError(true)
        return
      }

      // Set canvas dimensions
      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      handleResize()
      window.addEventListener("resize", handleResize)

      // Draw grid
      const gridSize = 50
      let offset = 0

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Set grid style
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1

        // Calculate center of canvas
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Draw vertical lines, centered
        for (
          let x = centerX - offset % gridSize;
          x > -gridSize && x < canvas.width + gridSize;
          x += gridSize
        ) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        // Draw horizontal lines, centered
        for (
          let y = centerY - offset % gridSize;
          y > -gridSize && y < canvas.height + gridSize;
          y += gridSize
        ) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Increase offset for animation
        offset += 0.5
        if (offset > gridSize * 2) offset = 0

        requestAnimationFrame(animate)
      }

      const animationId = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener("resize", handleResize)
      }
    } catch (error) {
      setHasError(true)
      console.error("Error in ScrollingGrid:", error)
    }
  }, [])

  // If there's an error, render a static grid background instead
  if (hasError) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          backgroundPosition: "center", // Center the static grid
        }}
      />
    )
  }

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}