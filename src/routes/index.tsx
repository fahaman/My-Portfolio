import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Mail, Download, MapPin,
  ExternalLink, Calendar, CheckCircle2, Send,
  GraduationCap, X, ChevronLeft, ChevronRight,
  Maximize2, FileText, ZoomIn, ZoomOut, Phone, Sun, Moon,
  Layers, Server, Database, Cloud, Wrench, Award,
  Sparkles, Terminal
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "@/lib/send-mail";
import { Counter, Reveal } from "@/components/portfolio/motion-bits";
import { BackgroundGlitter } from "@/components/portfolio/BackgroundGlitter";
import { FloatingNavbar } from "@/components/portfolio/FloatingNavbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Fahaman | Full-Stack Web Developer | MERN-Stack Developer" },
      { name: "description", content: "Portfolio of Mohammed Fahaman — Full-Stack Web Developer & MERN-Stack Developer building scalable web applications, modern APIs, and high-performance cloud architectures." },
      { property: "og:title", content: "Mohammed Fahaman | Full-Stack Web Developer | MERN-Stack Developer" },
      { property: "og:description", content: "Full-Stack Web Developer & MERN-Stack Developer building high-impact web products and scalable systems." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ──────────────────────────────────────────────────────────────────────────
   NAVIGATION LINKS
   ────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const PROFILE_IMAGES = [
  "/fahaman.png",
  "/fahaman2.png",
  "/photos/IMG_1528.jpg",
  "/photos/IMG_1563.jpg",
  "/photos/IMG_2486.jpg",
];

/* ──────────────────────────────────────────────────────────────────────────
   THEME TOGGLE COMPONENT (Dark & Light Mode Persistence)
   ────────────────────────────────────────────────────────────────────────── */
function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-primary cursor-pointer"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary transition-transform duration-200 group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-rotate-12" />
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CV PREVIEW MODAL
   ────────────────────────────────────────────────────────────────────────── */
interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CvModal({ isOpen, onClose }: CvModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mohammed Fahaman Curriculum Vitae"
      onClick={onClose}
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
      >
        {/* Header toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card-elevated px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground">
                Mohammed-Fahaman-Resume.pdf
              </h3>
              <p className="text-xs text-muted-foreground">
                Verified Full-Stack Web Developer &amp; MERN-Stack Developer CV
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="hidden items-center gap-1 rounded-lg border border-border bg-background px-2 py-1 text-xs text-muted-foreground sm:flex">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(75, z - 25))}
                disabled={zoomLevel <= 75}
                aria-label="Zoom out"
                className="p-1 hover:text-foreground disabled:opacity-40 cursor-pointer"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[40px] text-center font-mono text-[11px]">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(175, z + 25))}
                disabled={zoomLevel >= 175}
                aria-label="Zoom in"
                className="p-1 hover:text-foreground disabled:opacity-40 cursor-pointer"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Direct download */}
            <a
              href="/Mohammed-Fahaman-Resume.pdf"
              download="Mohammed-Fahaman-Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV modal"
              className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Document view area */}
        <div className="relative flex-1 overflow-auto bg-background p-4 sm:p-6 flex justify-center">
          <div
            style={{ width: `${zoomLevel}%`, maxWidth: "100%" }}
            className="flex flex-col items-center justify-center transition-all duration-200"
          >
            <img
              src="/resume-preview.png"
              alt="Mohammed Fahaman Resume Preview"
              className="w-full rounded-md border border-border shadow-md object-contain bg-white"
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer toolbar */}
        <div className="flex items-center justify-between border-t border-border bg-card-elevated px-5 py-2.5 text-xs text-muted-foreground">
          <span>Complete Single-Page Professional Curriculum Vitae</span>
          <a
            href="/Mohammed-Fahaman-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Open in new tab <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PROFILE LIGHTBOX
   ────────────────────────────────────────────────────────────────────────── */
interface ProfileLightboxProps {
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

function ProfileLightbox({ activeIndex, onClose, onChangeIndex }: ProfileLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((activeIndex + 1) % PROFILE_IMAGES.length);
      if (e.key === "ArrowLeft") onChangeIndex((activeIndex - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIndex, onClose, onChangeIndex]);

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-foreground transition hover:bg-card-elevated"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="relative z-10 flex max-h-[85vh] max-w-[95vw] items-center justify-center">
        <motion.img
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={PROFILE_IMAGES[activeIndex]}
          alt={`Mohammed Fahaman - Photo ${activeIndex + 1}`}
          className="max-h-[80vh] max-w-full rounded-xl object-contain border border-border shadow-2xl"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((activeIndex - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
          }}
          className="absolute left-3 z-10 grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/90 text-foreground backdrop-blur transition hover:bg-card"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((activeIndex + 1) % PROFILE_IMAGES.length);
          }}
          className="absolute right-3 z-10 grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/90 text-foreground backdrop-blur transition hover:bg-card"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {PROFILE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => onChangeIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              activeIndex === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN PORTFOLIO ROOT (Clean, Art-Directed Editorial Experience)
   ────────────────────────────────────────────────────────────────────────── */
function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const openLightbox = (index = 0) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      {/* Subtle, High-Performance Champagne & Ivory Particle Layer */}
      <BackgroundGlitter />

      {/* Floating Animated Navigation with Sliding Indicator and Illustrated Theme Toggle */}
      <FloatingNavbar
        onOpenCv={() => setCvModalOpen(true)}
        onAvatarClick={() => openLightbox(0)}
      />

      {/* Hero Section */}
      <Hero
        onOpenCv={() => setCvModalOpen(true)}
        onAvatarClick={() => openLightbox(0)}
      />

      {/* Projects Section */}
      <Projects />

      {/* Technical Skills Section */}
      <Skills />

      {/* Professional Experience Section */}
      <Experience />

      {/* Education Section */}
      <Education />

      {/* Certifications & Badges Section */}
      <CertificationsAndBadges />

      {/* About Section */}
      <About onOpenGallery={(idx) => openLightbox(idx)} />

      {/* Technical Strengths Section */}
      <TechnicalStrengths />

      {/* Contact Section */}
      <Contact onOpenCv={() => setCvModalOpen(true)} />

      {/* Footer */}
      <Footer onAvatarClick={() => openLightbox(0)} />

      {/* Modals */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />

      {lightboxOpen && (
        <ProfileLightbox
          activeIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={setActiveImageIndex}
        />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   HERO SECTION (Art-Directed Editorial Composition)
   ────────────────────────────────────────────────────────────────────────── */
function Hero({ onOpenCv, onAvatarClick }: { onOpenCv: () => void; onAvatarClick: () => void }) {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Role, Headline, Introduction, Actions */}
          <div className="lg:col-span-7">
            {/* Understated Role Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Full-Stack Web Developer · MERN-Stack Developer</span>
            </motion.div>

            {/* Expressive Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.1]"
            >
              Building digital products that <span className="italic font-normal text-primary">scale</span> and solve real problems.
            </motion.h1>

            {/* Concise Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I build modern web applications with thoughtful interfaces, reliable backend systems, and maintainable architecture. My focus is on creating practical software that performs well and solves real user problems.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <span>View Projects</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="/Mohammed-Fahaman-Resume.pdf"
                download="Mohammed-Fahaman-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                <Download className="h-4 w-4 text-primary" />
                <span>Download CV</span>
              </a>

              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Preview CV</span>
              </button>
            </motion.div>

            {/* Compact Professional Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-12 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/60 pt-6"
            >
              <a
                href="https://github.com/fahaman"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-border">•</span>
              <a
                href="https://linkedin.com/in/mohammed-fahaman"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Bhatkal, Karnataka, India</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column: Clean Portrait Composition with 4 Floating Badges */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative mx-auto max-w-sm sm:max-w-md"
            >
              {/* Photo Container */}
              <div
                onClick={onAvatarClick}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm cursor-pointer"
              >
                <img
                  src="/fahaman.png"
                  alt="Mohammed Fahaman - Full-Stack Developer"
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-65" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="font-display text-sm font-semibold">Mohammed Fahaman</p>
                    <p className="text-xs text-white/80">Full-Stack &amp; MERN Engineer</p>
                  </div>
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-black/40 text-white backdrop-blur-xs">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {/* BADGE 1: React & TypeScript (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="absolute -top-3 -left-3 hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card/95 px-3 py-1.5 text-xs shadow-md backdrop-blur-xs"
              >
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-foreground">React &amp; TypeScript</span>
              </motion.div>

              {/* BADGE 2: Production-Level Applications (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card/95 px-3 py-1.5 text-xs shadow-md backdrop-blur-xs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-foreground">Production-Level Applications</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PROJECTS SECTION (Visual Portfolio of Real Work, Not Identical Cards)
   ────────────────────────────────────────────────────────────────────────── */
interface ProjectData {
  title: string;
  category: string;
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

const FEATURED_HERO_PROJECT: ProjectData = {
  title: "LearnChart",
  category: "AI Trading Education Platform",
  year: "2025",
  description: "An interactive full-stack learning platform that teaches technical trading through chart pattern analysis, paper trading simulations, and AI-assisted insights. Built with role-based student and instructor access, responsive dashboards, and TradingView charting integration.",
  highlights: [
    "Optimized MongoDB aggregations, reducing query response times by 30% under concurrency",
    "Implemented JWT Authentication with Role-Based Access Control (RBAC) and protected RESTful APIs",
    "Interactive TradingView charting engine supporting paper trading execution and progress tracking",
  ],
  stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Prisma ORM", "TradingView"],
  liveUrl: "https://learnchart.vercel.app/",
  githubUrl: "https://github.com/fahaman/LearnChart",
};

const SUPPORTING_PROJECTS: ProjectData[] = [
  {
    title: "Businvo",
    category: "Full-Stack SaaS Platform",
    year: "2025",
    description: "A modern business invoicing and operations application built with TanStack Start, React Query, and Tailwind CSS. Features dynamic invoice and estimate generation, high-performance client routing, and cached state management.",
    highlights: [
      "Dynamic invoice & estimate builder with instant PDF calculation",
      "TanStack Start server-side rendering with full route safety",
      "React Query cached state management eliminating redundant API calls",
    ],
    stack: ["TanStack Start", "React Query", "Tailwind CSS", "TypeScript", "Vite"],
    liveUrl: "https://nexora-ai-sigma-two.vercel.app",
    githubUrl: "https://github.com/fahaman/Businvo",
  },
  {
    title: "HelpHive",
    category: "Community Support Marketplace",
    year: "2024",
    description: "A community marketplace connecting residents with verified local service professionals. Features end-to-end authentication, provider onboarding, and clean CRUD operations built on normalized data schemas.",
    highlights: [
      "Provider onboarding pipeline with credential verification",
      "RESTful API backend supporting verified provider listings",
      "Responsive interface engineered with Tailwind CSS",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    liveUrl: "https://the-help-hive.vercel.app/",
    githubUrl: "https://github.com/fahaman/The-Help-Hive",
  },
];

const ADDITIONAL_PROJECTS: ProjectData[] = [
  {
    title: "LearnChart Trading Agent",
    category: "Autonomous AI System",
    year: "2025",
    description: "Autonomous trading bot utilizing Anthropic Claude 3.5 Sonnet to parse market structures and execute perpetual futures on Hyperliquid with strict programmatic risk parameters.",
    highlights: ["Anthropic Claude context reasoning", "Hyperliquid API execution on Render"],
    stack: ["Python", "Claude 3.5", "Hyperliquid API", "Render"],
    liveUrl: "https://learnchart-trading-agent.onrender.com/",
    githubUrl: "https://github.com/fahaman/LearnChart-Trading-Agent",
  },
  {
    title: "Employee Management System",
    category: "Enterprise HR Portal",
    year: "2024",
    description: "Workforce directory and departmental allocation platform streamlining employee records, performance reviews, and administrative permission workflows.",
    highlights: ["Multi-tier role management", "Centralized staff directory"],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://employee-management-system-two-swart.vercel.app/",
    githubUrl: "https://github.com/fahaman/Employee-Management-System",
  },
  {
    title: "MediaSearch",
    category: "Media Indexing Engine",
    year: "2024",
    description: "High-performance multimedia search and discovery engine featuring real-time debounced queries, responsive media cards, and rating metadata.",
    highlights: ["Debounced real-time REST API consumption", "Responsive modular UI"],
    stack: ["JavaScript", "React.js", "REST APIs", "CSS Modules"],
    liveUrl: "https://media-search-liyyyepoo-mohammedfahaman5-3784s-projects.vercel.app/",
    githubUrl: "https://github.com/fahaman/MediaSearch",
  },
];

function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-wider text-primary">PORTFOLIO</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Selected Projects
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              A selection of applications demonstrating my approach to interface design, backend engineering, and practical problem-solving.
            </p>
          </div>
        </Reveal>

        {/* 1. HERO FEATURED PROJECT: LearnChart */}
        <Reveal delay={0.05}>
          <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10 transition-colors hover:border-primary/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono text-primary font-medium">{FEATURED_HERO_PROJECT.category}</span>
              <span className="font-mono">{FEATURED_HERO_PROJECT.year}</span>
            </div>

            <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {FEATURED_HERO_PROJECT.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {FEATURED_HERO_PROJECT.description}
                </p>

                <ul className="mt-5 space-y-2 text-xs text-muted-foreground sm:text-sm">
                  {FEATURED_HERO_PROJECT.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                  {FEATURED_HERO_PROJECT.stack.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-background px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {FEATURED_HERO_PROJECT.liveUrl && (
                    <a
                      href={FEATURED_HERO_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {FEATURED_HERO_PROJECT.githubUrl && (
                    <a
                      href={FEATURED_HERO_PROJECT.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Graphic / Visual Anchor */}
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] rounded-xl border border-border bg-card-elevated p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono">Architecture Spec</span>
                    <span className="text-emerald-500 font-medium">Production Ready</span>
                  </div>
                  <div className="space-y-3 my-auto">
                    <div className="text-xs font-mono text-foreground font-semibold">
                      JWT Auth + RBAC Middleware
                    </div>
                    <div className="text-xs text-muted-foreground">
                      TradingView embedded charting with student progress analytics.
                    </div>
                    <div className="text-xs text-muted-foreground">
                      MongoDB aggregations tuned for 30% latency reduction.
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-primary">
                    learnchart.vercel.app
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. SUPPORTING FEATURED PROJECTS (Businvo & HelpHive) */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {SUPPORTING_PROJECTS.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 0.05}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 transition-colors hover:border-primary/50">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono text-primary">{project.category}</span>
                    <span className="font-mono">{project.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-muted-foreground">
                    {project.stack.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-background px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Preview</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 3. ADDITIONAL CURATED WORK (Clean List/Grid) */}
        <div className="mt-12">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground uppercase">
            Additional Verified Work
          </h3>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {ADDITIONAL_PROJECTS.map((item) => (
              <div
                key={item.title}
                className="py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-card/50 px-2 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-base font-bold text-foreground">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground max-w-xl">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex gap-1.5 text-[11px] font-mono text-muted-foreground">
                    {item.stack.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-card border border-border rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SKILLS SECTION (Clean Editorial Groups, NOT Endless Outlined Badges)
   ────────────────────────────────────────────────────────────────────────── */
function Skills() {
  const skillGroups = [
    {
      category: "Frontend Development",
      icon: <Layers className="h-4 w-4 text-primary" />,
      description: "Component systems, reactive state, and responsive interfaces.",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "TanStack Router", "Framer Motion", "HTML5 & Semantic Web"],
    },
    {
      category: "Backend Development",
      icon: <Server className="h-4 w-4 text-primary" />,
      description: "Robust server logic, RESTful services, and authentication pipelines.",
      skills: ["Node.js", "Express.js", "Python", "RESTful APIs", "JWT Authentication", "Role-Based Access Control (RBAC)", "API Design"],
    },
    {
      category: "Databases",
      icon: <Database className="h-4 w-4 text-primary" />,
      description: "Data modeling, schema design, and query optimization.",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma ORM", "Redis", "Vector Databases"],
    },
    {
      category: "Cloud and Deployment",
      icon: <Cloud className="h-4 w-4 text-primary" />,
      description: "Cloud platforms, containerization, and automated hosting.",
      skills: ["Google Cloud Platform", "Docker", "Vercel", "Render", "CI/CD Workflows", "Cloud Storage"],
    },
    {
      category: "AI Integrations",
      icon: <Award className="h-4 w-4 text-primary" />,
      description: "Generative AI models, prompt design, and retrieval architectures.",
      skills: ["Vertex AI", "Prompt Design", "Claude 3.5 Sonnet", "RAG Pipelines", "Embeddings", "LLM Integration"],
    },
    {
      category: "Developer Tools and Testing",
      icon: <Wrench className="h-4 w-4 text-primary" />,
      description: "Version control, workflow efficiency, and web accessibility.",
      skills: ["Git & GitHub", "Linux CLI", "Postman", "Vite", "VS Code", "Power BI", "WCAG 2.2 AA"],
    },
  ];

  return (
    <section id="skills" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div>
            <span className="text-xs font-mono tracking-wider text-primary">CAPABILITIES</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Technical Skills
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Technologies and tools I use to build, test, and maintain web applications.
            </p>
          </div>
        </Reveal>

        {/* Clean Editorial Layout with Subtle Column Separators */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {skillGroups.map((group, idx) => (
            <div key={group.category} className="lg:col-span-6 border-b border-border/60 pb-8 last:border-b-0">
              <Reveal delay={idx * 0.04}>
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-card">
                    {group.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {group.category}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {group.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground">
                  {group.skills.map((skill) => (
                    <span key={skill} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SECTION A: PROFESSIONAL EXPERIENCE
   ────────────────────────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div>
            <span className="text-xs font-mono tracking-wider text-primary">WORK HISTORY</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Professional Experience
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Practical engineering support, infrastructure management, and technical collaboration across production events.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 max-w-3xl">
          <Reveal delay={0.05}>
            <div className="relative border-l-2 border-border pl-6 sm:pl-8 space-y-3">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Technical Operations Support
                </h3>
                <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded-md border border-border bg-card">
                  Aug 2024 – Oct 2025
                </span>
              </div>
              <p className="text-xs text-primary font-medium">INF NGO · Karnataka, India</p>

              <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                Delivered on-site software, hardware, and event infrastructure support during large-scale exhibitions.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Resolved 20+ software and infrastructure incidents, ensuring uninterrupted operations across multi-day exhibitions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Assisted 500+ attendees with real-time software troubleshooting, network configuration, and technical coordination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Collaborated with cross-functional technical teams to streamline operations and monitor network uptime.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SECTION B: EDUCATION
   ────────────────────────────────────────────────────────────────────────── */
function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div>
            <span className="text-xs font-mono tracking-wider text-primary">ACADEMIC BACKGROUND</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Education &amp; Qualifications
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Formal foundations in computer science, software engineering principles, and core systems programming.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-4xl">
          <Reveal delay={0.05}>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">2023 – 2026</span>
                  <span className="text-xs font-mono font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    8.4 CGPA
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Anjuman Institute of Management and Computer Application
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  Core coursework: Data Structures &amp; Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-[11px] text-muted-foreground">
                Elected Class Representative (3rd Year)
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">2021 – 2023</span>
                  <span className="text-xs font-mono font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    82% Distinction
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Pre-University Course (PUC)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Anjuman Pre-University College
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  Concentration in Computer Science, Mathematics, and Physics with high honors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-[11px] text-muted-foreground">
                Distinction in Computer Science
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CERTIFICATIONS & SKILL BADGES (Open, Refined Showcase)
   ────────────────────────────────────────────────────────────────────────── */
interface CertItem {
  title: string;
  org: string;
  date: string;
  image: string;
  badge: string;
  pdf?: string;
  skills: string[];
}

const CERTIFICATES: CertItem[] = [
  {
    title: "Designing Scalable RAG Pipelines",
    org: "Scaler Masterclass",
    date: "Oct 21, 2026",
    image: "/certs/scaler-rag-masterclass.png",
    badge: "Masterclass",
    skills: ["RAG Pipelines", "Vector Databases", "Embeddings"],
  },
  {
    title: "Unlocking Claude - Advanced AI Tools",
    org: "be10x Masterclass",
    date: "Oct 6, 2026",
    image: "/certs/claude-ai-tools.png",
    badge: "Certified",
    pdf: "/certs/pdf/claude-ai-tools.pdf",
    skills: ["Claude 3.5 Sonnet", "Prompt Engineering", "AI Productivity"],
  },
  {
    title: "Power BI Workshop",
    org: "Officemaster",
    date: "Jun 29, 2025",
    image: "/certs/power-bi-cert.png",
    badge: "Workshop",
    pdf: "/certs/pdf/Certificate.pdf",
    skills: ["Power BI", "Data Modeling", "Business Intelligence"],
  },
  {
    title: "Advanced SEO Certification",
    org: "Simplilearn",
    date: "Sep 20, 2022",
    image: "/certs/simplilearn-seo.png",
    badge: "Certified",
    pdf: "/certs/pdf/simplilearn.pdf",
    skills: ["Technical SEO", "Content Optimization", "Analytics"],
  },
  {
    title: "Git & GitHub Certification",
    org: "Coursera",
    date: "2024",
    image: "/certs/coursera-git-github.png",
    badge: "Certified",
    pdf: "/certs/pdf/coursera-git-github.pdf",
    skills: ["Git CLI", "GitHub Workflows", "Branching & Merging"],
  },
];

interface SkillBadgeItem {
  title: string;
  org: string;
  date: string;
  image: string;
  badge: "Skill Badge" | "Completion";
}

const SKILL_BADGES: SkillBadgeItem[] = [
  {
    title: "Implement Speech & Language Solutions",
    org: "Google Cloud",
    date: "2025",
    image: "/certs/gcloud-speech-language.png",
    badge: "Skill Badge",
  },
  {
    title: "Implement DevOps Workflows in Google Cloud",
    org: "Google Cloud",
    date: "2025",
    image: "/certs/gcloud-devops-workflows.png",
    badge: "Skill Badge",
  },
  {
    title: "Analyze Speech and Language with Google APIs",
    org: "Google Cloud",
    date: "2025",
    image: "/certs/gcloud-analyze-speech.png",
    badge: "Skill Badge",
  },
  {
    title: "Develop Your Google Cloud Network",
    org: "Google Cloud",
    date: "2025",
    image: "/certs/gcloud-develop-network.png",
    badge: "Skill Badge",
  },
  {
    title: "Implement Event-Driven Messaging and Automation",
    org: "Google Cloud",
    date: "2025",
    image: "/certs/gcloud-event-driven.png",
    badge: "Skill Badge",
  },
  {
    title: "Set Up a Google Cloud Network",
    org: "Google Cloud",
    date: "2025",
    image: "/certs/gcloud-setup-network.png",
    badge: "Skill Badge",
  },
  {
    title: "Prompt Design in Vertex AI",
    org: "Google Cloud",
    date: "Jul 27, 2025",
    image: "/certs/prompt-design-vertex-ai.png",
    badge: "Skill Badge",
  },
  {
    title: "Introduction to Data Analytics on Google Cloud",
    org: "Google Cloud",
    date: "Aug 17, 2025",
    image: "/certs/data-analytics.png",
    badge: "Completion",
  },
  {
    title: "Introduction to AI and Machine Learning on Google Cloud",
    org: "Google Cloud",
    date: "Aug 12, 2025",
    image: "/certs/ai-ml-gcloud.png",
    badge: "Completion",
  },
  {
    title: "Professional Machine Learning Engineer Study Guide",
    org: "Google Cloud",
    date: "Aug 9, 2025",
    image: "/certs/ml-engineer-study.png",
    badge: "Completion",
  },
  {
    title: "Responsible AI: Applying AI Principles with Google Cloud",
    org: "Google Cloud",
    date: "Jul 27, 2025",
    image: "/certs/responsible-ai-principles.png",
    badge: "Completion",
  },
  {
    title: "Introduction to Responsible AI",
    org: "Google Cloud",
    date: "Jul 24, 2025",
    image: "/certs/responsible-ai.png",
    badge: "Completion",
  },
  {
    title: "Introduction to Large Language Models",
    org: "Google Cloud",
    date: "Jul 23, 2025",
    image: "/certs/llm.png",
    badge: "Completion",
  },
  {
    title: "Introduction to Generative AI",
    org: "Google Cloud",
    date: "Jul 23, 2025",
    image: "/certs/generative-ai.png",
    badge: "Completion",
  },
];

function CertificationsAndBadges() {
  const [activeTab, setActiveTab] = useState<"all" | "certs" | "badges">("all");
  const [previewItem, setPreviewItem] = useState<{
    title: string;
    org: string;
    date: string;
    image: string;
    pdf?: string;
  } | null>(null);

  useEffect(() => {
    if (!previewItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [previewItem]);

  return (
    <section id="certifications" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <span className="text-xs font-mono tracking-wider text-primary">CREDENTIALS</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Verified Certifications &amp; Cloud Badges
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-md px-3 py-1.5 transition cursor-pointer font-medium ${
                  activeTab === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All (19)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("certs")}
                className={`rounded-md px-3 py-1.5 transition cursor-pointer font-medium ${
                  activeTab === "certs" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Certificates (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("badges")}
                className={`rounded-md px-3 py-1.5 transition cursor-pointer font-medium ${
                  activeTab === "badges" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Skill Badges (14)
              </button>
            </div>
          </div>
        </Reveal>

        {/* 1. Course Certificates */}
        {(activeTab === "all" || activeTab === "certs") && (
          <div className="mt-12">
            <h3 className="font-display text-lg font-bold text-foreground">
              Masterclasses &amp; Course Certifications
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setPreviewItem(cert)}
                      className="aspect-[16/10] overflow-hidden rounded-lg border border-border bg-background/50 flex items-center justify-center p-2 cursor-pointer group"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-102"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="text-primary font-medium">{cert.org}</span>
                        <span>{cert.date}</span>
                      </div>
                      <h4 className="mt-1 font-display text-sm font-bold text-foreground">
                        {cert.title}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewItem(cert)}
                      className="text-primary hover:underline font-medium cursor-pointer"
                    >
                      Preview Document
                    </button>
                    {cert.pdf && (
                      <a href={cert.pdf} download className="text-muted-foreground hover:text-foreground">
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Google Cloud Skill Badges */}
        {(activeTab === "all" || activeTab === "badges") && (
          <div className="mt-16">
            <h3 className="font-display text-lg font-bold text-foreground">
              Google Cloud &amp; AI Competencies
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {SKILL_BADGES.map((b) => (
                <div
                  key={b.title}
                  onClick={() => setPreviewItem(b)}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary cursor-pointer flex flex-col items-center text-center justify-between"
                >
                  <div className="h-24 w-24 flex items-center justify-center my-2">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="max-h-24 max-w-24 object-contain transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-primary uppercase">{b.badge}</span>
                    <h4 className="mt-1 font-display text-xs font-semibold text-foreground line-clamp-2">
                      {b.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-muted-foreground">{b.org} · {b.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal preview */}
        {previewItem && (
          <div
            onClick={() => setPreviewItem(null)}
            className="fixed inset-0 z-[240] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {previewItem.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{previewItem.org} · {previewItem.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center p-2 bg-background rounded-lg">
                <img
                  src={previewItem.image}
                  alt={previewItem.title}
                  className="max-h-[68vh] w-auto max-w-full rounded object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ABOUT SECTION (Natural, Personal Tone with Art-Directed Portrait)
   ────────────────────────────────────────────────────────────────────────── */
function About({ onOpenGallery }: { onOpenGallery: (index: number) => void }) {
  const [activePhoto, setActivePhoto] = useState(1);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhoto((prev) => (prev + 1) % PROFILE_IMAGES.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhoto((prev) => (prev - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
  };

  return (
    <section id="about" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-wider text-primary">ABOUT MOHAMMED FAHAMAN</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Building Reliable Software with Purpose
            </h2>
          </div>
        </Reveal>

        {/* Balanced Responsive Two-Column Layout */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Heading, Introduction, Compact Info Row & Links */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <Reveal delay={0.04}>
                <p>
                  I'm a Full-Stack Web Developer focused on building scalable, high-performance web applications with React, TypeScript, Node.js, and MongoDB. I specialize in crafting intuitive user interfaces, developing robust backend services and REST APIs, and designing efficient data architectures to deliver seamless, reliable, and maintainable digital experiences.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  I prioritize clean code, scalable architecture, performance, and usability to build reliable, maintainable applications. From crafting seamless frontend experiences to developing secure backend systems, implementing authentication, and integrating third-party services, I focus on delivering practical, well-engineered solutions that address real-world needs.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  I continuously strengthen my engineering skills through hands-on projects, experimentation, and ongoing learning. My goal is to build efficient, accessible, and dependable digital solutions that deliver meaningful value to users and businesses.
                </p>
              </Reveal>
            </div>

            {/* Compact Information Row & Profile Links */}
            <Reveal delay={0.16}>
              <div className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-xs">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block tracking-wider">Location</span>
                    <span className="font-medium text-foreground mt-0.5 block">Bhatkal, Karnataka, India</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block tracking-wider">Education</span>
                    <span className="font-medium text-foreground mt-0.5 block">BCA Candidate (2023–2026)</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href="https://github.com/fahaman"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 font-medium text-foreground transition hover:border-primary hover:text-primary cursor-pointer"
                  >
                    <Github className="h-3.5 w-3.5 text-primary" />
                    <span>github.com/fahaman</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  </a>
                  <a
                    href="https://linkedin.com/in/mohammed-fahaman"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 font-medium text-foreground transition hover:border-primary hover:text-primary cursor-pointer"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-primary" />
                    <span>linkedin.com/in/mohammed-fahaman</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Art-Directed Portrait Matched to Text Height */}
          <div className="lg:col-span-5 flex">
            <Reveal delay={0.08} className="w-full flex h-full">
              {/* Main Active Image with Controls */}
              <div
                onClick={() => onOpenGallery(activePhoto)}
                className="group relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm cursor-pointer transition-all duration-300 hover:border-primary/50"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={PROFILE_IMAGES[activePhoto]}
                    alt={`Mohammed Fahaman - Photograph ${activePhoto + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Left/Right Interactive Switch Controls */}
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition hover:bg-black/85 hover:scale-105 cursor-pointer z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition hover:bg-black/85 hover:scale-105 cursor-pointer z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Bottom Overlay Info & Expand Button */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white z-10 pointer-events-auto">
                  <div>
                    <p className="font-display text-sm font-semibold">Mohammed Fahaman</p>
                    <p className="text-xs text-white/80">Full-Stack Web Developer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] font-mono text-white/90 backdrop-blur-md border border-white/10">
                      {activePhoto + 1} / {PROFILE_IMAGES.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGallery(activePhoto);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md border border-white/10 transition hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer"
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span>Expand</span>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   TECHNICAL STRENGTHS SECTION (Clean 3-Col Desktop, 2-Col Tablet, 1-Col Mobile)
   ────────────────────────────────────────────────────────────────────────── */
function TechnicalStrengths() {
  const categories = [
    {
      title: "Frontend Development",
      icon: Layers,
      description: "Building responsive, component-driven user interfaces with React, TypeScript, and modern CSS. Focused on accessible patterns, robust state management, and fluid interactions.",
      tags: ["React 19", "TypeScript", "Tailwind CSS", "TanStack Router"],
    },
    {
      title: "Backend Development",
      icon: Server,
      description: "Developing robust REST APIs with Node.js and Express.js. Implementing secure JWT authentication, role-based access control (RBAC), input validation, and structured middleware.",
      tags: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
    },
    {
      title: "Databases and Data Modeling",
      icon: Database,
      description: "Designing normalized schemas and managing relational and document databases with MongoDB, PostgreSQL, MySQL, and Prisma ORM for data integrity and speed.",
      tags: ["MongoDB", "PostgreSQL", "MySQL", "Prisma ORM"],
    },
    {
      title: "Application Engineering",
      icon: Terminal,
      description: "Integrating frontend and backend systems with clean architectural separation, structured error handling, third-party API connectivity, and performance optimization.",
      tags: ["API Integration", "Clean Architecture", "Error Handling"],
    },
    {
      title: "Deployment and Integrations",
      icon: Cloud,
      description: "Containerizing services with Docker and deploying production applications on Google Cloud Platform, Vercel, and Render alongside practical Generative AI workflows.",
      tags: ["Google Cloud", "Docker", "Vercel", "Render CI/CD"],
    },
  ];

  return (
    <section id="strengths" className="scroll-mt-24 py-20 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-xs font-mono tracking-wider text-primary">TECHNICAL STRENGTHS</span>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
                Core Competencies &amp; Engineering Focus
              </h2>
            </div>
            <p className="text-xs text-muted-foreground sm:max-w-xs">
              Key technical domains developed and applied across production full-stack systems.
            </p>
          </div>
        </Reveal>

        {/* 3-Column Grid on Desktop, 2 on Tablets, 1 on Mobile */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            const lgSpan = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";
            const mdSpan = idx === 4 ? "md:col-span-2" : "md:col-span-1";

            return (
              <Reveal key={cat.title} delay={idx * 0.05} className={`${lgSpan} ${mdSpan}`}>
                <div className="group h-full flex flex-col justify-between rounded-xl border border-border bg-card/60 p-5 backdrop-blur-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComponent className="h-4 w-4" />
                      </span>
                      <h3 className="font-display text-sm font-semibold text-foreground">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/70 bg-background/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground transition-colors group-hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CONTACT SECTION (Clear Heading, Direct Information, Working Form)
   ────────────────────────────────────────────────────────────────────────── */
function Contact({ onOpenCv }: { onOpenCv: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err" | "nopass">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("nopass");
      setTimeout(() => setStatus("idle"), 6000);
      return;
    }

    setStatus("sending");
    const fd = new FormData(formRef.current);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  (fd.get("name")    as string) ?? "",
          from_email: (fd.get("email")   as string) ?? "",
          subject:    (fd.get("subject") as string) ?? "",
          message:    (fd.get("message") as string) ?? "",
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("ok");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("err");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div>
            <span className="text-xs font-mono tracking-wider text-primary">GET IN TOUCH</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let's Discuss Projects, Roles, or Ideas
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              I’m open to full-time engineering roles, remote opportunities, and contract-based projects, where I can contribute my technical expertise to building scalable, reliable, and user-focused software solutions.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Direct Contact Details */}
          <div className="space-y-6 lg:col-span-5">
            <h3 className="font-display text-base font-semibold text-foreground">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href="mailto:mohammedfahaman5@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition hover:border-primary"
              >
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase">Email</div>
                  <div className="font-mono text-foreground font-medium">mohammedfahaman5@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+919108352988"
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition hover:border-primary"
              >
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase">Phone / WhatsApp</div>
                  <div className="font-mono text-foreground font-medium">+91 9108352988</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/mohammed-fahaman"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition hover:border-primary"
              >
                <Linkedin className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase">LinkedIn</div>
                  <div className="text-foreground font-medium">linkedin.com/in/mohammed-fahaman</div>
                </div>
              </a>

              <a
                href="https://github.com/fahaman"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition hover:border-primary"
              >
                <Github className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase">GitHub</div>
                  <div className="text-foreground font-medium">github.com/fahaman</div>
                </div>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary cursor-pointer mr-3"
              >
                <FileText className="h-4 w-4 text-primary" />
                Preview CV
              </button>
              <a
                href="/Mohammed-Fahaman-Resume.pdf"
                download="Mohammed-Fahaman-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="rounded-xl border border-border bg-card p-6 sm:p-8"
            >
              <h3 className="font-display text-base font-semibold text-foreground">
                Send a Message
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Fill out this form and I will respond within 24 hours.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-muted-foreground">Subject / Opportunity</label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Full-Stack Developer Role / Project Discussion"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
                />
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your team, tech requirements, or project timeline..."
                  className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-muted-foreground">
                  {status === "ok" && <span className="text-primary font-medium">✓ Message sent! I will reply within 24h.</span>}
                  {status === "err" && <span className="text-red-500">Failed to send — please email directly.</span>}
                  {status === "nopass" && <span className="text-amber-500">Email service not configured — please use direct email.</span>}
                  {status === "idle" && "Typical response time: under 24 hours"}
                  {status === "sending" && "Transmitting message..."}
                </span>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────────────────────── */
function Footer({ onAvatarClick }: { onAvatarClick: () => void }) {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div
                onClick={onAvatarClick}
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-card shadow-xs transition hover:border-primary cursor-pointer"
              >
                <img
                  src="/fahaman.png"
                  alt="Mohammed Fahaman"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="font-display font-bold text-base text-foreground block">
                  Mohammed Fahaman
                </span>
                <span className="text-xs text-primary font-mono block">
                  Full-Stack Web Developer
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-sm pt-1">
              Building practical web applications with thoughtful interfaces and reliable backend systems.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end text-xs">
            <div className="space-y-2">
              <span className="font-mono text-primary uppercase text-[11px]">Pages</span>
              <div><a href="#top" className="text-muted-foreground hover:text-foreground">Home</a></div>
              <div><a href="#projects" className="text-muted-foreground hover:text-foreground">Projects</a></div>
              <div><a href="#skills" className="text-muted-foreground hover:text-foreground">Skills</a></div>
              <div><a href="#experience" className="text-muted-foreground hover:text-foreground">Experience</a></div>
              <div><a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a></div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-primary uppercase text-[11px]">Legal</span>
              <div><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></div>
              <div><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></div>
              <div><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-primary uppercase text-[11px]">Connect</span>
              <div><a href="https://linkedin.com/in/mohammed-fahaman" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">LinkedIn</a></div>
              <div><a href="https://github.com/fahaman" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub</a></div>
              <div><a href="https://www.instagram.com/mohammed_fahaman/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">Instagram</a></div>
              <div><a href="https://www.snapchat.com/add/fahamxn" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">Snapchat</a></div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Mohammed Fahaman. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
