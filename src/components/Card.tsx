import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type CardProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className = "", delay = 0 }: CardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`glass-card h-full p-6 transition-shadow duration-300 hover:shadow-lift ${className}`}
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      {children}
    </motion.div>
  )
}
