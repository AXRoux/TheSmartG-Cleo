import VideoBackgroundHero from "@/components/heros/video-background-hero"
import { AboutTSG } from "@/components/sections/about-tsg"
import { MeetFounderSection } from "@/components/sections/meet-our-founder"
import ServicesSection from "@/components/sections/services"
import { LiveLearnHub } from "@/components/sections/live-learn-hub"
import { CallToActionHeader } from "@/components/sections/cta-header"
import { Footer } from "@/components/sections/footer"

export default function HomePage() {
  return (
    <main>
      <VideoBackgroundHero />
      <AboutTSG />
      <MeetFounderSection />
      <ServicesSection />
      <LiveLearnHub />
      <CallToActionHeader />
      <Footer />
    </main>
  )
}
