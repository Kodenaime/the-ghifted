import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useReducedMotion } from "framer-motion"

export function SpinningLogo({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const width = container.clientWidth || 280
    const height = container.clientHeight || 280

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    container.appendChild(renderer.domElement)

    // Lighting Setup for luxury metallic rendering
    const ambientLight = new THREE.AmbientLight(0xfff4db, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfffaea, 3.2)
    keyLight.position.set(4, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x16412f, 1.8)
    fillLight.position.set(-4, -3, 2)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0xf7df94, 4.5, 20)
    rimLight.position.set(0, 3, -3)
    scene.add(rimLight)

    const specularLight = new THREE.PointLight(0xffffff, 2.0, 15)
    specularLight.position.set(-2, 2, 4)
    scene.add(specularLight)

    // Master Group
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Coin Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.5,
    })

    const darkForestMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e2e20,
      metalness: 0.4,
      roughness: 0.35,
    })

    const champagneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3e5ab,
      metalness: 0.92,
      roughness: 0.18,
    })

    // 1. Coin Rim & Body (Volumetric Cylinder with thickness)
    const coinGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.34, 64)
    coinGeometry.rotateX(Math.PI / 2)
    const coinMesh = new THREE.Mesh(coinGeometry, goldMaterial)
    masterGroup.add(coinMesh)

    // 2. Beveled Outer Ring (Inner milled edge)
    const outerRingGeometry = new THREE.TorusGeometry(1.98, 0.07, 16, 64)
    const outerRing = new THREE.Mesh(outerRingGeometry, champagneMaterial)
    outerRing.position.z = 0.17
    masterGroup.add(outerRing)

    const backRing = new THREE.Mesh(outerRingGeometry, champagneMaterial)
    backRing.position.z = -0.17
    masterGroup.add(backRing)

    // 3. Inner Inset Disks (Deep pine center on front and back)
    const insetGeometry = new THREE.CircleGeometry(1.9, 64)
    const frontInset = new THREE.Mesh(insetGeometry, darkForestMaterial)
    frontInset.position.z = 0.175
    masterGroup.add(frontInset)

    const backInset = new THREE.Mesh(insetGeometry, goldMaterial)
    backInset.position.z = -0.175
    backInset.rotateY(Math.PI)
    masterGroup.add(backInset)

    // 4. Extruded Monogram "G" Shape for Front Face
    const gShape = new THREE.Shape()
    // Outer arc of G
    gShape.absarc(0, 0, 1.35, 0.25 * Math.PI, 1.85 * Math.PI, false)
    // Draw inwards to form the crossbar of G
    gShape.lineTo(0.35, -0.95)
    gShape.lineTo(0.35, -0.05)
    gShape.lineTo(1.15, -0.05)
    gShape.lineTo(1.15, -0.55)
    gShape.lineTo(0.75, -0.55)
    gShape.lineTo(0.75, -0.4)
    gShape.lineTo(0.6, -0.4)
    gShape.lineTo(0.6, -0.8)
    // Inner arc of G
    gShape.absarc(0, 0, 0.92, 1.8 * Math.PI, 0.28 * Math.PI, true)
    gShape.closePath()

    const extrudeSettings = {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    }

    const gGeometry = new THREE.ExtrudeGeometry(gShape, extrudeSettings)
    gGeometry.center()
    const gMesh = new THREE.Mesh(gGeometry, champagneMaterial)
    gMesh.position.set(0, 0, 0.22)
    masterGroup.add(gMesh)

    // 5. Back Face Motif: Extruded Luxury 4-Point Sparkle Star
    const starShape = new THREE.Shape()
    const points = 4
    const outerR = 1.35
    const innerR = 0.32
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR
      const a = (i * Math.PI) / points
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      if (i === 0) starShape.moveTo(x, y)
      else starShape.lineTo(x, y)
    }
    starShape.closePath()

    const starGeometry = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    })
    starGeometry.center()
    const starMesh = new THREE.Mesh(starGeometry, darkForestMaterial)
    starMesh.position.set(0, 0, -0.22)
    starMesh.rotateY(Math.PI)
    masterGroup.add(starMesh)

    // Initial Pitch & Tilt so the 3D depth and thickness are immediately noticeable
    masterGroup.rotation.x = 0.22
    masterGroup.rotation.z = -0.1

    // Mouse Tracking for Parallax / Interactive Tilt
    let mouseX = 0
    let mouseY = 0
    let targetTiltX = 0.22
    let targetTiltY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
      const y = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)
      mouseX = x
      mouseY = y
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      if (!reduced) {
        // Continuous 3D rotation on Y-axis
        masterGroup.rotation.y += delta * 0.95

        // Smooth subtle bobbing up and down
        masterGroup.position.y = Math.sin(elapsed * 1.8) * 0.12

        // Smoothly interpolate towards mouse tilt
        targetTiltX = 0.22 + mouseY * 0.35
        targetTiltY = mouseX * 0.45

        masterGroup.rotation.x += (targetTiltX - masterGroup.rotation.x) * 0.05
        masterGroup.rotation.z += (-targetTiltY * 0.5 - masterGroup.rotation.z) * 0.05
      }

      renderer.render(scene, camera)
    }

    animate()

    // Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w > 0 && h > 0) {
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }
      }
    })
    ro.observe(container)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      ro.disconnect()

      coinGeometry.dispose()
      outerRingGeometry.dispose()
      insetGeometry.dispose()
      gGeometry.dispose()
      starGeometry.dispose()
      goldMaterial.dispose()
      darkForestMaterial.dispose()
      champagneMaterial.dispose()
      renderer.dispose()

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 md:h-80 md:w-80 ${className}`}
      aria-label="3D Rotating The Ghifted Medallion"
    >
      {/* Soft dynamic ground shadow */}
      <div
        className="pointer-events-none absolute -bottom-4 h-10 w-44 rounded-full bg-forest/40 blur-xl md:w-56"
        aria-hidden="true"
      />
    </div>
  )
}
