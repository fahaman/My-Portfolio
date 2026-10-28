# Mohammed Fahaman — Full Stack Developer & AI Engineer Portfolio

A modern, high-performance, and accessible developer portfolio application built with React 19, TanStack Start / Router, TypeScript, and Tailwind CSS.

![Portfolio Preview](/fahaman.jpeg)

## Features

- **Blazing Fast Performance**: Powered by Vite and TanStack Start SSR/SSG capabilities with minimal client bundle overhead.
- **Modern Design System**: Sleek dark and light mode themes, glassmorphism card surfaces, and subtle micro-animations powered by Framer Motion.
- **Comprehensive Project Showcase**: Detailed breakdowns of real-world production applications, tech stacks, and direct GitHub links.
- **Verified Credentials & Badges**: 15+ verified Google Cloud skill badges, Scaler RAG masterclass certificates, Anthropic Claude prompting certifications, and downloadable PDFs.
- **Lightbox Image Gallery**: Keyboard-navigable accessible photo lightbox with smooth slide transitions and touch responsiveness.
- **Interactive Contact Form**: Client-validated inquiry form integrated seamlessly with EmailJS for instant delivery without requiring dedicated backend server maintenance.
- **Fully Accessible (WCAG 2.2 AA)**: Semantic HTML5 landmarks, visible focus rings, ARIA labels, and logical heading hierarchies.
- **Complete Legal Suite**: Dedicated `/privacy`, `/terms`, and `/cookies` routes fulfilling GDPR, DPDP, and transparency best practices.
- **SEO & Search Optimized**: Structured JSON-LD schema (Person metadata), Open Graph tags, Twitter card support, dynamic `sitemap.xml`, and strict `robots.txt`.

## Tech Stack

- **Framework**: React 19 + TanStack Start / TanStack Router
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 + PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Typography**: Inter & Outfit (Google Fonts)
- **Deployment Targets**: Cloudflare Pages / Workers, Vercel, Netlify

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fahaman/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Provide your EmailJS service credentials in `.env`:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run development server:**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your web browser.

5. **Build for production:**

   ```bash
   npm run build
   ```

6. **Preview production build locally:**
   ```bash
   npm run preview
   ```

## Documentation

Full architectural documentation is available in the `docs/` directory:

- [Planning & Requirements](docs/01-planning/PROJECT_REQUIREMENTS.md)
- [Design System & UI/UX](docs/02-design/DESIGN_SYSTEM.md)
- [System Architecture](docs/03-architecture/ARCHITECTURE.md)
- [Frontend Architecture](docs/05-frontend/FRONTEND_ARCHITECTURE.md)
- [Security & Privacy](docs/06-security-privacy/SECURITY_ARCHITECTURE.md)
- [Testing & Quality Assurance](docs/08-testing-quality/TESTING_STRATEGY.md)
- [Deployment & Operations](docs/09-deployment-operations/DEPLOYMENT.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
