import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <TreatmentsGrid />
      <DoctorSpotlight />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
