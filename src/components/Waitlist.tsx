import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { LINKS } from "../lib/content"
import { startScroll, stopScroll } from "../lib/smoothScroll"
import { WaitlistContext } from "../lib/waitlist-context"
import { CloseIcon, ExternalLinkIcon } from "./icons"

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <WaitlistContext.Provider value={{ open, close }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={close} />
    </WaitlistContext.Provider>
  )
}

function WaitlistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    stopScroll()
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = ""
      startScroll()
      previouslyFocused?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Join the waitlist"
            tabIndex={-1}
            className="relative w-full max-w-lg overflow-hidden rounded-[20px] bg-white shadow-lift outline-none"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  Special Holiday Collaboration
                </p>
                <h2 className="mt-1 font-display text-2xl text-ink">
                  Join the waitlist
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-ivory hover:text-ink"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {LINKS.googleForm ? (
                <iframe
                  src={LINKS.googleForm}
                  title="Holiday collaboration waitlist form"
                  className="h-[520px] w-full rounded-[12px] border border-ink/10 bg-ivory"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-[360px] w-full flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed border-ink/15 bg-ivory p-8 text-center">
                  <span className="text-gold">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                    </svg>
                  </span>
                  <p className="font-display text-xl text-ink">
                    The waitlist form is on its way.
                  </p>
                  <p className="max-w-xs text-sm text-muted">
                    The Google Form link will be dropped in here once it's ready.
                    This spot is already wired up.
                  </p>
                </div>
              )}

              {LINKS.googleForm && (
                <a
                  href={LINKS.googleForm}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-pine underline-offset-4 hover:underline"
                >
                  Trouble loading the form? Open it directly
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
