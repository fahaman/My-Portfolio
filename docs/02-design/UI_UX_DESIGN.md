# UI / UX Design Specification

## 1. Aesthetic Philosophy

The visual language reflects precision software engineering: refined dark surfaces, subtle gold/amber primary accents, and frosted glass cards. Decorative clutter, excessive bounce animations, and generic template tropes are strictly prohibited.

## 2. Core Constraints

- **No Purple Gradients**: Replaced with electric cyan, amber gold, and slate accents.
- **No Pill-Shaped Buttons**: Geometric, modern corner radiuses (`rounded-xl` / `rounded-lg`) reinforce a technical aesthetic.
- **No Emojis as Interface Icons**: Strict utilization of crisp SVG line icons from `lucide-react`.
- **Authentic Assets**: Zero stock illustrations or fabricated reviews.

## 3. Lightbox Gallery UX

- Fullscreen modal with 90% black backdrop blur (`backdrop-blur-md`).
- Fully accessible keyboard controls: `ArrowRight` (Next), `ArrowLeft` (Previous), `Escape` (Dismiss).
- Smooth entry/exit transition using Framer Motion.
