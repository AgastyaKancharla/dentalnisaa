import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Transparency from "@/components/Transparency";
import TreatmentsGrid from "@/components/TreatmentsGrid";
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
      <TreatmentsGrid limit={10} />
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
