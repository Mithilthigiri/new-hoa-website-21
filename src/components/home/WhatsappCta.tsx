import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type WhatsappCtaProps = {
  phoneNumber?: string;
  className?: string;
};

export function WhatsappCta({
  phoneNumber = "91XXXXXXXXXX",
  className,
}: WhatsappCtaProps) {
  return (
    <section
      aria-labelledby="whatsapp-heading"
      className={cn("bg-espresso py-20", className)}
    >
      <div className="mx-auto max-w-[40rem] px-6 text-center">
        <MessageCircle
          className="mx-auto mb-5 text-gold"
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <h2
          id="whatsapp-heading"
          className="font-display text-[clamp(1.5rem,3.5vw,2.375rem)] font-light leading-[1.3] text-ivory"
        >
          Need help finding your perfect piece?
        </h2>

        <p className="font-editorial mt-3 text-[1rem] italic leading-[1.7] text-ivory/70">
          Our styling team is just a message away. Talk to us on WhatsApp and
          we&apos;ll help you find exactly what you&apos;re looking for.
        </p>

        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="type-button mt-8 inline-flex h-[52px] w-full items-center justify-center gap-2.5 bg-[#25D366] px-10 text-white transition-colors duration-200 hover:bg-[#1EA952] sm:w-auto"
        >
          <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
          CHAT WITH US ON WHATSAPP
        </a>

        <p className="type-label mt-3.5 text-ivory/40">
          Usually replies within a few hours
        </p>
      </div>
    </section>
  );
}
