import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PDP_SIZE_GUIDE_NOTE } from "./pdp-copy";

/**
 * Lightweight size guide. Radix Dialog supplies the focus trap, Escape handling
 * and accessible close control; the body is a placeholder until the brand's real
 * measurements exist.
 */
export function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger className="type-label inline-flex h-11 items-center text-espresso underline decoration-border-gold decoration-1 underline-offset-4 outline-none transition-colors duration-300 hover:text-rust-deep focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        Size Guide
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-sm border-border bg-card">
        <DialogHeader>
          <DialogTitle className="type-h3 text-foreground">
            Size Guide
          </DialogTitle>
          <DialogDescription className="type-editorial text-muted-foreground">
            {PDP_SIZE_GUIDE_NOTE}
          </DialogDescription>
        </DialogHeader>
        <div className="rule-gold w-16" />
      </DialogContent>
    </Dialog>
  );
}
