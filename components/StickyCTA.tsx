import { clinic } from "@/lib/site-data";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-ink/95 backdrop-blur border-t border-porcelain/10">
      <div className="grid grid-cols-3 text-porcelain text-sm font-semibold">
        <a
          href={`tel:${clinic.phone.replace(/\s/g, "")}`}
          className="focus-ring flex flex-col items-center justify-center py-3 gap-0.5 active:bg-porcelain/10"
        >
          <span>📞</span>
          Call
        </a>
        <a
          href={`https://wa.me/${clinic.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex flex-col items-center justify-center py-3 gap-0.5 border-x border-porcelain/10 active:bg-porcelain/10"
        >
          <span>💬</span>
          WhatsApp
        </a>
        <a
          href="/booking"
          className="focus-ring flex flex-col items-center justify-center py-3 gap-0.5 bg-gold text-ink active:bg-gold-light"
        >
          <span>📅</span>
          Book
        </a>
      </div>
    </div>
  );
}
