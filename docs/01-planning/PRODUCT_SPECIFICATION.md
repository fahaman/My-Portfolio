# Product Specification

## Product Overview
- **Application Name**: Mohammed Fahaman Portfolio
- **Version**: 1.3.0
- **Platform**: Web (SSR / Static Client via TanStack Start & Nitro)
- **Primary Domain Target**: mohammedfahaman.dev / Cloudflare Workers / Vercel

## Core Feature Specs

### 1. Navigation & Header
- **Desktop**: Centered floating glassmorphism navbar with smooth anchor scrolling and dark/light mode toggle.
- **Mobile**: Sticky header with brand avatar, theme toggle, and collapsible full-screen navigation overlay.

### 2. Selected Projects Showcase
- **Businvo** (formerly Nexora-AI): Full-stack business app with TanStack Start, React Query, and Tailwind CSS ([Live Preview](https://nexora-ai-sigma-two.vercel.app) · [GitHub](https://github.com/fahaman/Businvo)).
- **LearnChart**: AI trading education platform with chart analysis, paper trading, and TradingView ([Live Preview](https://learnchart.vercel.app/) · [GitHub](https://github.com/fahaman/LearnChart)).
- **LearnChart Trading Agent**: Autonomous Claude AI trading bot on Hyperliquid ([Live Preview](https://learnchart-trading-agent.onrender.com/) · [GitHub](https://github.com/fahaman/LearnChart-Trading-Agent)).
- **HelpHive**: Community marketplace for on-demand local services ([Live Preview](https://the-help-hive.vercel.app/) · [GitHub](https://github.com/fahaman/The-Help-Hive)).
- **Employee Management System**: Full-stack workforce HR management portal ([Live Preview](https://employee-management-system-two-swart.vercel.app/) · [GitHub](https://github.com/fahaman/Employee-Management-System)).
- **MediaSearch**: Real-time debounced movie and entertainment discovery engine ([Live Preview](https://media-search-liyyyepoo-mohammedfahaman5-3784s-projects.vercel.app/) · [GitHub](https://github.com/fahaman/MediaSearch)).
- **Ellexo**: E-commerce client integrating Stripe payments, Material UI, and Swiper ([GitHub](https://github.com/fahaman/ellexo)).
- **Technical Event Ops**: Real-time technical operations lead for 500+ attendees.

### 3. Certifications & Badges
- Interactive grid displaying 19 verified credentials with issuance dates, badges, and verification links.
- Instant badge image hover previews on desktop with fallback error handling.
- PDF download triggers for workshop certificates (Officemaster Power BI, Simplilearn SEO, Coursera Git/GitHub, be10x Claude).

### 4. Contact Form & Feedback Loop
- Fields: Name (required), Email (required, regex email validation), Subject (optional), Message (required).
- Submission States: `idle`, `sending`, `ok` (24h turnaround guarantee), `err` (graceful fallback to direct email), and `nopass` (configuration reminder).
