import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FIT, LINKS } from "../lib/content"
import { useWaitlist } from "../lib/waitlist-context"
import { trackCta } from "../lib/analytics"
import { ArrowRight, SparkleIcon } from "./icons"

gsap.registerPlugin(ScrollTrigger)

type CategoryConfig = {
  name: "Beauty" | "Fashion" | "Lifestyle"
  tagline: string
  bg: string
  textColor: string
  subTextColor: string
  badgeBg: string
  pillBg: string
  btnClass: string
  imageSrc: string
  imageAlt: string
  showcaseLabel: string
}

const CATEGORIES: CategoryConfig[] = [
  {
    name: "Beauty",
    tagline:
      "High-impact beauty storytelling crafted to highlight product textures, effortless application, and transformative routines that convert viewers into loyal customers.",
    bg: "bg-[#16412f]",
    textColor: "text-[#faf7f0]",
    subTextColor: "text-[#faf7f0]/80",
    badgeBg: "bg-[#c9a24b] text-[#0e2e20]",
    pillBg: "bg-[#faf7f0]/12 text-[#faf7f0] border border-[#faf7f0]/15",
    btnClass: "bg-[#c9a24b] text-[#0e2e20] hover:bg-[#e2c787]",
    imageSrc: "/assets/images/beauty.jpg",
    imageAlt: "Editorial beauty and skincare products collaboration",
    showcaseLabel: "Beauty & Skincare Campaign",
  },
  {
    name: "Fashion",
    tagline:
      "Elevated seasonal styling, on-body lookbooks, and authentic creator reviews that turn your garments, footwear, and accessories into must-have wardrobe staples.",
    bg: "bg-[#8a6b2f]",
    textColor: "text-[#faf7f0]",
    subTextColor: "text-[#faf7f0]/80",
    badgeBg: "bg-[#faf7f0] text-[#8a6b2f]",
    pillBg: "bg-[#faf7f0]/12 text-[#faf7f0] border border-[#faf7f0]/15",
    btnClass: "bg-[#c9a24b] text-[#0e2e20] hover:bg-[#e2c787]",
    imageSrc: "/assets/images/fashion.jpg",
    imageAlt: "Editorial fashion styling lookbook collaboration",
    showcaseLabel: "Fashion & Lookbook Campaign",
  },
  {
    name: "Lifestyle",
    tagline:
      "Immersive visual storytelling for hospitality, dining, consumer products, and experiences that seamlessly integrate into premium modern lifestyle routines.",
    bg: "bg-[#a23b3b]",
    textColor: "text-[#faf7f0]",
    subTextColor: "text-[#faf7f0]/80",
    badgeBg: "bg-[#faf7f0] text-[#7c292c]",
    pillBg: "bg-[#faf7f0]/12 text-[#faf7f0] border border-[#faf7f0]/15",
    btnClass: "bg-[#faf7f0] text-[#7c292c] hover:bg-[#f2ebdd]",
    imageSrc: "/assets/images/lifestyle.jpg",
    imageAlt: "Boutique hospitality and lifestyle dining collaboration",
    showcaseLabel: "Lifestyle & Hospitality Feature",
  },
]

export function FitSection() {
  const { open } = useWaitlist()
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const pinSectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const itemsPerCategory = FIT.categories

  useLayoutEffect(() => {
    const pinSection = pinSectionRef.current
    const cardsContainer = cardsContainerRef.current
    if (!pinSection || !cardsContainer) return

    const cards = Array.from(cardsContainer.querySelectorAll<HTMLElement>(".stacked-card"))
    if (cards.length < 3) return

    // Set initial card transforms across all screen sizes
    // Card 0 (Beauty) in view; Cards 1 (Fashion) and 2 (Lifestyle) start below
    gsap.set(cards[0], { yPercent: 0, opacity: 1, zIndex: 10 })
    gsap.set(cards[1], { yPercent: 110, opacity: 1, zIndex: 20 })
    gsap.set(cards[2], { yPercent: 110, opacity: 1, zIndex: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        pin: true,
        start: "top top",
        end: "+=220%",
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          if (p < 0.35) {
            setActiveCategoryIndex(0)
          } else if (p < 0.72) {
            setActiveCategoryIndex(1)
          } else {
            setActiveCategoryIndex(2)
          }
        },
      },
    })

    scrollTriggerRef.current = tl.scrollTrigger ?? null

    // Card 1 (Fashion) slides up from bottom to top over Beauty
    tl.to(cards[1], {
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut",
    }, 0.2)

    // Card 2 (Lifestyle) slides up from bottom to top over Fashion
    tl.to(cards[2], {
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut",
    }, 1.4)

    return () => {
      tl.kill()
      if (tl.scrollTrigger) tl.scrollTrigger.kill()
    }
  }, [])

  const handleTabClick = (targetIndex: number) => {
    setActiveCategoryIndex(targetIndex)
    const st = scrollTriggerRef.current
    if (st) {
      const targetProgress = targetIndex / (CATEGORIES.length - 1)
      const scrollPos = st.start + targetProgress * (st.end - st.start)
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      ref={pinSectionRef}
      id="fit"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-ivory py-4 sm:py-6 md:py-12"
      aria-label="Is your brand a fit?"
    >
      <div className="container-x w-full">
        {/* Compact Section Heading for Mobile */}
        <div className="mb-3 sm:mb-6 md:mb-10 text-center">
          <p className="eyebrow justify-center text-xs sm:text-sm">
            <SparkleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {FIT.eyebrow}
          </p>
          <h2 className="mt-1 sm:mt-2 font-display text-[26px] sm:text-[34px] md:text-[42px] font-medium leading-tight text-ink">
            {FIT.title}
          </h2>
        </div>

        {/* Top Interactive Filter Tabs */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-ink/10 bg-white/80 p-1 sm:p-1.5 shadow-soft backdrop-blur-md">
            {CATEGORIES.map((cat, i) => {
              const isActive = activeCategoryIndex === i
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleTabClick(i)}
                  aria-pressed={isActive}
                  className={`relative cursor-pointer rounded-full px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive ? "text-ivory" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-pine shadow-sm" />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stacked Cards Frame (Responsive height for mobile viewports) */}
        <div
          ref={cardsContainerRef}
          className="relative mx-auto grid h-155 sm:h-150 md:h-155 lg:h-135 w-full max-w-5xl"
        >
          {CATEGORIES.map((cat) => {
            const categoryItems =
              itemsPerCategory.find((c) => c.name === cat.name)?.items || []

            return (
              <div
                key={cat.name}
                className={`stacked-card col-start-1 row-start-1 h-full w-full overflow-hidden rounded-3xl sm:rounded-4xl p-5 sm:p-7 md:p-9 lg:p-10 shadow-lift ${cat.bg} ${cat.textColor}`}
              >
                <div className="grid h-full gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-10 lg:items-center">
                  {/* Left Column: Category Content */}
                  <div className="flex flex-col justify-between h-full order-2 lg:order-1 lg:col-span-7">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg sm:rounded-xl shadow-sm ${cat.badgeBg}`}
                        >
                          <SparkleIcon className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] opacity-90">
                          {cat.name} Collaboration
                        </span>
                      </div>

                      <h3 className="mt-2.5 sm:mt-4 font-display text-[24px] sm:text-[30px] md:text-[36px] font-medium leading-tight">
                        {cat.name}
                      </h3>

                      {/* Eligible Items Chips */}
                      <div className="mt-3 sm:mt-5">
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] opacity-80">
                          Eligible Niches
                        </p>
                        <ul className="mt-1.5 sm:mt-2 flex flex-wrap gap-1 sm:gap-1.5">
                          {categoryItems.map((item) => (
                            <li
                              key={item}
                              className={`rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium backdrop-blur-sm ${cat.pillBg}`}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-4 sm:mt-6 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          trackCta(`fit-${cat.name.toLowerCase()}`)
                          open()
                        }}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-[12px] sm:rounded-[14px] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold shadow-soft transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${cat.btnClass}`}
                      >
                        Join the waitlist
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column / Mobile Top: Editorial Photography Showcase */}
                  <div className="relative h-64 sm:h-64 md:h-72 lg:h-96 order-1 lg:order-2 lg:col-span-5">
                    <div className="relative h-full w-full overflow-hidden rounded-[18px] sm:rounded-3xl shadow-lift">
                      <img
                        src={cat.imageSrc}
                        alt={cat.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Terms Link */}
        <div className="mt-4 sm:mt-6 text-center">
          <a
            href={LINKS.terms}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink"
          >
            {FIT.linkLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
