import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

export type CursorTheme = "dark" | "light"

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [isTouch] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  )
  const [visible, setVisible] = useState(false)
  const [theme, setTheme] = useState<CursorTheme>("dark")
  const [label, setLabel] = useState<string | null>(null)
  const [isPointer, setIsPointer] = useState(false)

  // Direct mouse coordinates for precision dot
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring smoothed coordinates for trailing follower ring / aura
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (isTouch) return

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      if (!target) return

      // 1. Detect section theme (Dark or Light)
      const themeSection = target.closest<HTMLElement>("[data-cursor-theme]")
      if (themeSection) {
        const t = themeSection.getAttribute("data-cursor-theme") as CursorTheme
        if (t === "dark" || t === "light") {
          setTheme(t)
        }
      }

      // 2. Detect contextual badge label (e.g. PLAY, EXPLORE, brand name)
      const labeledEl = target.closest<HTMLElement>("[data-cursor-label]")
      if (labeledEl) {
        setLabel(labeledEl.getAttribute("data-cursor-label"))
      } else {
        setLabel(null)
      }

      // 3. Detect standard interactive clickable elements
      const clickable = target.closest("a, button, [role='button'], input, select, textarea, details")
      setIsPointer(Boolean(clickable))
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [mouseX, mouseY, visible, isTouch])

  if (isTouch || reduced || !visible) return null

  const isDarkMode = theme === "dark"

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* Precision Center Dot */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`h-2 w-2 rounded-full transition-all duration-200 ${
            label
              ? "opacity-0 scale-0"
              : isDarkMode
              ? "bg-champagne shadow-[0_0_8px_rgba(226,199,135,0.9)]"
              : "bg-pine"
          } ${isPointer ? "scale-150" : "scale-100"}`}
        />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* Trailing Interactive Follower / Aura */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 flex items-center justify-center rounded-full"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {label ? (
          /* Contextual Action Badge (Over Videos, Logos, Cards) */
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-lift backdrop-blur-md ${
              isDarkMode
                ? "bg-gold text-forest border border-champagne"
                : "bg-pine text-ivory border border-gold/40"
            }`}
          >
            <span>{label}</span>
          </motion.div>
        ) : isDarkMode ? (
          /* Mode 1: Luminous Celestial Gold Halo (for Dark Sections: Hero, Final CTA, Footer) */
          <div
            className={`rounded-full transition-all duration-300 ${
              isPointer
                ? "h-16 w-16 border-2 border-gold/80 bg-gold/20 shadow-[0_0_30px_rgba(201,162,75,0.45)] backdrop-blur-[2px]"
                : "h-10 w-10 border border-gold/50 bg-gold/10 shadow-[0_0_20px_rgba(201,162,75,0.25)]"
            }`}
          />
        ) : (
          /* Mode 2: Precision Editorial Ring (for Light Sections: Fit, Included, Past Work, etc.) */
          <div
            className={`rounded-full transition-all duration-300 ${
              isPointer
                ? "h-12 w-12 border-2 border-pine/60 bg-pine/10 scale-110"
                : "h-8 w-8 border border-ink/25 bg-transparent"
            }`}
          />
        )}
      </motion.div>
    </div>
  )
}
