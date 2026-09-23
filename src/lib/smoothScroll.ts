import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

const NAV_OFFSET = -88

export function initSmoothScroll() {
  if (lenis) return lenis

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  })

  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => lenis!.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroySmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: NAV_OFFSET })
    return
  }

  if (typeof target === "number") {
    window.scrollTo({ top: Math.max(0, target + NAV_OFFSET), behavior: "smooth" })
    return
  }

  const el = document.querySelector(target)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}
