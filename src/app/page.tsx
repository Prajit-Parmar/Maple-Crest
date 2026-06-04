import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import CommunityMap from '@/components/home/CommunityMap'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <WhyChooseUs />
      <CommunityMap />
    </>
  )
}
