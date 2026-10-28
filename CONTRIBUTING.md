# Contributing Guidelines

Thank you for your interest in contributing to Mohammed Fahaman's portfolio repository.

## Development Workflow

1. **Clone & Install Dependencies**
   ```bash
   git clone https://github.com/fahaman/My-Portfolio.git
   cd My-Portfolio
   npm install
   ```

2. **Configure Environment**
   Copy the `.env.example` template to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your testing EmailJS keys if working on contact form interactions.

3. **Start the Local Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port specified by Vite) in your browser.

4. **Code Quality & Verification**
   Ensure formatting and types pass cleanly before creating a pull request:
   ```bash
   npm run lint
   npm run build
   ```

## Design & Architecture Standards

- **No Purple Gradients:** Use cohesive palettes (cyan, blue, amber, emerald, slate).
- **No Pill-Shaped Buttons:** Keep buttons modern and geometric (`rounded-xl` / `rounded-lg`).
- **No Emoji Interface Icons:** Utilize Lucide React SVG icons.
- **Accessibility:** Maintain WCAG 2.2 AA standards (semantic tags, keyboard focus rings, color contrast).
- **Git History Integrity:** Never force push, rebase, or squash commits already pushed to branches connected to Lovable.
