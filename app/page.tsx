import Hero from "@/components/Hero";
import Transparency from "@/components/Transparency";
import TreatmentsDeckSection from "@/components/TreatmentsDeckSection";
import InsideClinic from "@/components/InsideClinic";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import Testimonials from "@/components/Testimonials";
import AppointmentProcess from "@/components/AppointmentProcess";
import FaqPreview from "@/components/FaqPreview";
import FinalCTA from "@/components/FinalCTA";

// Section rhythm, deliberately alternating dark green and light (white/
// cream) ground so the page has real value contrast to scroll through,
// rather than nine consecutive shades of the same cream:
// Hero (photo) → Philosophy (dark) → Treatments (white) →
// Inside the Clinic (cream) → Doctors (white) → Testimonials (dark) →
// Appointment Process (cream) → FAQ (white) → Final CTA (dark).
export default function HomePage() {
  return (
    <>
      <Hero />
      <Transparency />
      <TreatmentsDeckSection limit={10} />
      <InsideClinic />
      <DoctorSpotlight />
      <Testimonials />
      <AppointmentProcess />
      <FaqPreview />
      <FinalCTA />
    </>
  );
}
