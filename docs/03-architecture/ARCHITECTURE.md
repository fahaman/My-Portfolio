# System Architecture

## Architecture Diagram
```mermaid
graph TD
    Client[Browser / Client] --> CDN[Cloudflare / Edge CDN]
    CDN --> Router[TanStack Router SSR]
    Router --> Pages[Route Components: /, /privacy, /terms, /cookies]
    Pages --> UI[Design System & Radix UI Components]
    Pages --> EmailService[EmailJS API Integration]
    Pages --> LocalStorage[Theme Preference Local Storage]
```

## Architectural Highlights
- **Isomorphic Rendering**: Server-side rendering paired with client-side hydration via TanStack Start.
- **Type-Safe Routing**: File-based routing with automatic route tree code generation (`src/routeTree.gen.ts`).
- **Decoupled Messaging**: Contact inquiries directly authenticated and sent via EmailJS browser SDK, avoiding unnecessary backend server attack surfaces.
