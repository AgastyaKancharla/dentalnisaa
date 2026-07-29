import type { Metadata } from "next";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import ReviewsPageContent from "@/components/ReviewsPageContent";

const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);

export const metadata: Metadata = {
  title: "Patient Reviews — Real reviews across every platform",
  description: `${totalReviews}+ real patient reviews for ${clinic.name} across Google, Practo, and Justdial.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return <ReviewsPageContent />;
}
