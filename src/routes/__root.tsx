import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary font-display">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error("Application error boundary:", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred while loading this page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 cursor-pointer"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

const themeInitScript = `
(function() {
  try {
    var savedTheme = localStorage.getItem('portfolio-theme');
    var theme = savedTheme;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title:
            "Mohammed Fahaman | Full-Stack Web Developer | MERN-Stack Developer",
        },
        {
          name: "description",
          content:
            "Portfolio of Mohammed Fahaman — Full-Stack Web Developer & MERN-Stack Developer building scalable web applications, modern APIs, and high-performance cloud architectures.",
        },
        { name: "author", content: "Mohammed Fahaman" },
        { name: "theme-color", content: "#111210" },
        {
          property: "og:title",
          content:
            "Mohammed Fahaman | Full-Stack Web Developer | MERN-Stack Developer",
        },
        {
          property: "og:description",
          content:
            "Full-Stack Web Developer & MERN-Stack Developer building high-impact web products and scalable systems.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Mohammed Fahaman" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "Mohammed Fahaman | Full-Stack Web Developer | MERN-Stack Developer",
        },
        {
          name: "twitter:description",
          content: "Full-Stack Web Developer | MERN-Stack Developer",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous" as const,
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap",
        },
        {
          rel: "preload",
          as: "image",
          href: "/fahaman.png",
        },
      ],
      scripts: [
        {
          children: themeInitScript,
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Mohammed Fahaman",
            jobTitle: "Full-Stack Web Developer | MERN-Stack Developer",
            email: "mohammedfahaman5@gmail.com",
            url: "/",
            sameAs: [
              "https://linkedin.com/in/mohammed-fahaman",
              "https://github.com/fahaman",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bhatkal",
              addressRegion: "Karnataka",
              addressCountry: "IN",
            },
          }),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
