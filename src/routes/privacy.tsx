import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Mail, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Mohammed Fahaman" },
      { name: "description", content: "Privacy policy for Mohammed Fahaman's developer portfolio, detailing data practices and contact form security." },
      { property: "og:title", content: "Privacy Policy | Mohammed Fahaman" },
      { property: "og:description", content: "Details on personal information protection and communications on mohammedfahaman.dev" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
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
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">GDPR & DPDP Aligned</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Legal & Privacy</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: October 2026 • Effective Date: October 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Eye className="h-5 w-5 text-primary" />
              1. Overview & Scope
            </h2>
            <p className="mt-3">
              This Privacy Policy applies to the personal developer portfolio website of <strong className="text-foreground">Mohammed Fahaman</strong>.
              I respect your privacy and am committed to protecting any personal information you provide when visiting this site or communicating with me.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-primary" />
              2. Information Collected
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                I only collect personal information that you voluntarily choose to share through the Contact form or via direct email correspondence:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span><strong>Full Name:</strong> To identify who is contacting me.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span><strong>Email Address:</strong> To reply to your message, inquiries, or business opportunities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span><strong>Message & Subject Content:</strong> Project briefs, questions, or opportunities you submit.</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                No sensitive financial data, biometric information, or intrusive device trackers are collected by this portfolio.
              </p>
            </div>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Lock className="h-5 w-5 text-primary" />
              3. How Information is Processed & Shared
            </h2>
            <p className="mt-3">
              Your contact requests are processed using <strong className="text-foreground">EmailJS</strong>, a secure service provider that delivers messages directly to my email inbox.
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>Your information is strictly used to evaluate professional inquiries, job opportunities, and software collaboration requests.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>Your data is <strong>never sold, rented, or monetized</strong> with any third-party advertisers or data brokers.</span>
              </li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              4. Data Retention & Your Rights
            </h2>
            <p className="mt-3">
              Inquiries received via the contact form are retained only for as long as necessary to conduct professional dialogue. You hold the following rights:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-background/50 p-4">
                <h3 className="font-semibold text-foreground">Right to Access</h3>
                <p className="mt-1 text-xs">Request confirmation of whether your inquiry data is held and obtain a copy.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-background/50 p-4">
                <h3 className="font-semibold text-foreground">Right to Erasure</h3>
                <p className="mt-1 text-xs">Request permanent deletion of past messages and contact records at any time.</p>
              </div>
            </div>
          </section>

          <section className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2.5">
              <Mail className="h-5 w-5 text-primary" />
              5. Contact Information
            </h2>
            <p className="mt-3">
              For any privacy inquiries or data requests, contact me directly:
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
              <a
                href="mailto:mohammedfahaman5@gmail.com"
                className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                mohammedfahaman5@gmail.com
              </a>
              <span className="rounded-xl border border-white/10 px-4 py-2.5 text-muted-foreground">
                Location: Bhatkal, Karnataka, India
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
