import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "view" | "shop";

/**
 * Desktop-only custom cursor with lerp trailing. Hidden entirely on touch
 * devices and when the visitor prefers reduced motion, in which case the
 * native cursor is left untouched.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-aira-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);

      const el = event.target as Element | null;
      if (!el || typeof el.closest !== "function") return;
      if (el.closest('[data-cursor="shop"]')) setMode("shop");
      else if (el.closest('[data-cursor="view"]')) setMode("view");
      else setMode("default");
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      const node = dotRef.current;
      if (node) {
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-aira-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = mode !== "default";

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease-out" }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-ivory transition-[width,height] duration-300 ease-out"
        style={{
          width: expanded ? 48 : 8,
          height: expanded ? 48 : 8,
        }}
      >
        <span
          className="type-label text-espresso transition-opacity duration-200"
          style={{ opacity: expanded ? 1 : 0, fontSize: "0.5rem" }}
        >
          {mode === "shop" ? "Shop" : "View"}
        </span>
      </div>
    </div>
  );
}
