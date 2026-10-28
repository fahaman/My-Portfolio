# Caching Strategy

- **Static Content**: Cache-Control headers set to 1 year for immutable hashed assets (`/assets/*.js`, `/assets/*.css`).
- **Media & Documents**: Cached for 30 days (`/certs/*`, `/photos/*`, `/FAHAMAN-CV.pdf`).
- **Sitemap**: Revalidated hourly (`Cache-Control: public, max-age=3600`).
