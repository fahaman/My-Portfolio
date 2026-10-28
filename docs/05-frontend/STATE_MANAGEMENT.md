# State Management

- **Local State**: Managed with `useState` (e.g. mobile navigation drawer toggle, contact form submission status, photo lightbox index).
- **Theme State**: Persisted in DOM attribute (`data-theme="light"` / dark mode default) for zero layout flash.
- **Server Cache State**: Managed with `@tanstack/react-query` QueryClientProvider mounted in `__root.tsx`.
