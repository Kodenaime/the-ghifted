import { BRAND, LINKS, NAV_LINKS } from "../lib/content"
import { scrollToTarget } from "../lib/smoothScroll"
import { InstagramIcon, SparkleIcon, TikTokIcon } from "./icons"

const SOCIALS = [
  { label: "Instagram", href: LINKS.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: LINKS.tiktok, Icon: TikTokIcon },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest text-ivory">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget(0)
            }}
            className="inline-flex items-center gap-2 font-display text-xl tracking-tight"
          >
            <SparkleIcon className="h-4 w-4 text-gold" />
            {BRAND.wordmark}
          </a>
          <p className="mt-3 max-w-xs text-sm text-ivory/60">
            A limited-slot creator collaboration for beauty, fashion, and
            lifestyle brands.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`The Ghifted on ${label}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToTarget(link.href)
                  }}
                  className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">
            Connect
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={LINKS.tiktok}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={LINKS.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                Portfolio & media kit
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-ivory/50 sm:flex-row">
          <span>© {year} {BRAND.wordmark}.</span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
