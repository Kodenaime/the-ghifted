type StarFieldProps = {
  className?: string
  tone?: "gold" | "champagne" | "light"
}

const tones = {
  gold: "#C9A24B",
  champagne: "#E2C787",
  light: "rgba(250,247,240,0.9)",
}

// Decorative line-art constellation + bell motif. Used only in the hero and the
// final CTA (the two "illustrated" moments from the brand direction).
export function StarField({ className, tone = "gold" }: StarFieldProps) {
  const c = tones[tone]
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M40 250 C 120 210, 140 140, 210 120"
        stroke={c}
        strokeWidth="1"
        strokeDasharray="3 6"
        opacity="0.5"
      />
      <path
        d="M210 120 C 260 108, 300 60, 360 40"
        stroke={c}
        strokeWidth="1"
        strokeDasharray="3 6"
        opacity="0.5"
      />
      <g stroke={c} strokeWidth="1.4" strokeLinecap="round">
        <path d="M210 120l3.5 9 9 3.5-9 3.5-3.5 9-3.5-9-9-3.5 9-3.5z" />
        <path d="M360 40l2.6 6.7 6.7 2.6-6.7 2.6-2.6 6.7-2.6-6.7-6.7-2.6 6.7-2.6z" />
        <path d="M40 250l2.4 6.2 6.2 2.4-6.2 2.4-2.4 6.2-2.4-6.2-6.2-2.4 6.2-2.4z" />
      </g>
      <circle cx="300" cy="150" r="2" fill={c} opacity="0.7" />
      <circle cx="120" cy="60" r="2" fill={c} opacity="0.7" />
      <circle cx="340" cy="210" r="1.6" fill={c} opacity="0.6" />
    </svg>
  )
}

// Ambient gold sparkle dots. The default abstract layer used lightly across sections.
export function SparkleDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 1l1.8 5.2L15 8l-5.2 1.8L8 15l-1.8-5.2L1 8l5.2-1.8z" />
    </svg>
  )
}
