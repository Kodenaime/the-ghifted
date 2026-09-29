import { KEY_DETAILS, LINKS } from "../lib/content"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import { ArrowRight, SparkleIcon } from "./icons"

export function KeyDetails() {
  return (
    <section className="section-pad" aria-label="A few things to know">
      <div className="container-x">
        <SectionHeading title={KEY_DETAILS.eyebrow} />

        <Reveal>
          <div className="glass-card mx-auto max-w-3xl p-8 md:p-10">
            <ul className="space-y-4">
              {KEY_DETAILS.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <SparkleIcon className="mt-1.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-[15px] text-ink/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 text-center">
            <a
              href={LINKS.terms}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-pine underline-offset-4 hover:underline"
            >
              View the full campaign terms and conditions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
