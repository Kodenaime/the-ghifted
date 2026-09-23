import { useEffect } from "react"
import { destroySmoothScroll, initSmoothScroll } from "../lib/smoothScroll"

export function SmoothScroll() {
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return null
}
