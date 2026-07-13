import Link from "next/link";
import Image from "next/image";
import { clinic } from "@/lib/site-data";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-porcelain/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center h-full py-2.5">
          <Image
            src="/logo.png"
            alt="DentalNisaa Oral Care"
            width={160}
            height={160}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink/80">
          <Link href="/#treatments" className="hover:text-ink transition-colors">Treatments</Link>
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
          <Link href="/#reviews" className="hover:text-ink transition-colors">Reviews</Link>
          <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="hidden sm:inline-flex items-center text-sm font-semibold text-ink/80 hover:text-ink"
          >
            {clinic.phone}
          </a>
          <Link
            href="/booking"
            className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-5 py-2.5 text-sm font-semibold hover:bg-sage-dark transition-colors"
          >
            Book a visit
          </Link>
        </div>
      </div>
    </header>
  );
}
