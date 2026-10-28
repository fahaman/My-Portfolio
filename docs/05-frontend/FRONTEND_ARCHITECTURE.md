# Frontend Architecture

- **React 19**: Component structure emphasizing hooks, clean JSX, and zero legacy class abstractions.
- **Component Hierarchy**:
  - `RootShell`: Outer HTML document with head scripts and CSS imports.
  - `Portfolio`: Main orchestrator mounting `Nav`, `Hero`, `Marquee`, `About`, `Skills`, `Projects`, `Experience`, `Education`, `Certifications`, `Achievements`, `Contact`, `Footer`, and `ProfileLightbox`.
- **CSS Architecture**: Tailwind CSS v4 variables with dynamic `data-theme` switching.
