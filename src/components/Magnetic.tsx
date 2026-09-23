import { useRef, useState, type MouseEvent, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: MouseEvent) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    })
  }

  const onMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
