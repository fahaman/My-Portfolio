import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!visible) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen blur-3xl transition-opacity"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, #FFD670 0%, transparent 60%)",
      }}
    />
  );
}
