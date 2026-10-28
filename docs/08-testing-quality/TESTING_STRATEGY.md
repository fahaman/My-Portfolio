# Testing Strategy

- **Static Analysis**: ESLint and TypeScript compile checks (`npm run lint`, `tsc --noEmit`).
- **Build Verification**: Full production bundling (`npm run build`) validating client, SSR, and Nitro server outputs.
- **Manual Verification**: Cross-browser layout verification, keyboard navigation checks, and form dispatch testing.
