import { BOOKING } from "../lib/content"
import { Card } from "./Card"
import { SectionHeading } from "./SectionHeading"

export function BookingSteps() {
  return (
    <section
      id="booking"
      className="section-pad bg-cream"
      aria-label="How booking works"
    >
      <div className="container-x">
        <SectionHeading title={BOOKING.eyebrow} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {BOOKING.steps.map((step, i) => (
            <Card key={step.title} delay={i * 0.06}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold font-display text-lg text-forest">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-[19px] leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{step.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
