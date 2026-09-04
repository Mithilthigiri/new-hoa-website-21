import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades the outgoing page out and the incoming page in with a slight upward
 * slide. Keyed on the pathname so each route mount replays the entry.
 * The fade only engages after hydration, so SSR markup stays fully visible.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isNavigating = useRouterState({
    select: (state) => state.status === "pending",
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <div
      className={cn(
        "motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out",
        hydrated && isNavigating ? "motion-safe:opacity-0" : "opacity-100",
      )}
    >
      <div key={pathname} className="motion-safe:animate-page-in">
        {children}
      </div>
    </div>
  );
}
