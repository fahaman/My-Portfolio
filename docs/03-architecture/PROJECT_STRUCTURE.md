# Project Structure

```
My-Portfolio/
├── docs/                      # Comprehensive technical documentation
│   ├── 01-planning/
│   ├── 02-design/
│   ├── 03-architecture/
│   ├── 04-backend/
│   ├── 05-frontend/
│   ├── 06-security-privacy/
│   ├── 07-integrations/
│   ├── 08-testing-quality/
│   ├── 09-deployment-operations/
│   ├── 10-maintenance/
│   └── 11-launch/
├── public/                    # Static public assets
│   ├── certs/                 # Verified badges & images
│   │   └── pdf/               # Downloadable PDF certificates
│   ├── photos/                # Optimized personal photography
│   ├── FAHAMAN-CV.pdf         # Resume
│   ├── fahaman.jpeg           # Primary profile portrait
│   └── robots.txt             # Search crawler directives
├── src/                       # Application source code
│   ├── components/            # Reusable UI & portfolio components
│   │   ├── portfolio/         # Motion bits, cursor glow, client-only wrappers
│   │   └── ui/                # Radix UI primitives
│   ├── lib/                   # EmailJS client, error reporting, utilities
│   ├── routes/                # File-based TanStack routes
│   │   ├── __root.tsx         # Root layout, HTML shell & JSON-LD
│   │   ├── index.tsx          # Main single-page portfolio view
│   │   ├── privacy.tsx        # Privacy policy route
│   │   ├── terms.tsx          # Terms of service route
│   │   ├── cookies.tsx        # Cookie policy route
│   │   └── sitemap[.]xml.ts   # Dynamic sitemap generator
│   ├── routeTree.gen.ts       # Generated route tree
│   ├── router.tsx             # TanStack router factory
│   └── styles.css             # Tailwind v4 styles & design system tokens
├── AGENTS.md                  # AI coding agent operational guidelines
├── README.md                  # Project overview & developer guide
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
├── SECURITY.md                # Vulnerability disclosure policy
├── LICENSE                    # MIT License
└── package.json               # Dependencies and scripts
```
