# Component Guidelines

## Component Conventions

- **Purity & Separation**: Component files render presentation; business logic and API integrations are factored into hooks or utility modules.
- **Props Definition**: Strict TypeScript interfaces for all props.
- **Accessibility Attributes**: Mandatory `aria-label` on icon-only buttons.

## Key UI Components

1. `ProfileLightbox`: Handles full-screen photography viewing with keyboard bindings.
2. `ThemeSelector`: Controlled light/dark mode switch updating the HTML `data-theme` attribute.
3. `MagneticButton`: Interactive button with cursor pull effect.
4. `SectionTag`: Semantic pill marker identifying current page section.
