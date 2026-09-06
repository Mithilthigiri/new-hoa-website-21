import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "919384488692";

export function OrderConfirmationPage({ className }: { className?: string }) {
  return (
    <main
      className={cn(
        "flex min-h-[100svh] flex-col items-center justify-center px-6 py-16",
        className,
      )}
      style={{ backgroundColor: "#F5EFE0" }}
    >
      <div className="w-full max-w-[560px] text-center">
        <CheckCircle2
          size={56}
          color="#2D5A3D"
          strokeWidth={1.5}
          aria-hidden="true"
          className="mx-auto mb-6"
        />

        <div
          className="mx-auto mb-7"
          style={{
            width: 48,
            height: 1,
            backgroundColor: "#C9A84C",
          }}
        />

        <p
          className="text-center uppercase tracking-[0.2em]"
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 10,
            color: "#B85C38",
            letterSpacing: "0.2em",
          }}
        >
          ORDER CONFIRMED
        </p>

        <h1
          className="mt-3 text-center"
          style={{
            fontFamily: "Playfair Display, Georgia, serif",
            fontSize: 36,
            fontWeight: 300,
            lineHeight: 1.2,
            color: "#1A0F0A",
          }}
        >
          Thank you for your order.
        </h1>

        <p
          className="mt-4 text-center italic"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 17,
            lineHeight: 1.75,
            color: "#7A6855",
          }}
        >
          Your order has been placed and our team will be in touch with you shortly. A confirmation
          will be sent to your provided contact details.
        </p>

        <p
          className="mt-6 text-center uppercase tracking-[0.2em]"
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 10,
            color: "#7A6855",
            letterSpacing: "0.2em",
          }}
        >
          Questions? Chat with us on WhatsApp
        </p>

        <a
          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
            "Hi House of Aira, I have a question about my order.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block border-b uppercase tracking-[0.15em]"
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 10,
            color: "#25D366",
            borderColor: "rgba(37, 211, 102, 0.4)",
            paddingBottom: "1px",
            letterSpacing: "0.15em",
          }}
        >
          CHAT WITH US &rarr;
        </a>

        <div
          className="w-full"
          style={{
            height: 1,
            backgroundColor: "#DDD5C0",
            margin: "32px 0",
          }}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            to="/shop"
            className="border-b uppercase tracking-[0.15em]"
            style={{
              fontFamily: "Jost, sans-serif",
              fontSize: 10,
              color: "#1A0F0A",
              borderColor: "rgba(26, 15, 10, 0.3)",
              paddingBottom: "1px",
              letterSpacing: "0.15em",
            }}
          >
            CONTINUE SHOPPING &rarr;
          </Link>
          <Link
            to="/collections"
            className="border-b uppercase tracking-[0.15em]"
            style={{
              fontFamily: "Jost, sans-serif",
              fontSize: 10,
              color: "#1A0F0A",
              borderColor: "rgba(26, 15, 10, 0.3)",
              paddingBottom: "1px",
              letterSpacing: "0.15em",
            }}
          >
            VIEW COLLECTIONS &rarr;
          </Link>
        </div>

        <p
          className="mt-12 text-center uppercase tracking-[0.2em]"
          style={{
            fontFamily: "Playfair Display, Georgia, serif",
            fontSize: 14,
            color: "#DDD5C0",
            letterSpacing: "0.2em",
          }}
        >
          HOUSE OF AIRA
        </p>
      </div>
    </main>
  );
}
