import { useEffect, useRef } from "react";

/**
 * Desktop-only magnetic hover: the element eases toward the cursor by up to
 * `max` px and springs back on leave. Disabled for touch and reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(max = 8) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let active = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      node.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;

      const settled =
        Math.abs(target.x - current.x) < 0.05 &&
        Math.abs(target.y - current.y) < 0.05;
      if (settled && !active) {
        node.style.transform = "";
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const scaleX = rect.width ? (dx / (rect.width / 2)) * max : 0;
      const scaleY = rect.height ? (dy / (rect.height / 2)) * max : 0;
      target.x = Math.max(-max, Math.min(max, scaleX));
      target.y = Math.max(-max, Math.min(max, scaleY));
      active = true;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      active = false;
      start();
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [max]);

  return ref;
}
