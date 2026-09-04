import { Sparkles, Shirt, Package, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const USP_ITEMS = [
  {
    icon: Sparkles,
    title: "HAND CURATED",
    subtitle: "Every piece selected with intention",
  },
  {
    icon: Shirt,
    title: "PREMIUM FABRICS",
    subtitle: "Natural textiles, considered detail",
  },
  {
    icon: Package,
    title: "FREE SHIPPING",
    subtitle: "On orders above ₹2,999",
  },
  {
    icon: RotateCcw,
    title: "EASY RETURNS",
    subtitle: "Hassle-free within 7 days",
  },
];

type UspStripProps = {
  className?: string;
};

export function UspStrip({ className }: UspStripProps) {
  return (
    <section
      className={cn(
        "bg-[#F5EFE0] border-y border-[#DDD5C0] py-8",
        className
      )}
    >
      <div className="grid grid-cols-2 divide-x divide-[#DDD5C0] md:grid-cols-4">
        {USP_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col items-center justify-center px-4 py-2 text-center"
            >
              <Icon size={20} color="#B85C38" aria-hidden="true" />
              <h3 className="mt-[10px] font-sans text-[11px] uppercase tracking-[0.12em] text-[#1A0F0A]">
                {item.title}
              </h3>
              <p className="mt-1 font-sans text-[10px] text-[#7A6855]">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
