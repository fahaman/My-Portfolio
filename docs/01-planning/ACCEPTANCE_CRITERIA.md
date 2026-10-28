# Acceptance Criteria

- **AC-01 (Resume Download)**: Clicking "Resume" downloads `FAHAMAN-CV.pdf` directly without page redirects.
- **AC-02 (Certifications Verification)**:
  - All 19 credential cards render their issuing organization and dates accurately.
  - Cards with PDFs present clickable download buttons that trigger the target file.
  - Hovering on badge-enabled cards displays the authentic credential badge image.
- **AC-03 (Contact Form)**:
  - Form requires Name, Email, and Message.
  - Submitting dispatches EmailJS request and renders confirmation message without reloading page.
  - Form preserves state upon recoverable network error.
- **AC-04 (Design Standards)**:
  - Zero purple gradients in application styling or project accents.
  - No pill-shaped buttons; all buttons use geometric `rounded-xl` or `rounded-lg` borders.
  - No emojis used as interface icons; all icons sourced from `lucide-react`.
- **AC-05 (Legal Compliance)**:
  - Dedicated `/privacy`, `/terms`, and `/cookies` routes load valid semantic pages and return HTTP 200.
