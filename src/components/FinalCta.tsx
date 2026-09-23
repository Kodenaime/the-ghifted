import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { FINAL_CTA } from "../lib/content"
import { StarField } from "./StarField"
import { TextReveal } from "./TextReveal"
import { Magnetic } from "./Magnetic"
import { useWaitlist } from "../lib/waitlist-context"
import { trackCta } from "../lib/analytics"
import { ArrowRight } from "./icons"

export function FinalCta() {
  const { open } = useWaitlist()
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()
  const yStars = useTransform(scrollY, [0, 500], [0, -60])

  return (
    <section
      className="relative overflow-hidden bg-pine text-ivory"
      aria-label="Ready to collaborate?"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pine to-forest" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,75,0.55), transparent 70%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-10 top-8 hidden w-[300px] opacity-70 lg:block"
        style={reduced ? undefined : { y: yStars }}
      >
        <StarField tone="champagne" className="w-full" />
      </motion.div>

      <div className="container-x relative py-24 text-center md:py-32">
        <h2 className="font-display text-[32px] leading-tight text-ivory md:text-[48px]">
          <TextReveal segments={[{ text: FINAL_CTA.title }]} />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ivory/80">
          {FINAL_CTA.body}
        </p>
        <p className="mt-3 text-sm text-champagne">{FINAL_CTA.note}</p>

        <div className="mt-9 flex justify-center">
          <Magnetic>
            <button
              type="button"
              onClick={() => {
                trackCta("final-cta")
                open()
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-gold px-8 py-4 text-base font-semibold text-forest transition-colors duration-200 hover:bg-champagne"
            >
              {FINAL_CTA.cta}
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
