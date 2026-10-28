# Frontend Performance Optimization

- **CSS Bundling**: Compiled via Tailwind v4 and compressed with gzip to ~17 kB.
- **Dynamic Imports & Code Splitting**: Legal pages (`/privacy`, `/terms`, `/cookies`) split into separate JavaScript chunks (~2 kB each).
- **Image Optimization**: Profile photos and certificate badges pre-scaled and compressed.
- **Font Optimization**: Preconnected Google Fonts origins (`fonts.googleapis.com`, `fonts.gstatic.com`).
