# New HOA : Website (21)

House of Aira — Phase 1: Foundation & Design System

We are building the House of Aira D2C fashion website in phases. This is Phase 1 only.

Do not build any homepage sections, product grids, product detail content, Shopify integration, cart functionality, checkout functionality, or other Phase 2+ features yet.

The goal of this phase is to establish a clean, reusable global foundation that every future page will inherit.

1. Brand Direction

Brand: House of Aira

Positioning:
Old Money Maximalism · Luxury Contemporary Ethnic

The website should feel:

Elegant

Editorial

Luxurious

Contemporary

Indian/ethnic without looking traditional or outdated

Sophisticated and premium

Visually spacious rather than crowded

Do not introduce colours, fonts, gradients, visual effects, or design styles that conflict with this direction.

2. Global Colour System

Create reusable global design tokens/variables for the following brand colours:

Deep Rust: #8B4A2F

Warm Rust: #C4733A

Warm Ivory: #E8D5B7

Parchment: #F5EFE0

Antique Gold: #C9A84C

Soft Gold: #E8C97A

Dark Espresso: #2C1810

Use these as the core colour system rather than repeatedly hardcoding colours throughout individual components.

Establish clear roles for:

Primary background

Secondary background

Primary text

Secondary text

Primary accent

Secondary accent

Borders/dividers

Buttons

Hover states

Keep the system easy to modify globally later.

3. Typography

Import and configure these three fonts:

Display

Playfair Display

Primary use: H1, major page headings, collection names and important brand statements

Weight: primarily Bold, with Regular where appropriate

Editorial

Cormorant Garamond

Primary use: taglines, editorial copy, product descriptions and brand storytelling

Use italic/light treatment where appropriate

Body / UI

Jost

Primary use: navigation, body copy, labels, buttons, product details and interface text

Use light/regular/medium weights appropriately

Create reusable typography styles/tokens so future pages do not define typography from scratch.

Use the following hierarchy as the initial reference:

H1: Playfair Display Bold, approximately 42px desktop

H2: Playfair Display Regular, approximately 26px desktop

Subheading: Cormorant Garamond Italic, approximately 18px

Navigation/labels: Jost, approximately 10px with generous letter spacing and uppercase treatment

Body: Jost Light, approximately 14px with comfortable line height

Make the typography responsive for mobile while preserving the hierarchy.

4. Spacing System

Create a consistent spacing system using reusable values/tokens.

The design should have generous whitespace and an editorial luxury feel.

Avoid arbitrary spacing values wherever possible.

The spacing system should be reusable across:

Sections

Cards

Navigation

Buttons

Forms

Footer

Future product pages

5. Border Radius

Establish a restrained border-radius system.

The brand should feel refined and editorial, not overly rounded or playful.

Use small/subtle radius values for:

Buttons

Cards

Images

Inputs

Avoid excessive pill-shaped UI unless specifically required later.

6. Button System

Create reusable button styles based on the brand system.

At minimum create:

Primary button

Dark Espresso background

Warm Ivory text

Jost

Uppercase

Letter spacing

Refined, compact proportions

Secondary/accent button

Deep Rust background

Parchment text

Gold button

Antique Gold background

Dark Espresso text

Outline button

Transparent background

Dark Espresso border

Dark Espresso text

Buttons should have subtle hover states using the existing brand palette.

Do not introduce gradients.

7. Navigation

Build the global navigation component only.

Desktop navigation

Use the brand direction shown in the supplied House of Aira guidelines:

Dark Espresso background

House of Aira wordmark/text in an elegant display treatment

Navigation links using Jost

Uppercase labels

Generous letter spacing

Clean spacing

New In can use Antique Gold as an accent

Initial navigation items:

Collections

Lookbook

New In

About

Also reserve space for:

Search

Account

Cart

These icons/actions should be visually present but do not need functional commerce behaviour yet.

Mobile navigation

Create a responsive mobile navigation.

Use:

House of Aira wordmark

Menu trigger

Search/cart actions where appropriate

The mobile menu should open cleanly and contain the primary navigation links.

Keep the interaction simple and elegant.

8. Footer

Build a reusable global footer.

Do not add excessive content yet.

Create the structural foundation for:

House of Aira branding

Shop/navigation links

Customer service links

Contact/social links

Newsletter area placeholder

Copyright

Legal/policy links

Use the House of Aira colour system and typography.

The footer should feel editorial and premium, not like a generic e-commerce template.

9. Routing

Set up the basic application routing now.

Create routes/pages for:

/

/shop

/product/:handle

/collections

/lookbook

/about

/contact

/cart

/checkout

/order-confirmation

For now, these pages can contain simple placeholder content indicating the page name.

Do NOT build the actual page designs yet.

The purpose of routing in Phase 1 is simply to establish the application structure so future phases can build each page independently.

10. Responsive Foundation

Establish responsive behaviour for:

Desktop

Tablet

Mobile

Pay particular attention to:

Typography scaling

Navigation behaviour

Container widths

Horizontal spacing

Button sizing

Footer layout

Do not wait until the final phase to make the design responsive.

11. Component Architecture

Keep the implementation modular and reusable.

Create reusable components such as:

Navbar

MobileMenu

Footer

Button

Container

Typography or equivalent design-system structure

Global design tokens/theme

Do not duplicate styles unnecessarily.

The purpose is to make future phases easier to build and maintain.

12. Important Constraints

This is a foundation phase.

DO NOT:

Build the homepage

Build hero sections

Build collection cards

Build product cards

Add dummy products

Build filters

Build product detail UI

Build cart functionality

Build checkout functionality

Connect Shopify

Add payment functionality

Add unnecessary animations

Add random sections

Add features not requested in this phase

Do not make assumptions about future functionality.

Focus entirely on creating a strong, reusable foundation.

13. Completion Criteria

Phase 1 is complete only when:

The House of Aira colour system is globally configured.

All three brand fonts are correctly imported and configured.

Typography hierarchy is established.

Spacing and border-radius tokens are established.

Reusable button styles exist.

Desktop navigation is complete.

Mobile navigation is complete.

Footer foundation is complete.

All required routes exist.

The foundation works responsively on desktop, tablet and mobile.

Components are reusable and not unnecessarily duplicated.

No Phase 2+ functionality has been implemented.

After completing Phase 1, stop and do not continue to the next phase.

Before making changes, inspect the existing project structure and preserve anything that is already useful. Do not unnecessarily rebuild working infrastructure.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/55580038-abb4-4577-b026-099e7a3c7cfe).

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
