import { cn } from "@/lib/utils";

export const ANNOUNCEMENTS = [
  "Hand Curated Collection",
  "Premium Fabrics",
  "Delivery Across India",
  "Free Shipping Above ₹2,999",
  "Exclusively Crafted",
  "Never Mass Produced",
];

function Copy({ prefix, hidden }: { prefix: string; hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {ANNOUNCEMENTS.map((item, i) => (
        <span key={`${prefix}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden="true" className="px-6 opacity-70">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

/** Thin scrolling announcement strip shown directly below the navbar. */
export function AnnouncementStrip({ className }: { className?: string }) {
  return (
    <div
      aria-label="Announcements"
      className={cn(
        "announce-shell flex h-9 items-center overflow-hidden bg-rust-label text-cream-card",
        className,
      )}
    >
      <div className="announce-track type-nav-mini flex w-max">
        <Copy prefix="a" />
        <Copy prefix="b" hidden />
      </div>
    </div>
  );
}
