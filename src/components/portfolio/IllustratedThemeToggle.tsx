import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IllustratedThemeToggleProps {
  className?: string;
}

export function IllustratedThemeToggle({ className = "" }: IllustratedThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // ignore
    }
  };

  const isDark = theme === "dark";

  if (!mounted) {
    return <div className={`h-8 w-16 rounded-full bg-surface border border-border ${className}`} />;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-[64px] shrink-0 cursor-pointer items-center rounded-full border border-border p-0.5 shadow-inner transition-colors duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
        isDark
          ? "bg-[#181916] hover:border-[#C7A878]/60"
          : "bg-[#ECE7DC] hover:border-[#8A6A3F]/60"
      } ${className}`}
    >
      {/* Background celestial scenery */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        {/* Night Scene: Stars & Nebula in Dark mode */}
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.8 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-start pl-2"
        >
          {/* Star 1 */}
          <span className="absolute left-2.5 top-1.5 h-1 w-1 rounded-full bg-[#C7A878] opacity-80" />
          {/* Star 2 */}
          <span className="absolute left-4.5 bottom-2 h-0.5 w-0.5 rounded-full bg-[#F4F0E8] opacity-70" />
          {/* Star 3 (small twinkle) */}
          <span className="absolute left-6 top-3 h-1 w-1 rounded-full bg-[#DEC69F] opacity-90 animate-pulse" />
        </motion.div>

        {/* Day Scene: Soft sunray warmth & cloud in Light mode */}
        <motion.div
          initial={false}
          animate={{ opacity: !isDark ? 1 : 0, scale: !isDark ? 1 : 0.8 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-end pr-2.5"
        >
          {/* Minimalist soft cloud puffs */}
          <svg
            className="absolute right-2 bottom-1.5 h-3.5 w-6 text-[#DCD6C9]"
            viewBox="0 0 24 14"
            fill="currentColor"
          >
            <path d="M19 14H5a4 4 0 0 1-1.3-7.8A5 5 0 0 1 13.2 4 4.5 4.5 0 0 1 19 10a3 3 0 0 1 0 4Z" />
          </svg>
          <span className="absolute right-7 top-1.5 h-1 w-1 rounded-full bg-[#8A6A3F]/40" />
        </motion.div>
      </div>

      {/* Floating Animated Handle / Celestial Orb */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className={`relative z-10 grid h-6.5 w-6.5 place-items-center rounded-full shadow-md transition-colors ${
          isDark
            ? "ml-auto bg-[#20211E] text-[#C7A878] border border-[#353630]"
            : "mr-auto bg-[#FFFEFA] text-[#8A6A3F] border border-[#DCD6C9]"
        }`}
      >
        {isDark ? (
          /* Crescent Moon with crater detail */
          <motion.svg
            key="moon"
            initial={{ rotate: -40, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </motion.svg>
        ) : (
          /* Radiant Sun with rays */
          <motion.svg
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </motion.svg>
        )}
      </motion.div>
    </button>
  );
}
