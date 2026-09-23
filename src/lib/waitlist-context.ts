import { createContext, useContext } from "react"

export type WaitlistContextValue = {
  open: () => void
  close: () => void
}

export const WaitlistContext = createContext<WaitlistContextValue | null>(null)

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider")
  return ctx
}
