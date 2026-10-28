# SEO & Discovery Strategy

## 1. Metadata Architecture
- Dynamic title and meta descriptions on all routes (`/`, `/privacy`, `/terms`, `/cookies`).
- Canonical URL declarations preventing duplicate indexing.
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) for rich social card previews on LinkedIn, Twitter, and Slack.

## 2. Structured Data (JSON-LD)
Root layout embeds Schema.org `Person` entity:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohammed Fahaman",
  "jobTitle": "Full Stack Developer",
  "email": "mohammedfahaman5@gmail.com",
  "url": "/",
  "sameAs": [
    "https://linkedin.com/in/mohammed-fahaman",
    "https://github.com/fahaman"
  ]
}
```

## 3. Crawler Directives
- `sitemap.xml`: Dynamically generated route listing with priority indicators.
- `robots.txt`: Permits complete search crawler access to public content.
