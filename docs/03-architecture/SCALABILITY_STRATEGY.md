# Scalability Strategy

- **Static Asset Caching**: Badge images, personal photos, and PDF certificates are cached aggressively via HTTP `Cache-Control: public, max-age=31536000, immutable`.
- **Edge Deployment**: Prebuilt bundles can deploy directly onto Cloudflare Workers / Pages edge networks, delivering sub-50ms latency globally.
- **Zero Server State**: Stateless frontend architecture ensures infinite concurrency without database connection pool exhaustion.
