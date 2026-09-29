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
            alt="The Ghifted creator collaboration"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-t from-pine via-pine/30 to-transparent lg:hidden" />
          <div className="absolute inset-0 hidden bg-linear-to-r from-transparent via-pine/30 to-pine lg:block" />
        </div>

        {/* Right Column: Brand title + campaign copy */}
        <div className="relative flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24 xl:px-20">
          <h1 className="font-display text-[42px] font-medium leading-[0.9] tracking-tight text-white sm:text-[52px] lg:text-[60px]">
            <span className="sr-only">{HERO.title}</span>
            <span aria-hidden="true" className="inline-flex flex-wrap">
              {titleLetters.map((char, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={`inline-block will-change-transform ${
                      char === " " ? "w-2 sm:w-3" : ""
                    }`}
                    initial={
                      reduced ? undefined : { y: "115%", opacity: 0 }
                    }
                    animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="eyebrow mt-6"
          >
            <SparkleIcon className="h-4 w-4" />
            {HERO.eyebrow}
          </motion.p>

          <h2 className="mt-3 font-display text-[20px] font-medium leading-tight text-ivory md:text-[30px]">
            {HERO.headline.map((segment, i) => (
              <span key={i}>
                {segment.text}
                {segment.highlight && (
                  <span className="text-gold">{segment.highlight}</span>
                )}
              </span>
            ))}
          </h2>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base text-ivory/80 md:text-lg"
          >
            {HERO.subcopy}
          </motion.p>

          <motion.ul
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6"
          >
            {HERO.bullets.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-ivory/90">
                <SparkleIcon className="h-3.5 w-3.5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => {
                  trackCta("hero")
                  open()
                }}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-[14px] bg-gold px-8 py-4 text-base font-semibold text-forest shadow-lift transition-colors duration-300 hover:bg-champagne"
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
