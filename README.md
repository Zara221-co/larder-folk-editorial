# Larder & Folk Editorial

Larder & Folk Premium Website Prompt

Build a premium, editorial-style restaurant website for Larder & Folk.

The website should feel sophisticated, warm, handcrafted, and modern. Think high-end independent restaurant meets contemporary food magazine. Avoid the typical generic restaurant website look.

Overall Design Direction

Use a warm, refined visual identity with:

• Cream / warm off-white backgrounds
• Deep charcoal typography
• Subtle earthy brown and muted olive accents
• Large editorial typography
• High quality food photography
• Lots of whitespace
• Thin borders and subtle separators
• Elegant serif headings paired with a clean modern sans-serif body font
• Minimal shadows
• No gradients
• No excessive rounded cards
• No cheesy restaurant icons
• No generic stock-looking UI

The site should feel premium, tactile and intentional.

Tech

Use:

• React
• Tailwind CSS
• GSAP
• GSAP ScrollTrigger
• Smooth scrolling
• Fully responsive design
• Optimized image loading

Use GSAP extensively but tastefully. Animations should feel smooth and expensive, not flashy.

Homepage

Create a visually striking hero section.

Large headline:

Larder & Folk

Supporting text:

Good food, thoughtfully made.

Use a large full-width food or restaurant image with elegant typography layered around it.

Hero animation:

• Initial image reveal using a masked clip-path animation
• Headline letters or words stagger into place
• Small navigation elements fade upward
• Subtle image scale animation while entering
• Smooth transition into the next section

Add a small scroll indicator at the bottom.

Intro Section

Create an editorial introduction section with large typography.

Example:

Food made with care.
People made welcome.

Add a short paragraph introducing Larder & Folk.

Use ScrollTrigger to animate the typography into view with subtle staggered movement.

Food / Menu Section

Create an elegant menu preview.

Categories:

• Breakfast
• Lunch
• Dinner
• Drinks

Do not make it look like a typical restaurant menu card.

Use an editorial list layout with:

Dish name
Short description
Price

Hovering over a dish should reveal a small food image that follows the cursor.

Add smooth GSAP hover transitions.

Include:

View Full Menu

Signature Section

Create a large split-screen section showcasing a signature dish.

One side contains a large image.

The other contains:

Made from the good stuff.

A short description explaining the restaurant's approach to food.

Use a subtle horizontal/parallax image movement with ScrollTrigger.

Gallery

Create a premium asymmetric image gallery.

Use different image sizes and positions rather than a basic grid.

Images should animate into place as the user scrolls.

Use:

• Clip-path reveals
• Slight vertical movement
• Subtle scale animations
• Staggered entrance timing

Clicking an image should open a fullscreen gallery/lightbox.

Experience Section

Create a section focused on the atmosphere.

Large statement:

Come hungry.
Stay a while.

Include atmospheric photography and short supporting copy.

Use a horizontal scrolling or pinned GSAP section if it feels natural.

Do not overdo this effect.

Location / Visit

Create a clean section containing:

• Address
• Opening hours
• Contact
• Google Maps location
• Instagram link
• Reservation / enquiry CTA

Make the information extremely easy to find.

CTA:

Plan Your Visit

Footer

Minimal premium footer.

Include:

Larder & Folk

Address
Opening hours
Contact
Instagram

Add a subtle oversized text treatment:

Larder & Folk

Animate it slightly when entering the viewport.

Navigation

Create a minimal sticky navigation.

Logo on the left:

Larder & Folk

Links:

Menu
Our Story
Gallery
Visit

CTA:

Reserve a Table

On mobile, use a fullscreen animated menu.

The mobile menu should have a smooth GSAP open/close animation.

GSAP Animation Requirements

Make GSAP a major part of the experience.

Include:

Smooth hero text reveal

Image clip-path reveals

ScrollTrigger section reveals

Staggered typography animations

Image parallax

Menu image hover interactions

Smooth mobile navigation animation

Subtle page-load animation

Gallery reveal animations

Footer typography animation

Animations should generally use 400–800ms durations with elegant easing.

Avoid constant movement. The website should still feel calm and premium.

Cursor Interaction

On desktop, create a subtle custom cursor interaction.

When hovering over gallery images, show:

VIEW

When hovering over menu items with images, show the corresponding dish image near the cursor.

Keep this subtle and disable it on mobile.

Responsive Design

Desktop should feel editorial and spacious.

Tablet should preserve the composition without feeling cramped.

Mobile should be completely redesigned where necessary rather than simply shrinking the desktop layout.

Prioritize:

• Typography
• Image quality
• Fast loading
• Easy navigation
• Readable menu
• Easy contact/reservation access

Important

Do NOT invent specific restaurant facts, awards, reviews, prices, addresses, opening hours or menu items unless provided.

Use realistic placeholder content where necessary and clearly structure it so the real Larder & Folk content can easily replace it later.

Do not use fake customer reviews.

The final result should look like a website that could realistically be presented to the owners as a premium custom website concept, not an AI-generated template.

Make the visual design highly polished and cohesive.

Focus on strong typography, photography, spacing, editorial layouts and sophisticated GSAP motion.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d8f3632b-12de-4c5f-918a-bcf94b01159a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
