import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-porcelain border-t border-ink/10 shadow-[0_-8px_24px_rgba(33,30,26,0.12)]">
      <div className="grid grid-cols-3 text-ink text-sm font-semibold">
        <a
          href={`tel:${clinic.phone.replace(/\s/g, "")}`}
          className="focus-ring flex flex-col items-center justify-center py-3 gap-1 active:bg-ink/5"
        >
          <Icon name="phone" className="w-5 h-5" />
          Call
        </a>
        <a
          href={`https://wa.me/${clinic.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex flex-col items-center justify-center py-3 gap-1 border-x border-ink/10 active:bg-ink/5"
        >
          <Icon name="chat" className="w-5 h-5" />
          WhatsApp
        </a>
        <Link
          href="/booking"
          className="focus-ring flex flex-col items-center justify-center py-3 gap-1 bg-gold text-ink active:bg-gold-light"
        >
          <Icon name="calendar" className="w-5 h-5" />
          Book
        </Link>
      </div>
    </div>
  );
}
