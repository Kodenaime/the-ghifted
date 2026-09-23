import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { LINKS, PAST_COLLABORATIONS } from "../lib/content"
import { SectionHeading } from "./SectionHeading"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLinkIcon,
  PlayIcon,
  SparkleIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from "./icons"

type Slide = (typeof PAST_COLLABORATIONS.videos)[number]

function PlaceholderPhoneScreen({
  brand,
  category,
  isActive,
}: {
  brand: string
  category: string
  isActive: boolean
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-b from-pine via-forest to-ink p-5 text-ivory">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 60% 30%, rgba(201,162,75,0.45), transparent 65%)",
        }}
      />

      {/* Top Header / Brand Tag */}
      <div className="relative z-10 pt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-champagne backdrop-blur-md">
          <SparkleIcon className="h-3 w-3" />
          {category}
        </span>
      </div>

      {/* Center Play Button & Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div
          className={`grid h-16 w-16 place-items-center rounded-full bg-gold text-forest shadow-lift transition-all duration-300 ${
            isActive ? "scale-110 ring-4 ring-gold/30 animate-pulse" : "opacity-80"
          }`}
        >
          <PlayIcon className="ml-1 h-7 w-7" />
        </div>
        <p className="mt-4 font-display text-xl font-medium text-ivory">
          {brand}
        </p>
        <p className="mt-1 text-xs text-ivory/70">Holiday Collaboration Preview</p>
      </div>

      {/* Bottom Info Overlay */}
      <div className="relative z-10 pb-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
          <p className="text-xs font-semibold text-champagne">@theghifted collab</p>
          <p className="text-[11px] text-ivory/80">Instagram & TikTok co-post</p>
        </div>
      </div>
    </div>
  )
}

function PhoneMockup({
  slide,
  isActive,
  muted,
  onToggleMute,
  onClick,
  progress,
  onEnded,
}: {
  slide: Slide
  isActive: boolean
  muted: boolean
  onToggleMute: () => void
  onClick: () => void
  progress: number
  onEnded?: () => void
}) {
  const hasVideo = Boolean(slide.src)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
    }
  }, [muted])

  useEffect(() => {
    if (!videoRef.current || !hasVideo) return
    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isActive, hasVideo])

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer transition-all duration-500 ease-out select-none ${
        isActive
          ? "scale-105 z-20 opacity-100"
          : "scale-95 z-10 opacity-60 hover:opacity-85 hover:scale-98"
      }`}
      data-cursor-label={isActive ? (muted ? "UNMUTE" : "PLAYING") : "WATCH"}
    >
      {/* Phone Hardware Shell */}
      <div className="relative w-[230px] sm:w-[250px] md:w-[270px] rounded-[48px] p-2.5 bg-gradient-to-b from-[#383834] via-[#1c1c1a] to-[#0c0c0b] shadow-2xl ring-1 ring-white/20">
        {/* Hardware side buttons */}
        <div className="absolute -left-1 top-24 h-8 w-1 rounded-l-md bg-[#4a4a44]" />
        <div className="absolute -left-1 top-36 h-12 w-1 rounded-l-md bg-[#4a4a44]" />
        <div className="absolute -right-1 top-28 h-14 w-1 rounded-r-md bg-[#4a4a44]" />

        {/* Screen Bezel */}
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[38px] bg-black shadow-inner">
          {/* Top Dynamic Island / Sensor Notch */}
          <div className="absolute top-2.5 left-1/2 z-30 -translate-x-1/2 flex h-4 w-20 items-center justify-between rounded-full bg-black/95 px-2.5">
            <span className="h-2 w-2 rounded-full bg-[#1c1c1c]" />
            <span className="h-2 w-2 rounded-full bg-[#0a1a2f]" />
          </div>

          {/* Active Progress Line (Instagram Stories / TikTok style) */}
          {isActive && (
            <div className="absolute top-8 inset-x-4 z-30 h-1 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full bg-gold transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Video or Fallback Screen */}
          {hasVideo ? (
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                src={slide.src}
                className="h-full w-full object-cover"
                muted={muted}
                playsInline
                loop={false}
                onEnded={() => onEnded?.()}
                aria-label={`${slide.brand} collaboration video`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-ivory">
                <p className="text-sm font-semibold text-champagne">{slide.brand}</p>
                <p className="text-xs text-ivory/80">{slide.category}</p>
              </div>
            </div>
          ) : (
            <PlaceholderPhoneScreen
              brand={slide.brand}
              category={slide.category}
              isActive={isActive}
            />
          )}

          {/* Sound Toggle Button (on active phone) */}
          {isActive && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggleMute()
              }}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute right-3 top-10 z-30 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black/60 text-ivory backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            >
              {muted ? (
                <VolumeOffIcon className="h-4 w-4" />
              ) : (
                <VolumeOnIcon className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Screen Glass Corner Reflection */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20" />
        </div>
      </div>
    </div>
  )
}

export function PastCollaborations() {
  const slides = PAST_COLLABORATIONS.videos
  const N = slides.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const DURATION_MS = 6500
  const INTERVAL_MS = 100

  // Auto-advance sequencing timer
  useEffect(() => {
    if (reduced || isPaused) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % N)
          return 0
        }
        return prev + (INTERVAL_MS / DURATION_MS) * 100
      })
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [reduced, isPaused, N])

  // Center active phone in the scroll viewport
  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const cards = track.children
    if (!cards[activeIndex]) return

    const activeEl = cards[activeIndex] as HTMLElement
    const containerWidth = container.clientWidth
    const cardCenter = activeEl.offsetLeft + activeEl.clientWidth / 2
    const scrollTarget = cardCenter - containerWidth / 2

    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: "smooth",
    })
  }, [activeIndex])

  const prev = () => {
    setProgress(0)
    setActiveIndex((i) => (i - 1 + N) % N)
  }

  const next = () => {
    setProgress(0)
    setActiveIndex((i) => (i + 1) % N)
  }

  return (
    <section
      id="past-collaborations"
      className="section-pad overflow-hidden bg-cream"
      aria-label="See past collaborations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={PAST_COLLABORATIONS.eyebrow}
          title={PAST_COLLABORATIONS.title}
        />
      </div>

      {/* Side-by-Side Smartphone Carousel */}
      <div className="relative mt-8">
        {/* Left / Right Chevron Controls */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous video"
          className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-lift transition-all hover:scale-110 hover:bg-ivory sm:grid md:left-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next video"
          className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-lift transition-all hover:scale-110 hover:bg-ivory sm:grid md:right-8"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Horizontal Scrolling Phones Track */}
        <div
          ref={containerRef}
          className="no-scrollbar flex overflow-x-auto py-10 px-6 sm:px-12 md:px-24 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div
            ref={trackRef}
            className="mx-auto flex items-center gap-6 sm:gap-8 md:gap-12"
          >
            {slides.map((slide, i) => (
              <PhoneMockup
                key={i}
                slide={slide}
                isActive={i === activeIndex}
                muted={muted}
                onToggleMute={() => setMuted((m) => !m)}
                onClick={() => {
                  setProgress(0)
                  setActiveIndex(i)
                }}
                progress={i === activeIndex ? progress : 0}
                onEnded={next}
              />
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setProgress(0)
                setActiveIndex(i)
              }}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-pine"
                  : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        {/* Portfolio Link */}
        <div className="mt-10 text-center">
          <a
            href={LINKS.portfolio}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pine underline-offset-4 hover:underline"
          >
            {PAST_COLLABORATIONS.cta}
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
