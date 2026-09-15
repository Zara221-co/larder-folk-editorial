# Larder & Folk premium restaurant website

## Goal
Build a complete, responsive one-page restaurant concept at `/` with a warm editorial identity, original food photography, clear placeholder content, and calm GSAP motion.

## What will be built
- Sticky desktop navigation and a full-screen animated mobile menu.
- Full-viewport image-led opening with masked image reveal, staggered title, supporting line, and scroll cue.
- Editorial introduction with scroll-triggered typography.
- Category-based menu preview in a clean list format, with desktop cursor-following dish photography and clearly marked sample dishes/prices.
- Split signature feature with subtle image parallax.
- Asymmetric image gallery with clip reveals, custom `VIEW` cursor, keyboard-accessible full-screen lightbox, and image navigation.
- Atmosphere section using a restrained pinned horizontal sequence on larger screens and a natural vertical arrangement on mobile.
- Visit section with clearly labeled placeholder address, hours, contact details, map placeholder, Instagram link, and reservation CTA.
- Minimal footer with oversized animated wordmark.

## Visual system
- Warm cream base, charcoal type, earthy brown and muted olive accents, thin separators, minimal rounding, and no gradients.
- Editorial serif display type paired with a modern sans-serif body.
- Purpose-generated, cohesive food and dining photography stored locally and loaded responsively/lazily below the opening image.

## Motion and interaction
- GSAP + ScrollTrigger for page load, text staging, clip-path reveals, parallax, gallery entrances, mobile menu, and footer type.
- Smooth native scrolling plus GSAP scroll behavior where appropriate.
- Motion reduced or removed when the visitor prefers reduced motion; cursor-only interactions disabled on touch devices.

## Content safeguards
- Restaurant-specific facts will not be invented.
- Sample menu content and prices, location, opening hours, contact details, social link, and reservation destination will be visibly labeled as concept placeholders.
- No reviews, awards, or claims will be added.

## Technical details
- Install GSAP and implement the page in React/TanStack Start with Tailwind CSS v4 semantic tokens.
- Keep the page at `/`, add page-specific metadata, and load the selected fonts in the document head.
- Use the project button component for interactive calls-to-action and ensure keyboard/focus behavior for navigation, menu tabs, mobile navigation, and the lightbox.
- Verify the live page at desktop and mobile widths, including motion, overlays, image loading, console state, and build status.
