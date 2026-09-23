import { useEffect, useRef } from "react"
import gsap from "gsap"
import { LOGOS } from "../lib/content"
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion"
import { SparkleIcon } from "./icons"

type Logo = (typeof LOGOS)[number]

function LogoItem({ logo }: { logo: Logo }) {
  const src = `/assets/logos/${encodeURI(logo.file)}`
  return (
    <div className="flex h-36 sm:h-40 md:h-44 shrink-0 items-center justify-center px-6 sm:px-10 md:px-14">
      <img
        src={src}
        alt={logo.name}
        loading="lazy"
        className="h-24 sm:h-28 md:h-32 w-auto max-w-[240px] sm:max-w-[280px] md:max-w-[320px] object-contain filter drop-shadow-sm transition-all"
      />
    </div>
  )
}

export function LogoMarquee() {
  const reduced = usePrefersReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return

    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 36,
      ease: "none",
    })

    return () => {
      tween.kill()
    }
  }, [reduced])

  return (
    <section
      className="border-y border-ink/5 bg-cream/50 py-12 sm:py-16 md:py-24"
      aria-label="Brands I've collaborated with"
    >
      <div className="container-x mb-8 sm:mb-12 text-center">
        <p className="eyebrow justify-center text-sm md:text-base">
          <SparkleIcon className="h-4 w-4" />
          Brands I've Worked With
        </p>
        <p className="mt-2 text-xs sm:text-sm text-muted">
          Over 18+ leading beauty, fashion, and lifestyle brands
        </p>
      </div>

      {reduced ? (
        <div className="container-x flex flex-wrap justify-center gap-x-10 sm:gap-x-14 gap-y-8 sm:gap-y-10">
          {LOGOS.map((logo) => (
            <LogoItem key={logo.file} logo={logo} />
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden">
          {/* Subtle side gradient fades: small on mobile so logos are fully visible, wider on desktop */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 sm:w-16 md:w-36 bg-gradient-to-r from-ivory via-ivory/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 sm:w-16 md:w-36 bg-gradient-to-l from-ivory via-ivory/80 to-transparent" />

          <div ref={trackRef} className="flex w-max items-center">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <LogoItem key={`${logo.file}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
