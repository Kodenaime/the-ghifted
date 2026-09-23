import { motion, useReducedMotion } from "framer-motion"
import { HERO } from "../lib/content"
import { ArrowRight, SparkleIcon } from "./icons"
import { Magnetic } from "./Magnetic"
import { useWaitlist } from "../lib/waitlist-context"
import { trackCta } from "../lib/analytics"

export function Hero() {
  const { open } = useWaitlist()
  const reduced = useReducedMotion()

  const titleLetters = Array.from(HERO.title)

  return (
    <section id="top" className="relative overflow-hidden bg-pine text-ivory">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Column: Ambient Imagery */}
        <div className="relative h-96 lg:h-auto">
          <img
            src="/assets/images/IMG_6789.webp"
            alt="The Ghifted Creator collaboration"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/30 to-transparent lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-pine/30 to-pine lg:block" />
        </div>

        {/* Right Column: Editorial Typography & Animated Lettering */}
        <div className="relative flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-16 lg:py-28 xl:px-20">
          {/* Eyebrow */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow mb-6 text-sm"
          >
            <SparkleIcon className="h-4 w-4" />
            {HERO.eyebrow}
          </motion.div>

          {/* Grand Letter-by-Letter Animated Headline */}
          <h1 className="font-display text-[64px] font-medium leading-[0.88] tracking-tight sm:text-[88px] md:text-[104px] lg:text-[116px] xl:text-[124px]">
            <span className="sr-only">{HERO.title}</span>
            <span aria-hidden="true" className="inline-flex flex-wrap">
              {titleLetters.map((char, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={`inline-block will-change-transform ${
                      char === " " ? "w-3 sm:w-5 md:w-6" : ""
                    }`}
                    initial={
                      reduced
                        ? undefined
                        : { y: "115%", rotateZ: 4, opacity: 0 }
                    }
                    animate={
                      reduced
                        ? undefined
                        : { y: "0%", rotateZ: 0, opacity: 1 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: 0.15 + i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-lg text-ivory/85 sm:text-xl leading-relaxed"
          >
            {HERO.subtitle}
          </motion.p>

          {/* Key campaign badges filling up space */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm"
          >
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-champagne backdrop-blur-sm">
              Instagram + TikTok Co-Post
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-champagne backdrop-blur-sm">
              3 Months Paid Ad Rights
            </span>
            <span className="rounded-full border border-gold/40 bg-gold/20 px-4 py-1.5 font-semibold text-gold backdrop-blur-sm">
              ₦100,000 Special Rate
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => {
                  trackCta("hero")
                  open()
                }}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-[14px] bg-gold px-8 py-4 text-base font-semibold text-forest shadow-lift transition-all duration-300 hover:bg-champagne hover:scale-105 active:scale-98"
              >
                {HERO.cta}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
