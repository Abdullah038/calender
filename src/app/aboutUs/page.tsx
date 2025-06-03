import DisplayGallery from "@/components/aboutUs/DisplayGallery"
import FeedbackSection from "@/components/aboutUs/FeedbackSection"
import HeroSect from "@/components/aboutUs/HeroSect"
import InfoSections from "@/components/aboutUs/InfoSections"


const AboutUs = () => {
  return (
    <>
        <HeroSect />
        <InfoSections />

        <DisplayGallery />

        <FeedbackSection />
    </>
  )

}

export default AboutUs