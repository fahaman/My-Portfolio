import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const glowPrimaryRef = useRef<HTMLDivElement | null>(null);
  const glowSecondaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip on touch screens or if reduced motion is requested
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let trailX = -1000;
    let trailY = -1000;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Smooth linear interpolation for natural trailing momentum
    const render = () => {
      // Primary glow interpolates faster (fluid tracking)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      // Secondary ambient glow interpolates slower (dreamy aura)
      trailX += (targetX - trailX) * 0.05;
      trailY += (targetY - trailY) * 0.05;

      if (glowPrimaryRef.current) {
        glowPrimaryRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (glowSecondaryRef.current) {
        glowSecondaryRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Primary Warm Champagne / Gold Cursor Glow */}
      <div
        ref={glowPrimaryRef}
        className="absolute left-0 top-0 h-[480px] w-[480px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 22%, transparent) 0%, color-mix(in srgb, var(--primary) 10%, transparent) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Secondary Soft Ambient Aura (trails slightly behind) */}
      <div
        ref={glowSecondaryRef}
        className="absolute left-0 top-0 h-[720px] w-[720px] rounded-full opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent) 0%, color-mix(in srgb, var(--primary) 4%, transparent) 45%, transparent 75%)",
          filter: "blur(65px)",
        }}
      />
    </div>
  );
}
