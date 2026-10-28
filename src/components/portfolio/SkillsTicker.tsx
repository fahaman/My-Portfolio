import { motion } from "framer-motion";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

const TECHNOLOGIES: TechItem[] = [
  {
    name: "React",
    icon: (
      <svg className="h-5 w-5 fill-current text-sky-400" viewBox="0 0 24 24">
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10.66-3.82c-.08-.37-.36-.67-.73-.78-2.15-.65-4.88-.95-7.55-.95h-.76c-.05 0-.1 0-.15.01A16.03 16.03 0 0 0 12 1.34c-.3-.22-.72-.22-1.02 0a16.03 16.03 0 0 0-1.47 7.11 11.23 11.23 0 0 0-.91.95c-2.67 0-5.4.3-7.55.95-.37.11-.65.41-.73.78-.14.65-.21 1.32-.21 2s.07 1.35.21 2c.08.37.36.67.73.78 2.15.65 4.88.95 7.55.95.25 0 .5 0 .76-.01A16.03 16.03 0 0 0 12 22.66c.3.22.72.22 1.02 0a16.03 16.03 0 0 0 1.47-7.11c.3-.3.6-.62.91-.95 2.67 0 5.4-.3 7.55-.95.37-.11.65-.41.73-.78.14-.65.21-1.32.21-2s-.07-1.35-.21-2z" />
      </svg>
    ),
  },
  {
    name: "Context API",
    icon: (
      <svg
        className="h-5 w-5 fill-none stroke-current text-sky-300"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path
          d="M12 8v4m0 0l-5 4m5-4l5 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.44 14.88L6.44 11.68V16H5v-7.33h1.44l4.12 5.2V8.67H12v8.21h-1.44z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg className="h-5 w-5 fill-current text-blue-500" viewBox="0 0 24 24">
        <path d="M1.5 1.5h21v21h-21v-21zm19.5 13.5c-.88-.41-2.12-.66-3.12-.66-1.57 0-2.31.76-2.31 1.76 0 2.65 4.31 1.94 4.31 4.54 0 1.53-1.12 2.36-3.23 2.36-1.53 0-2.73-.41-3.64-.87l.62-1.78c.87.41 1.98.66 2.89.66 1.45 0 2.15-.58 2.15-1.49 0-2.61-4.31-1.99-4.31-4.59 0-1.49 1.16-2.4 3.39-2.4 1.4 0 2.44.37 3.06.74l-.75 1.64z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg className="h-5 w-5 fill-current text-amber-400" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm13.7 14.2c1.4 0 2.3-.7 2.3-2.1v-5.4h-2.1v5.3c0 .5-.3.8-.8.8s-.8-.3-.8-.8v-1.9H13v2.1c0 1.3.9 2 2.2 2h1.5zm-6.2 0c1.2 0 2-.6 2.4-1.5l-1.8-1.1c-.2.4-.5.7-.9.7-.5 0-.8-.3-.8-.7 0-.5.3-.8 1.1-1.1 1.7-.7 2.4-1.5 2.4-2.7 0-1.5-1.2-2.5-2.8-2.5-1.5 0-2.5.8-2.8 2l1.8 1.1c.2-.4.4-.7.9-.7.5 0 .8.3.8.7 0 .5-.3.8-1.1 1.1-1.7.7-2.4 1.5-2.4 2.7 0 1.4 1.2 2.5 2.8 2.5h.3z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg className="h-5 w-5 fill-current text-cyan-400" viewBox="0 0 24 24">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg
        className="h-5 w-5 fill-current text-emerald-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7.7v11.6L12 25l10-5.7V7.7L12 2zm1.2 18.1c-.2.1-.5.2-.7.2-.6 0-.9-.3-.9-.9v-3.8c0-.6.3-.9.9-.9.2 0 .5.1.7.2l3.3 1.9c.2.1.3.3.3.6 0 .3-.1.5-.3.6l-3.3 2.1zm-4.4-6.4V9.9c0-.6-.3-.9-.9-.9-.2 0-.5.1-.7.2L3.9 11c-.2.1-.3.3-.3.6 0 .3.1.5.3.6l3.3 1.9c.2.1.5.2.7.2.6 0 .9-.3.9-.9v-.5z" />
      </svg>
    ),
  },
  {
    name: "Express.js",
    icon: (
      <svg className="h-5 w-5 fill-current text-foreground" viewBox="0 0 24 24">
        <path d="M18.8 8l-3.2 4.8 3.5 5.2h-2.3l-2.4-3.7-2.3 3.7H9.8l3.5-5.2L10.1 8h2.3l2.4 3.7L17.2 8h1.6zM5.5 18V8h6.2v1.8H7.6v2.3h3.5v1.8H7.6v2.3h4.2V18H5.5z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg
        className="h-5 w-5 fill-current text-emerald-400"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C11.5 0 11.2.3 11 .7C9.8 3.2 5 11.6 5 16.5C5 20.6 8.1 24 12 24s7-3.4 7-7.5c0-4.9-4.8-13.3-6-15.8c-.2-.4-.5-.7-1-.7zm0 2.2c.4 1 3.8 8.1 4.7 12.3H12V2.2z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg className="h-5 w-5 fill-current text-sky-500" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5h-2v-2h2v2zm0-4h-2V7h2v7.5z" />
      </svg>
    ),
  },
  {
    name: "Redux",
    icon: (
      <svg className="h-5 w-5 fill-current text-purple-400" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm-7 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm3.5-6c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "TanStack",
    icon: (
      <svg className="h-5 w-5 fill-current text-amber-500" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M7 12h10M12 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Vite",
    icon: (
      <svg className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 24 24">
        <path d="M22.5 3.5L12.7 21.6c-.3.5-.9.5-1.2 0L2 3.5c-.3-.6.2-1.2.8-1l9 3.2 8.9-3.2c.7-.2 1.2.4.8 1z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg className="h-5 w-5 fill-current text-foreground" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    icon: (
      <svg className="h-5 w-5 fill-current text-foreground" viewBox="0 0 24 24">
        <path d="M12 1L24 21.75H0L12 1Z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    icon: (
      <svg
        className="h-5 w-5 fill-current text-emerald-400"
        viewBox="0 0 24 24"
      >
        <path d="M21.36 10.36L12 21.68v-7.32H2.64L12 2.32v7.32h9.36z" />
      </svg>
    ),
  },
  {
    name: "Google Cloud",
    icon: (
      <svg className="h-5 w-5 fill-current text-blue-400" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg className="h-5 w-5 fill-current text-sky-400" viewBox="0 0 24 24">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186z" />
      </svg>
    ),
  },
  {
    name: "Prisma ORM",
    icon: (
      <svg className="h-5 w-5 fill-current text-teal-400" viewBox="0 0 24 24">
        <path d="M12 2L3 20.5h18L12 2zm0 4.2l5.5 11.3H6.5L12 6.2z" />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    icon: (
      <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
        <path d="M4 6h16v2H4V6zm2 4h12v2H6v-2zm-2 4h16v2H4v-2zm4 4h8v2H8v-2z" />
      </svg>
    ),
  },
];

export function SkillsTicker() {
  // Double array for seamless infinite looping
  const tickerItems = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section
      aria-label="Core technologies and technical stack"
      className="relative z-10 w-full overflow-hidden border-y border-border/40 bg-card/40 py-4.5 backdrop-blur-xs"
    >
      {/* Side Fade Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

      {/* Marquee Track scrolling to the RIGHT side */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-8 whitespace-nowrap sm:gap-12"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 38,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group flex items-center gap-3 transition-transform duration-200 hover:scale-105"
            >
              {/* Star separator */}
              <span className="text-xs font-semibold text-primary/70 select-none">
                ✦
              </span>

              {/* Icon */}
              <span className="flex h-6 w-6 items-center justify-center opacity-85 transition-opacity duration-200 group-hover:opacity-100">
                {item.icon}
              </span>

              {/* Name */}
              <span className="font-display text-sm font-semibold tracking-tight text-foreground/90 transition-colors duration-200 group-hover:text-primary sm:text-base">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
