import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PDP_DETAIL_SECTIONS } from "./pdp-copy";

type ProductDetailsProps = {
  className?: string;
};

/**
 * Restrained disclosure sections. Copy comes from pdp-copy.ts so the blocks can
 * later be filled from Shopify without changing this component.
 */
export function ProductDetails({ className }: ProductDetailsProps) {
  return (
    <section aria-labelledby="product-details-heading" className={cn(className)}>
      <h2 id="product-details-heading" className="type-label text-rust-deep">
        Details
      </h2>
      <Accordion type="single" collapsible className="mt-space-md border-t border-border">
        {PDP_DETAIL_SECTIONS.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border-b border-border"
          >
            <AccordionTrigger className="type-h4 py-space-md text-foreground hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="type-editorial pb-space-md text-muted-foreground">
              {section.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
