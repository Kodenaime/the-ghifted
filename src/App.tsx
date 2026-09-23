import { MotionConfig } from "framer-motion"
import { BookingSteps } from "./components/BookingSteps"
import { Faq } from "./components/Faq"
import { FitSection } from "./components/FitSection"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { IncludedSection } from "./components/IncludedSection"
import { KeyDetails } from "./components/KeyDetails"
import { LogoMarquee } from "./components/LogoMarquee"
import { Nav } from "./components/Nav"
import { PastCollaborations } from "./components/PastCollaborations"
import { SmoothScroll } from "./components/SmoothScroll"
import { WaitlistProvider } from "./components/Waitlist"
import { WhyJoin } from "./components/WhyJoin"
import { CustomCursor } from "./components/CustomCursor"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <SmoothScroll />
      <WaitlistProvider>
        <Nav />
        <main>
          <div data-cursor-theme="dark">
            <Hero />
          </div>
          <div data-cursor-theme="light">
            <FitSection />
            <IncludedSection />
            <PastCollaborations />
            <LogoMarquee />
            <BookingSteps />
            <KeyDetails />
            <Faq />
            <WhyJoin />
          </div>
        </main>
        <div data-cursor-theme="dark">
          <Footer />
        </div>
      </WaitlistProvider>
    </MotionConfig>
  )
}
