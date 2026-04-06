import React from 'react'
import HeroSlider from '../components/Slider'
import CategoriesSection from '../components/CategorySection'
import BestSeller from '../components/BestSeller'
import TrustBar from '../components/TrustBar'
import TopRated from '../components/TopRated'
import OfferBanner from '../components/OfferBanner'
import Testimonials from '../components/Testimonial'

export default function page() {
  return (
    <>
    <HeroSlider />
    <CategoriesSection />
    <BestSeller />
    <TrustBar />
    <TopRated />
    <OfferBanner />
    <Testimonials />
    </>
  )
}
