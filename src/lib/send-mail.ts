/* ─────────────────────────────────────────────────────────────────
   EmailJS – browser-side email sending (no SMTP credentials needed)
   ─────────────────────────────────────────────────────────────────
   Setup (one-time, ~3 minutes):
   1. Go to https://emailjs.com and sign up (free)
   2. Add Email Service → choose Gmail → connect your Gmail account
      → note the Service ID (e.g. "service_xxxxxxx")
   3. Create Email Template:
      - To email: mohammedfahaman5@gmail.com
      - Subject:  [Portfolio] {{subject}} — from {{from_name}}
      - Body:     Name: {{from_name}}\nEmail: {{from_email}}\n\n{{message}}
      → note the Template ID (e.g. "template_xxxxxxx")
   4. Account → API Keys → copy your Public Key
   5. Paste all three below (or in .env as VITE_EMAILJS_*)
   ──────────────────────────────────────────────────────────────── */

export const EMAILJS_SERVICE_ID  = import.meta.env["VITE_EMAILJS_SERVICE_ID"]  ?? "";
export const EMAILJS_TEMPLATE_ID = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] ?? "";
export const EMAILJS_PUBLIC_KEY  = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"]  ?? "";
