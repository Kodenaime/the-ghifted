import { FAQ } from "../lib/content"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import { ChevronDown } from "./icons"

export function Faq() {
  return (
    <section
      id="faq"
      className="section-pad bg-cream"
      aria-label="Questions you may have"
    >
      <div className="container-x">
        <SectionHeading title={FAQ.eyebrow} />

        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="glass-card group overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
                  <h3 className="font-display text-[19px] leading-snug">
                    {item.q}
                  </h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-[15px] text-muted md:px-6 md:pb-6">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
