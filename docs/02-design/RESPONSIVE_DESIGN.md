# Responsive Design Guide

## Breakpoint Strategy

- **Mobile (< 640px)**: Single column layouts, sticky mobile header, full-width touch targets (minimum 44x44px).
- **Tablet (640px - 1024px)**: 2-column project grids, adapted navigation bar.
- **Desktop (>= 1024px)**: Floating navigation bar, multi-column skill and certification cards, side-by-side contact layouts.

## Touch Target & Viewport Audits

- All buttons, links, and form inputs maintain minimum 44px tap heights.
- Horizontal scroll overflow prevented via `overflow-x-hidden` on outer shell.
- Images scale fluidly with `object-cover` and `object-contain`.
