import { INCLUDED } from "../lib/content"
import { Button } from "./Button"
import { Card } from "./Card"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import { useWaitlist } from "../lib/waitlist-context"
import { trackCta } from "../lib/analytics"

export function IncludedSection() {
  const { open } = useWaitlist()

  return (
    <section
      id="included"
      className="section-pad"
      aria-label="What's included"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={INCLUDED.eyebrow}
          title={INCLUDED.title}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.items.map((item, i) => (
            <Card
              key={item.title}
              delay={i * 0.06}
              className={
                item.highlight
                  ? "bg-gradient-to-br from-white/70 to-gold/15 ring-1 ring-gold/50"
                  : ""
              }
            >
              <span className="font-display text-3xl text-gold">
                {item.number}
              </span>
              <h3 className="mt-4 font-display text-[19px] leading-snug">
                {item.title}
              </h3>
              {item.price && (
                <p className="mt-3 font-display text-[28px] font-medium leading-none text-pine">
                  {item.price}
                </p>
              )}
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </Card>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button
            onClick={() => {
              trackCta("included")
              open()
            }}
          >
            {INCLUDED.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
