import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cookie, CheckCircle2, Shield, Info } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Mohammed Fahaman" },
      {
        name: "description",
        content:
          "Cookie policy and local storage transparency for Mohammed Fahaman's portfolio website.",
      },
      { property: "og:title", content: "Cookie Policy | Mohammed Fahaman" },
      {
        property: "og:description",
        content:
          "Learn how cookies and browser storage are utilized on mohammedfahaman.dev.",
      },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-foreground transition hover:border-primary/50 hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Cookie className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">
              Cookie Policy
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <Cookie className="h-3.5 w-3.5" />
          <span>Transparency</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: October 2026 • Strict Minimal Tracking Notice
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Shield className="h-5 w-5 text-primary" />
              1. Strict Privacy Philosophy
            </h2>
            <p className="mt-3">
              This portfolio prioritizes visitor privacy.{" "}
              <strong className="text-foreground">
                I do not use third-party advertising cookies, cross-site
                trackers, or behavioral profiling pixels.
              </strong>
            </p>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Info className="h-5 w-5 text-primary" />
              2. Technologies Used & Local Storage
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-muted-foreground">
                    <th className="pb-3 font-semibold">Storage Key / Cookie</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Purpose</th>
                    <th className="pb-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 font-mono text-primary">data-theme</td>
                    <td className="py-3">Local Storage / Attribute</td>
                    <td className="py-3">
                      Stores your selected display theme (dark or light mode)
                    </td>
                    <td className="py-3">Persistent (User controlled)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono text-primary">
                      session state
                    </td>
                    <td className="py-3">In-Memory React State</td>
                    <td className="py-3">
                      Maintains photo gallery lightbox active index during your
                      visit
                    </td>
                    <td className="py-3">Session only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              3. Managing Preferences
            </h2>
            <p className="mt-3">
              Because only essential UI preferences (like the dark/light mode
              toggle) are utilized, no disruptive banner popups or tracking
              consents are mandated. You can clear your browser storage or cache
              at any time using your browser&rsquo;s developer tools or
              settings.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Questions regarding this policy may be directed to{" "}
              <a
                href="mailto:mohammedfahaman5@gmail.com"
                className="text-primary hover:underline"
              >
                mohammedfahaman5@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
