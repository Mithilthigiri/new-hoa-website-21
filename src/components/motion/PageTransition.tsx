import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Fades the outgoing page out and the incoming page in with a slight upward
 * slide. Keyed on the pathname so each route mount replays the entry.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isLoading = useRouterState({
    select: (state) => state.status === "pending",
  });

  return (
    <div
      className="motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out"
      style={{ opacity: isLoading ? 0 : 1 }}
    >
      <div key={pathname} className="motion-safe:animate-page-in">
        {children}
      </div>
    </div>
  );
}
