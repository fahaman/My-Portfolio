# Accessibility Standards (WCAG 2.2 AA)

## Implementation Summary
- **Color Contrast**: Normal text exceeds 4.5:1 ratio against background surfaces; headings and large text exceed 3:1.
- **Keyboard Navigation**: Complete tab order across navbar, hero buttons, portfolio projects, certifications, form fields, and modal lightbox.
- **Focus Indicators**: High-visibility focus rings (`focus:ring-2 focus:ring-primary focus:outline-none`).
- **Semantic Hierarchy**: Single `<h1>` per page with sequential `<h2>` and `<h3>` tags.
- **Motion Sensitivity**: Framer motion transitions respect `prefers-reduced-motion` settings.
