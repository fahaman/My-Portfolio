import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  Layers,
  Clock,
  GraduationCap,
  Award,
  User,
  Mail,
  FileText,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IllustratedThemeToggle } from "./IllustratedThemeToggle";

interface FloatingNavbarProps {
  onOpenCv: () => void;
  onAvatarClick: () => void;
}

const NAV_ITEMS = [
  { id: "top", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "experience", label: "Experience", icon: Clock },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export function FloatingNavbar({
  onOpenCv,
  onAvatarClick,
}: FloatingNavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section with IntersectionObserver
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <>
      {/* Top Header Bar with Monogram, Navigation Links, Availability, Theme Toggle, CV & Contact */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/80 bg-background/90 backdrop-blur-md py-3 shadow-xs"
            : "border-b border-transparent bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left: Compact Profile Avatar & Full Name */}
          <a
            href="#top"
            onClick={(e) => handleNavClick("top", e)}
            className="group flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
            aria-label="Mohammed Fahaman - Home"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onAvatarClick();
              }}
              className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full border border-border bg-card shadow-xs transition group-hover:border-primary cursor-pointer"
            >
              <img
                src="/fahaman.png"
                alt="Mohammed Fahaman"
                className="h-full w-full object-cover object-top"
                loading="eager"
              />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-foreground whitespace-nowrap">
              Mohammed Fahaman
            </span>
          </a>

          {/* Center: Desktop Navigation Bar with Smooth Animated Active-Indicator */}
          <nav
            className="hidden items-center rounded-full border border-border/80 bg-card/90 p-1 shadow-sm backdrop-blur-md xl:flex"
            aria-label="Main Navigation"
          >
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(item.id, e)}
                      className={`relative z-10 flex items-center px-3 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                    </a>

                    {/* Animated Sliding Pill Highlight */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 z-0 rounded-full border border-primary/30 bg-primary/10 shadow-xs"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Controls: Theme Toggle, CV button, and Reach Out */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Illustrated Moon/Sun Theme Toggle */}
            <IllustratedThemeToggle />

            {/* CV Modal Action */}
            <button
              type="button"
              onClick={onOpenCv}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary cursor-pointer whitespace-nowrap"
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span>CV</span>
            </button>

            {/* Reach Out Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick("contact", e)}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 shadow-xs whitespace-nowrap"
            >
              <span>Reach Out</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-foreground transition hover:border-primary xl:hidden cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-border bg-background/95 px-4 py-4 backdrop-blur-md xl:hidden"
          >
            <nav className="grid gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 flex gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="flex-1 rounded-lg border border-border bg-card py-2 text-center text-xs font-medium text-foreground hover:border-primary cursor-pointer"
              >
                Preview CV
              </button>
              <a
                href="/Mohammed-Fahaman-Resume.pdf"
                download="Mohammed-Fahaman-Resume.pdf"
                className="flex-1 rounded-lg bg-primary py-2 text-center text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
