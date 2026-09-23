import { motion, useReducedMotion } from "framer-motion"

export type RevealSegment = { text: string; highlight?: boolean }

type TextRevealProps = {
  segments: RevealSegment[]
  className?: string
  delay?: number
  stagger?: number
}

// Splits copy into words and reveals each word by sliding it up through an
// overflow mask, word-by-word, as it scrolls into view.
export function TextReveal({
  segments,
  className = "",
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const reduced = useReducedMotion()

  const tokens = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, highlight: !!seg.highlight })),
  )

  return (
    <span className={className}>
      {tokens.map((token, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${
              token.highlight ? "italic text-champagne" : ""
            }`}
            initial={reduced ? undefined : { y: "110%" }}
            whileInView={reduced ? undefined : { y: 0 }}
            viewport={{ margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {token.word}
            {i < tokens.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
