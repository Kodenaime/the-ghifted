import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { BRAND, HERO, LINKS, NAV_LINKS } from "../lib/content"
import { trackCta } from "../lib/analytics"
import { scrollToTarget } from "../lib/smoothScroll"
import { useWaitlist } from "../lib/waitlist-context"
import { CloseIcon, MenuIcon, SparkleIcon } from "./icons"

export function Nav() {
  const { open } = useWaitlist()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y < 120) {
        setHidden(false)
      } else if (y > lastY + 6) {
        setHidden(true)
      } else if (y < lastY - 6) {
        setHidden(false)
      }
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isHidden = reduced ? false : hidden

  const openCta = () => {
    trackCta("nav")
    setMenuOpen(false)
    open()
  }

  const linkClass = scrolled
    ? "text-ink/70 hover:text-ink"
    : "text-ivory/80 hover:text-ivory"

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "glass border-b border-ink/5 text-ink"
            : "bg-transparent text-ivory"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget(0)
            }}
            className="inline-flex items-center gap-2 font-display text-xl tracking-tight"
          >
            <SparkleIcon className="h-4 w-4 text-gold" />
            {BRAND.wordmark}
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget(link.href)
                }}
                className={`text-sm font-medium transition-colors ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={LINKS.portfolio}
              target="_blank"
              rel="noreferrer"
              className={`text-sm font-medium transition-colors ${linkClass}`}
            >
              Portfolio
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCta}
              className={`hidden cursor-pointer items-center justify-center rounded-[12px] px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex ${
                scrolled
                  ? "bg-pine text-ivory hover:bg-forest"
                  : "bg-gold text-forest hover:bg-champagne"
              }`}
            >
              {HERO.cta}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors lg:hidden ${
                scrolled
                  ? "text-ink hover:bg-ink/5"
                  : "text-ivory hover:bg-ivory/10"
              }`}
            >
              {menuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="glass border-b border-ink/5 text-ink lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setMenuOpen(false)
                    scrollToTarget(link.href)
                  }}
                  className="rounded-[12px] px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={LINKS.portfolio}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="rounded-[12px] px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                Portfolio
              </a>
              <button
                type="button"
                onClick={openCta}
                className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-[12px] bg-pine px-5 py-3 text-base font-semibold text-ivory"
              >
                {HERO.cta}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
