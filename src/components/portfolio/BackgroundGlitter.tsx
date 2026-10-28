import { useEffect, useRef } from "react";

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftX: number;
  driftY: number;
  colorType: "champagne" | "ivory";
}

export function BackgroundGlitter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of particles: modest and sparse
    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 65;

    const particles: SparkleParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.6, // 0.6px to 2.1px delicate specks
        baseAlpha: Math.random() * 0.35 + 0.1,
        alpha: 0.1,
        twinkleSpeed: Math.random() * 0.015 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.15,
        colorType: Math.random() > 0.3 ? "champagne" : "ivory",
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light";

      // Dark vs Light color tints
      // Dark: Champagne (#C7A878) and soft Ivory (#F4F0E8)
      // Light: Muted Champagne/Bronze (#8A6A3F) and Stone Gray (#77776F) with reduced opacity
      const champagneColor = isDark ? "199, 168, 120" : "138, 106, 63";
      const ivoryColor = isDark ? "244, 240, 232" : "100, 95, 85";
      const themeAlphaScale = isDark ? 1.0 : 0.45;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Twinkle
        p.twinklePhase += p.twinkleSpeed;
        const sineWave = (Math.sin(p.twinklePhase) + 1) / 2; // 0 to 1
        p.alpha = (p.baseAlpha + sineWave * 0.45) * themeAlphaScale;

        // Slow drift
        p.x += p.driftX;
        p.y += p.driftY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        const color = p.colorType === "champagne" ? champagneColor : ivoryColor;
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Delicate 4-point sparkle for brighter peak points
        if (sineWave > 0.88 && p.size > 1.2) {
          const sparkSize = p.size * 2.2;
          ctx.strokeStyle = `rgba(${color}, ${p.alpha * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - sparkSize, p.y);
          ctx.lineTo(p.x + sparkSize, p.y);
          ctx.moveTo(p.x, p.y - sparkSize);
          ctx.lineTo(p.x, p.y + sparkSize);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
