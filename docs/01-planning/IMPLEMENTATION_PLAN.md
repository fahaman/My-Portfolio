# Implementation Plan

## Phase 1: Repository Audit & Dependency Cleanliness
- Review Vite config, TanStack Router setup, and Tailwind v4 configuration.
- Prune unneeded images from profile lightbox gallery (`PXL_...` removed).

## Phase 2: Asset Harmonization & Credential Expansion
- Transfer verified badge images and certificates from `my skills/` into `public/certs/`.
- Register Scaler RAG Masterclass and Claude session certificates in `CERTS` array.
- Update `Skills` matrix to include RAG architecture, Claude API, Vertex AI, and Cloud Networking.

## Phase 3: Design Compliance & UI Refinement
- Eliminate purple gradient accents in favor of electric cyan (`#00B4D8`).
- Transition pill buttons (`rounded-full`) to modern geometric `rounded-xl` components.
- Enhance contrast ratios across dark and light mode themes.

## Phase 4: Legal Pages & Routing Architecture
- Author standalone routes for `/privacy`, `/terms`, and `/cookies`.
- Update TanStack Route Tree and dynamic `sitemap.xml` generator.
- Integrate legal links into navigation footer.

## Phase 5: Verification & Production Build
- Run linting, TypeScript compilation, and production Vite bundle verification.
- Audit mobile viewport behavior and WCAG accessibility markers.
