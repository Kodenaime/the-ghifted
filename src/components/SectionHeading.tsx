import { TextReveal } from "./TextReveal"
import { SparkleIcon } from "./icons"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  align?: "center" | "left"
  index?: string // Kept optional for backward-compatibility, but no longer rendered
}

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      {eyebrow ? (
        <p className={`eyebrow ${centered ? "justify-center" : ""}`}>
          <SparkleIcon className="h-4 w-4" />
          {eyebrow}
        </p>
      ) : (
        <SparkleIcon className={`mb-3 h-5 w-5 text-gold ${centered ? "mx-auto" : ""}`} />
      )}
      <h2 className="mt-3 font-display text-[32px] leading-[1.1] tracking-tight md:text-[44px]">
        <TextReveal segments={[{ text: title }]} />
      </h2>
    </div>
  )
}
