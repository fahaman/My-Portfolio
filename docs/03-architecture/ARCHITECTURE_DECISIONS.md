# Architectural Decision Records (ADRs)

## ADR-01: Adoption of TanStack Router & File-Based Routing
- **Context**: The portfolio required type-safe routes, dynamic sitemap generation, and straightforward sub-pages for legal compliance.
- **Decision**: Adopt TanStack Router with file-based routing in `src/routes/`.
- **Consequences**: Route tree is automatically generated into `src/routeTree.gen.ts`; eliminates broken internal navigation links.

## ADR-02: Direct EmailJS Client Integration
- **Context**: The contact form needs to deliver inquiries directly to Fahaman's inbox without spinning up a dedicated Node.js backend server.
- **Decision**: Use EmailJS client SDK with environment variables (`VITE_EMAILJS_SERVICE_ID`, etc.).
- **Consequences**: Eliminates database maintenance and backend server maintenance costs while ensuring reliable email delivery.

## ADR-03: Zero Third-Party Analytics Trackers
- **Context**: Privacy regulations (GDPR, DPDP) and user trust require strict data minimization.
- **Decision**: Avoid embedding Google Analytics, Meta Pixel, or marketing cookies.
- **Consequences**: The site operates cookie-free except for theme preference local storage; no cookie consent banners required.
