import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Mail, Download, MapPin, Sparkles,
  Code2, Database, Cloud, Brain, Wrench, Layers, Server,
  ExternalLink, Award, Trophy, Calendar, CheckCircle2, Send,
  Sun, Moon, Monitor, Palette, GraduationCap, BookOpen,
  Instagram, Ghost, X, ChevronLeft, ChevronRight, Maximize2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "@/lib/send-mail";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Counter, MagneticButton, Reveal } from "@/components/portfolio/motion-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Fahaman — Full Stack Developer & AI Engineer" },
      { name: "description", content: "Mohammed Fahaman is a Full Stack and MERN developer based in India, building scalable web apps, AI-powered tools, and modern digital experiences." },
      { property: "og:title", content: "Mohammed Fahaman — Full Stack Developer" },
      { property: "og:description", content: "Building scalable web apps, AI-powered solutions, and modern digital experiences." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const PROFILE_IMAGES = ["/fahaman.jpeg", "/fahaman2.jpeg"];

interface ProfileLightboxProps {
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

function ProfileLightbox({ activeIndex, onClose, onChangeIndex }: ProfileLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        onChangeIndex((activeIndex + 1) % PROFILE_IMAGES.length);
      }
      if (e.key === "ArrowLeft") {
        onChangeIndex((activeIndex - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIndex, onClose, onChangeIndex]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur transition hover:bg-white/20 hover:scale-105"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="relative z-10 flex max-h-[85vh] max-w-[95vw] items-center justify-center">
        <motion.img
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={PROFILE_IMAGES[activeIndex]}
          alt={`Mohammed Fahaman - Profile ${activeIndex + 1}`}
          className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((activeIndex - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
          }}
          className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 hover:scale-105 sm:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((activeIndex + 1) % PROFILE_IMAGES.length);
          }}
          className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 hover:scale-105 sm:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {PROFILE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => onChangeIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-6 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (index = 0) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CursorGlow />
      <Nav onAvatarClick={() => openLightbox(0)} />
      <Hero />
      <Marquee />
      <About onAvatarClick={() => openLightbox(0)} />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
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

/* ---------------- THEME SELECTOR ---------------- */
type ThemeId = "dark" | "light" | "ocean";

const THEMES: { id: ThemeId; label: string; icon: React.ReactNode; dot: string }[] = [
  { id: "dark",  label: "Dark",  icon: <Moon className="h-3.5 w-3.5" />, dot: "#ffd670" },
  { id: "light", label: "Light", icon: <Sun  className="h-3.5 w-3.5" />, dot: "#b97800" },
  { id: "ocean", label: "Ocean", icon: <Monitor className="h-3.5 w-3.5" />, dot: "#38c8e0" },
];

function ThemeSelector() {
  const [active, setActive] = useState<ThemeId>("dark");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const applyTheme = (id: ThemeId) => {
    const root = document.documentElement;
    if (id === "dark") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", id);
    }
    setActive(id);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = THEMES.find((t) => t.id === active)!;

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Select theme"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2 text-xs font-medium backdrop-blur transition hover:border-[var(--primary)] hover:text-[var(--foreground)]"
        style={{ color: "var(--muted-foreground)" }}
      >
        <Palette className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
        <span className="hidden sm:inline" style={{ color: "var(--foreground)" }}>{current.label}</span>
        <span style={{ color: "var(--muted-foreground)" }}>{current.icon}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-11 z-[100] min-w-[150px] overflow-hidden rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl"
          style={{
            background: "var(--glass-strong-bg)",
            border: "1px solid var(--glass-strong-border)",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => applyTheme(t.id)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium transition"
              style={{
                background: active === t.id ? "color-mix(in srgb, var(--primary) 12%, transparent)" : "transparent",
                color: active === t.id ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.dot, flexShrink: 0, display: "inline-block" }} />
              {t.icon}
              {t.label}
              {active === t.id && (
                <span className="ml-auto" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavAvatar({ onClick }: { onClick?: () => void }) {
  const [error, setError] = useState(false);
  return (
    <span
      onClick={onClick}
      className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-primary-foreground font-bold cursor-pointer transition hover:scale-105"
    >
      {!error ? (
        <img
          src="/fahaman.jpeg"
          alt="Mohammed Fahaman"
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        "F"
      )}
    </span>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ onAvatarClick }: { onAvatarClick?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="glass-strong flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
          <NavAvatar onClick={onAvatarClick} />
          <span className="hidden sm:inline">Mohammed Fahaman</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 lg:hidden"
          >
            <span className="text-lg">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass-strong absolute top-20 left-3 right-3 grid max-w-6xl gap-1 rounded-2xl p-3 sm:left-4 sm:right-4 lg:hidden">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-white/5">
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-24 sm:px-6">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="noise absolute inset-0" />

      {/* Animated gradient orbs — pure CSS replacement for 3D scene */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-gold" />
        <div className="hero-orb hero-orb-steel" />
        <div className="hero-orb hero-orb-blue" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Available for Full-Stack &amp; AI Roles
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-cool">Mohammed</span>{" "}
          <span className="text-gradient-gold">Fahaman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg"
        >
          Full Stack Developer · MERN Engineer · AI Enthusiast. I build scalable web
          applications, AI-powered tools, and modern digital experiences with care
          for craft, speed, and design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-9 sm:gap-3"
        >
          <MagneticButton as="a" href="#projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground gold-glow sm:px-6 sm:py-3 sm:text-sm">
            View Projects <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton as="a" href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-xs font-semibold sm:px-6 sm:py-3 sm:text-sm">
            Let's Talk
          </MagneticButton>
          <a href="mailto:mohammedfahaman5@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary/60 hover:text-foreground sm:px-5 sm:py-3 sm:text-sm">
            <Mail className="h-4 w-4" /> Contact
          </a>
          <a href="/FAHAMAN-CV.pdf" download="FAHAMAN-CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary/60 hover:text-foreground sm:px-5 sm:py-3 sm:text-sm">
            <Download className="h-4 w-4" /> Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-muted-foreground sm:mt-10 sm:gap-4"
        >
          <Social href="https://github.com/fahaman" icon={<Github className="h-4 w-4" />} label="GitHub" />
          <Social href="https://linkedin.com/in/mohammed-fahaman" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
          <Social href="https://www.instagram.com/mohammed_fahaman/" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
          <Social href="https://www.snapchat.com/add/fahamxn" icon={<Ghost className="h-4 w-4" />} label="Snapchat" />
          <Social href="mailto:mohammedfahaman5@gmail.com" icon={<Mail className="h-4 w-4" />} label="Email" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span className="inline-block animate-bounce">↓ Scroll</span>
      </div>
    </section>
  );
}

function Social({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
       className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs transition hover:border-primary/60 hover:text-foreground">
      {icon}<span>{label}</span>
    </a>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Python", "Google Cloud", "Generative AI", "Prisma", "Tailwind", "Express", "MySQL"];
  const row = [...items, ...items];
  return (
    <section aria-hidden className="relative border-y border-white/5 bg-white/[0.015] py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          className="flex gap-8 whitespace-nowrap font-display text-xl text-muted-foreground sm:gap-12 sm:text-2xl md:text-3xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {row.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-8 sm:gap-12">
              {t} <span className="text-primary/70">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ onAvatarClick }: { onAvatarClick?: () => void }) {
  const stats = [
    { v: 200, suffix: "+", label: "Coding problems solved" },
    { v: 5, suffix: "+", label: "Full stack apps shipped" },
    { v: 10, suffix: "+", label: "Certifications earned" },
    { v: 500, suffix: "+", label: "Event attendees supported" },
  ];
  return (
    <section id="about" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>About</SectionTag>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Engineer obsessed with the <span className="text-gradient-gold">craft</span> of shipping software.
              </h2>
              <div>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I'm Mohammed Fahaman — a Full Stack developer from Bhatkal, India. I specialise
                  in the MERN stack and modern AI tooling, building products that are fast, accessible,
                  and a pleasure to use.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  I care deeply about engineering quality, design systems, and the small details
                  that separate good products from forgettable ones. Lately I've been exploring
                  LLMs, generative AI, and prompt engineering to build the next generation of
                  intelligent applications.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["MERN", "Next.js", "TypeScript", "AI / LLMs", "Cloud", "REST APIs"].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary"><Sparkles className="h-5 w-5" /></div>
                  <div>
                    <div className="font-semibold">Currently</div>
                    <div className="text-sm text-muted-foreground">Building AI-powered web products</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  <Info label="Location" value="Bhatkal, IN" />
                  <Info label="Focus" value="Full Stack + AI" />
                  <Info label="Stack" value="MERN · Next.js" />
                  <Info label="Open to" value="Remote roles" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full items-stretch">
              <div
                onClick={onAvatarClick}
                className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl transition hover:border-primary/40"
              >
                <img
                  src="/fahaman.jpeg"
                  alt="Mohammed Fahaman"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">Mohammed Fahaman</h3>
                    <p className="text-[10px] text-muted-foreground">Click to view gallery</p>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/20 text-primary backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="glass rounded-2xl p-5">
                <div className="font-display text-3xl font-bold text-gradient-gold sm:text-4xl">
                  <Counter to={s.v} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
      <span className="h-1 w-1 rounded-full bg-primary" /> {children}
    </div>
  );
}

/* ---------------- SKILLS ---------------- */
function Skills() {
  const groups = [
    { icon: <Layers className="h-4 w-4" />, title: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"] },
    { icon: <Server className="h-4 w-4" />, title: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT", "Prisma ORM"] },
    { icon: <Database className="h-4 w-4" />, title: "Databases", items: ["MongoDB", "MySQL", "Firebase"] },
    { icon: <Code2 className="h-4 w-4" />, title: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
    { icon: <Cloud className="h-4 w-4" />, title: "Cloud", items: ["Google Cloud", "Vercel", "Firebase"] },
    { icon: <Brain className="h-4 w-4" />, title: "AI", items: ["Generative AI", "Prompt Engineering", "LLMs"] },
    { icon: <Wrench className="h-4 w-4" />, title: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
  ];
  return (
    <section id="skills" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>Skills</SectionTag>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            A toolkit built for <span className="text-gradient-gold">modern products</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            From pixel-perfect UI to scalable APIs and AI-powered features — these are the
            tools I reach for every day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-primary/40 sm:rounded-3xl sm:p-6">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/25" />
                <div className="relative flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">{g.icon}</div>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full border border-white/10 bg-background/40 px-3 py-1 text-xs text-foreground/90 transition group-hover:border-primary/30">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  {
    name: "LearnChart",
    tag: "AI Trading Education",
    desc: "An AI-powered platform that teaches trading through chart analysis, paper trading, and structured lessons. Built with role-based access, a responsive learner dashboard, and TradingView integration.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "OpenAI", "TradingView"],
    accent: "from-[#FFD670]/30 to-transparent",
    year: "2025",
  },
  {
    name: "HelpHive",
    tag: "Community Marketplace",
    desc: "A community-driven marketplace for local services. Includes auth, provider onboarding, listings, and a clean, responsive UI on top of a normalized relational schema.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    accent: "from-[#4D6788]/40 to-transparent",
    year: "2024",
  },
  {
    name: "Technical Event Ops",
    tag: "Live Event Infrastructure",
    desc: "Led real-time technical operations for a 500+ attendee event — infrastructure setup, software config, and on-the-fly troubleshooting across 20+ resolved issues.",
    tech: ["Infra", "Networking", "Live Ops", "Team Collab"],
    accent: "from-[#8095B2]/40 to-transparent",
    year: "2024",
  },
];

function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
            <div>
              <SectionTag>Selected Work</SectionTag>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Projects with <span className="text-gradient-gold">real-world impact</span>.
              </h2>
            </div>
            <a href="https://github.com/fahaman" target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
              All projects on GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <ProjectCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 transition hover:border-primary/40 sm:rounded-3xl sm:p-8 md:p-10">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-60 blur-2xl transition group-hover:opacity-100`} />
      <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono">0{index + 1}</span>
            <span>·</span>
            <span>{p.year}</span>
            <span>·</span>
            <span className="text-primary">{p.tag}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl md:text-5xl">{p.name}</h3>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-background/40 px-2.5 py-1 text-[11px] font-mono text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            <a className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90" href="#contact">
              Discuss Project <ArrowUpRight className="h-4 w-4" />
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground" href="https://github.com/fahaman" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> View Code
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-muted-foreground/50 cursor-default select-none">
              <ExternalLink className="h-4 w-4" /> In Development
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a2a44] to-[#0E1525]">
            <div className="bg-grid absolute inset-0 opacity-50" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="font-display text-5xl font-bold text-gradient-gold opacity-60 transition group-hover:scale-105 sm:text-7xl">
                {p.name.charAt(0)}
              </div>
            </div>
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Preview
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- EXPERIENCE ---------------- */
function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>Experience</SectionTag>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Where I've made things <span className="text-gradient-gold">work</span>.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3">
          <div>
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Role</div>
                <h3 className="mt-2 font-display text-xl font-semibold">Technical Operations Support</h3>
                <div className="mt-1 text-sm text-primary">INF NGO</div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> Jul 2025 – Aug 2025
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.05}>
              <ul className="space-y-3">
                {[
                  "Resolved 20+ software, hardware, and infrastructure issues during large-scale NGO exhibitions, ensuring uninterrupted technical operations and system reliability.",
                  "Delivered real-time technical support to 500+ attendees by troubleshooting software, configuring systems, and maintaining event infrastructure.",
                  "Collaborated with cross-functional teams to deploy technical solutions, streamline event workflows, and execute time-sensitive operations successfully.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */
function Education() {
  const educationData = [
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Anjuman Institute of Management and Computer Application",
      location: "Bhatkal, Karnataka, India",
      duration: "June 2023 – June 2026",
      score: "8.4 CGPA",
      scoreLabel: "CGPA",
      desc: "Acquired a comprehensive understanding of core computer science, software engineering principles, and databases. Built multiple MERN stack applications, integrated APIs, and engaged in advanced practical projects in modern web development.",
      highlights: ["Data Structures & Algorithms (DSA)", "Database Management Systems (DBMS)", "Software Engineering & Operating Systems", "Computer Networks"],
    },
    {
      degree: "Second Pre-University Course (PUC)",
      institution: "Anjuman Pre-University College",
      location: "Bhatkal, Karnataka, India",
      duration: "2021 – 2023",
      score: "82%",
      scoreLabel: "Percentage",
      desc: "Focused on computer science fundamentals and mathematics. Acquired solid fundamentals in problem-solving, programming logic, and structural databases, graduating with first-class distinction.",
      highlights: ["Computer Science Fundamentals", "Algorithmic Logic", "Mathematics & Physics"],
    },
    {
      degree: "High School (SSLC / 10th Grade)",
      institution: "Anjuman Islamia Anglo Urdu High School",
      location: "Bhatkal, Karnataka, India",
      duration: "Completed 2021",
      score: "72.32%",
      scoreLabel: "Percentage",
      desc: "Laid robust academic foundations in science and mathematics, sparking an early interest in computer technology, systems, and software.",
      highlights: ["General Sciences", "Mathematics", "Problem Solving"],
    },
  ];

  return (
    <section id="education" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>Education</SectionTag>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            My academic <span className="text-gradient-gold">journey</span>.
          </h2>
        </Reveal>

        <div className="mt-12 relative border-l border-white/10 pl-6 sm:pl-8 ml-4 space-y-12">
          {educationData.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.05}>
              <div className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[43px] top-1.5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-background text-primary group-hover:border-primary/50 transition-colors">
                  <GraduationCap className="h-4 w-4" />
                </div>

                <div className="glass rounded-3xl p-6 sm:p-8 transition duration-300 hover:border-primary/30">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-primary font-medium">{item.duration}</div>
                      <h3 className="mt-1.5 font-display text-xl font-bold leading-tight sm:text-2xl">{item.degree}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{item.institution}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-start rounded-2xl border border-primary/20 bg-primary/5 px-4 py-2 sm:items-end">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.scoreLabel}</span>
                      <span className="font-display text-xl font-bold text-gradient-gold">{item.score}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.desc}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-muted-foreground">
                        <BookOpen className="h-3 w-3 text-primary/80" /> {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
const CERTS = [
  {
    title: "Introduction to Data Analytics on Google Cloud",
    org: "Google Cloud",
    date: "Aug 17, 2025",
    image: "/certs/data-analytics.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Introduction to AI and Machine Learning on Google Cloud",
    org: "Google Cloud",
    date: "Aug 12, 2025",
    image: "/certs/ai-ml-gcloud.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Professional Machine Learning Engineer Study Guide",
    org: "Google Cloud",
    date: "Aug 9, 2025",
    image: "/certs/ml-engineer-study.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Responsible AI: Applying AI Principles with Google Cloud",
    org: "Google Cloud",
    date: "Jul 27, 2025",
    image: "/certs/responsible-ai-principles.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Prompt Design in Vertex AI",
    org: "Google Cloud",
    date: "Jul 27, 2025",
    image: "/certs/prompt-design-skill.png",
    badge: "Skill",
    pdf: undefined,
  },
  {
    title: "Introduction to Responsible AI",
    org: "Google Cloud",
    date: "Jul 24, 2025",
    image: "/certs/responsible-ai.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Introduction to Large Language Models",
    org: "Google Cloud",
    date: "Jul 23, 2025",
    image: "/certs/llm.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Introduction to Generative AI",
    org: "Google Cloud",
    date: "Jul 23, 2025",
    image: "/certs/generative-ai.png",
    badge: "Completion",
    pdf: undefined,
  },
  {
    title: "Power BI Workshop",
    org: "Officemaster",
    date: "2024",
    image: undefined,
    badge: "Workshop",
    pdf: "/certs/pdf/Certificate.pdf",
  },
  {
    title: "Advanced SEO Certification",
    org: "Simplilearn",
    date: "2022",
    image: undefined,
    badge: "Certified",
    pdf: "/certs/pdf/simplilearn.pdf",
  },
  {
    title: "Git & GitHub Certification",
    org: "Coursera",
    date: "2024",
    image: undefined,
    badge: "Certified",
    pdf: "/certs/pdf/coursera-git-github.pdf",
  },
];

function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>Certifications</SectionTag>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Verified, <span className="text-gradient-gold">always learning</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">

                {/* Default state — always visible */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 flex-1 font-display text-sm font-semibold leading-snug">{c.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{c.org}</span>
                    <span>{c.date}</span>
                  </div>
                  {c.pdf && (
                    <a
                      href={c.pdf}
                      download
                      className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-[11px] font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3" /> Download Certificate
                    </a>
                  )}
                </div>

                {/* Hover image overlay — fades in on hover */}
                {c.image && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <img
                      src={c.image}
                      alt={`${c.title} badge`}
                      className="h-36 w-36 rounded-xl object-contain drop-shadow-xl"
                      onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
                    />
                  </div>
                )}

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ACHIEVEMENTS ---------------- */
function Achievements() {
  const items = [
    { v: 200, suffix: "+", label: "Coding Problems Solved", icon: <Code2 className="h-4 w-4" /> },
    { v: 4, suffix: "x", label: "Google Cloud Certified", icon: <Cloud className="h-4 w-4" /> },
    { v: 1, suffix: "", label: "Power BI Certified", icon: <Trophy className="h-4 w-4" /> },
    { v: 5, suffix: "+", label: "Full Stack Apps Built", icon: <Layers className="h-4 w-4" /> },
    { v: 1, suffix: "", label: "Class Representative", icon: <Sparkles className="h-4 w-4" /> },
    { v: 1, suffix: "", label: "Event Coordinator", icon: <Award className="h-4 w-4" /> },
  ];
  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>Achievements</SectionTag>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Numbers I'm <span className="text-gradient-gold">proud of</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.04}>
              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 transition hover:border-primary/40">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary sm:h-14 sm:w-14">{it.icon}</div>
                <div className="min-w-0">
                  <div className="font-display text-2xl font-bold text-gradient-gold sm:text-3xl">
                    <Counter to={it.v} suffix={it.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
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
    } catch (err: unknown) {
      console.error("[EmailJS] send error:", err);
      setStatus("err");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTag>Contact</SectionTag>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Let's build <span className="text-gradient-gold">something great</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="glass h-full rounded-3xl p-6">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  I'm currently open to full-stack and AI engineering roles, contract work,
                  and interesting product collaborations.
                </p>
                <div className="mt-5 space-y-3">
                  <ContactRow
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    display="mohammedfahaman5@gmail.com"
                    href="mailto:mohammedfahaman5@gmail.com"
                  />
                  <ContactRow
                    icon={<Linkedin className="h-4 w-4" />}
                    label="LinkedIn"
                    display="in/mohammed-fahaman"
                    href="https://linkedin.com/in/mohammed-fahaman"
                  />
                  <ContactRow
                    icon={<Github className="h-4 w-4" />}
                    label="GitHub"
                    display="github.com/fahaman"
                    href="https://github.com/fahaman"
                  />
                  <ContactRow
                    icon={<Instagram className="h-4 w-4" />}
                    label="Instagram"
                    display="@mohammed_fahaman"
                    href="https://www.instagram.com/mohammed_fahaman/"
                  />
                  <ContactRow
                    icon={<Ghost className="h-4 w-4" />}
                    label="Snapchat"
                    display="@fahamxn"
                    href="https://www.snapchat.com/add/fahamxn"
                  />
                  <ContactRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="Location"
                    display="Bhatkal, Karnataka, India"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <form ref={formRef} onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="name" label="Name" required />
                  <Field name="email" label="Email" type="email" required />
                </div>
                <div className="mt-4">
                  <Field name="subject" label="Subject" />
                </div>
                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary"
                    placeholder="Tell me about your project, role, or idea…"
                  />
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-muted-foreground">
                    {status === "ok"     && <span style={{ color: "var(--primary)" }}>✓ Message sent! I'll reply within 24h.</span>}
                    {status === "err"    && <span style={{ color: "var(--destructive)" }}>Failed to send — please email me directly.</span>}
                    {status === "nopass" && <span style={{ color: "var(--destructive)" }}>Email not configured yet — see .env setup.</span>}
                    {status === "idle"   && "Avg. response time: 24h"}
                    {status === "sending" && "Sending…"}
                  </span>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground gold-glow transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
                  >
                    Send message <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon, label, display, href
}: {
  icon: React.ReactNode;
  label: string;
  display: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/40 px-4 py-3 transition hover:border-primary/40">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-medium leading-snug [overflow-wrap:anywhere]">{display}</div>
      </div>
    </div>
  );
  return href
    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">{inner}</a>
    : inner;
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary"
        placeholder={label}
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div>© {new Date().getFullYear()} Mohammed Fahaman. Crafted with care.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/fahaman" target="_blank" rel="noreferrer" className="hover:text-primary">GitHub</a>
          <a href="https://linkedin.com/in/mohammed-fahaman" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
          <a href="https://www.instagram.com/mohammed_fahaman/" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
          <a href="https://www.snapchat.com/add/fahamxn" target="_blank" rel="noreferrer" className="hover:text-primary">Snapchat</a>
          <a href="mailto:mohammedfahaman5@gmail.com" className="hover:text-primary">Email</a>
        </div>
      </div>
    </footer>
  );
}
