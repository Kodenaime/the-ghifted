import { WHY_JOIN } from "../lib/content"
import { Button } from "./Button"
import { Card } from "./Card"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import { useWaitlist } from "../lib/waitlist-context"
import { trackCta } from "../lib/analytics"
import { SparkleIcon } from "./icons"

export function WhyJoin() {
  const { open } = useWaitlist()

  return (
    <section className="section-pad" aria-label="Why join the waitlist?">
      <div className="container-x">
        <SectionHeading title={WHY_JOIN.eyebrow} />

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
          {WHY_JOIN.items.map((item, i) => (
            <Card key={item.title} delay={i * 0.06}>
              <SparkleIcon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-[22px] leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] text-muted">{item.body}</p>
            </Card>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => {
              trackCta("why-join")
              open()
            }}
          >
            {WHY_JOIN.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
