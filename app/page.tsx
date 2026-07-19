import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Transparency from "@/components/Transparency";
import TreatmentsDeckSection from "@/components/TreatmentsDeckSection";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import ClinicTourPreview from "@/components/ClinicTourPreview";
import Testimonials from "@/components/Testimonials";
import TechnologySection from "@/components/TechnologySection";
import AppointmentProcess from "@/components/AppointmentProcess";
import FaqPreview from "@/components/FaqPreview";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Transparency />
      <TreatmentsDeckSection limit={10} />
      <DoctorSpotlight />
      <ClinicTourPreview />
      <Testimonials />
      <TechnologySection />
      <AppointmentProcess />
      <FaqPreview />
      <FinalCTA />
    </>
  );
}
