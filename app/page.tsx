import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Transparency from "@/components/Transparency";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Transparency />
      <TreatmentsGrid />
      <DoctorSpotlight />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
