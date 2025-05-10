"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Define props type for the Model component
interface ModelProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

// Component to load and render the GLB model with auto-rotation
function Model(props: ModelProps) {
  const { scene } = useGLTF("/A_handsome_man_standi_0509133807_texture.glb")
  const modelRef = useRef<THREE.Group>(null)

  // Auto-rotate the model from right to left
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01 // Adjust speed as needed
    }
  })

  return <primitive ref={modelRef} object={scene} {...props} />
}

export function HeroCube() {
  const [useCSS, setUseCSS] = useState(true)

  useEffect(() => {
    // Keeping the state for potential future use, but defaulting to 3D model
    setUseCSS(false)
  }, [])

  return (
    <div className="h-[400px] w-[400px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 1.5, 2], fov: 45 }} // Adjusted for closer view
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <Model position={[0, 0, 0]} scale={[1, 1, 1]} /> {/* Adjusted scale and position */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}