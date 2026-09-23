type PlausibleOptions = {
  props?: Record<string, string | number | boolean>
}

type PlausibleFn = (eventName: string, options?: PlausibleOptions) => void

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

// Logs a Plausible custom event for waitlist CTA clicks, tagged with the
// section it came from so the client can see which section converts best.
export function trackCta(section: string) {
  window.plausible?.("Waitlist CTA Click", { props: { section } })
}
