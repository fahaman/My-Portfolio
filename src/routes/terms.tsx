import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Scale,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Copyright,
} from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Mohammed Fahaman" },
      {
        name: "description",
        content:
          "Terms of service and acceptable usage guidelines for Mohammed Fahaman's portfolio website.",
      },
      {
        property: "og:title",
        content: "Terms and Conditions | Mohammed Fahaman",
      },
      {
        property: "og:description",
        content:
          "Terms of service and intellectual property notice for Mohammed Fahaman's developer portfolio.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            <Scale className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">
              Terms of Service
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <Scale className="h-3.5 w-3.5" />
          <span>Terms & Conditions</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: October 2026 • Effective Date: October 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Copyright className="h-5 w-5 text-primary" />
              1. Intellectual Property
            </h2>
            <p className="mt-3">
              All contents of this website — including code demonstrations,
              design aesthetics, written project case studies, and personal
              photography — are the property of{" "}
              <strong className="text-foreground">Mohammed Fahaman</strong>{" "}
              unless otherwise stated (such as open-source libraries or
              third-party logos like Google Cloud, React, etc.).
            </p>
            <p className="mt-2">
              Open-source repositories referenced in the portfolio are subject
              to their respective open-source licenses (e.g., MIT, Apache 2.0).
            </p>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <FileCode className="h-5 w-5 text-primary" />
              2. Permitted Use
            </h2>
            <p className="mt-3">
              You are welcome to browse this portfolio, view interactive
              demonstrations, download my curriculum vitae (resume), and submit
              professional inquiries via the contact form.
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>
                  You may review code samples and architectural designs for
                  recruitment or educational purposes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-destructive" />
                <span>
                  You may not scrape, frame, clone, or misrepresent this website
                  or its original content as your own work.
                </span>
              </li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <AlertCircle className="h-5 w-5 text-primary" />
              3. Disclaimer of Warranties
            </h2>
            <p className="mt-3">
              This portfolio is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis for informational and professional
              demonstration purposes. While every effort is made to maintain
              accurate project details, certifications, and availability, no
              warranty is provided that the site will be error-free or
              uninterrupted at all times.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Scale className="h-5 w-5 text-primary" />
              4. Governing Law
            </h2>
            <p className="mt-3">
              These terms are governed in accordance with the laws of India. For
              any questions regarding collaboration terms or contracts, please
              get in touch directly at{" "}
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
