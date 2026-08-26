---
name: TOJDORON Route Ledger
description: A forest-green editorial logistics system that makes international freight feel clear, connected, and locally reachable.
colors:
  paper: "oklch(98% 0.012 145)"
  paper-2: "oklch(95% 0.020 145)"
  paper-3: "oklch(91% 0.032 145)"
  ink: "oklch(21% 0.026 154)"
  ink-2: "oklch(36% 0.024 154)"
  muted: "oklch(50% 0.020 154)"
  rule: "oklch(82% 0.030 145)"
  rule-strong: "oklch(70% 0.045 145)"
  accent: "oklch(49% 0.158 150)"
  accent-strong: "oklch(36% 0.124 154)"
  accent-bright: "oklch(68% 0.155 145)"
  accent-soft: "oklch(89% 0.070 145)"
  accent-ink: "oklch(98% 0.012 145)"
  dark: "oklch(17% 0.054 155)"
  dark-2: "oklch(23% 0.060 155)"
  dark-muted: "oklch(76% 0.030 150)"
  focus: "oklch(63% 0.200 145)"
  error: "oklch(50% 0.180 28)"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(3.1rem, 7.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  round: "999px"
spacing:
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
  4xl: "6rem"
  5xl: "8rem"
  section: "clamp(5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.15rem"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.15rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.15rem"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1rem"
    height: "3.25rem"
  action-band:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.md}"
    padding: "clamp(1.5rem, 4vw, 3rem)"
---

# Design System: TOJDORON Route Ledger

## Overview

**Creative North Star: "Route Ledger"**

Route Ledger presents logistics as one continuous, understandable journey. Warm paper, forest and jade fields, full-bleed transport photography, ruled lists, route lines, and large action bands make the company feel global, precise, grounded, and quietly kinetic. The approved implementation finish verdict is **PASS**.

The visual DNA studied from [mumnet.kz](https://www.mumnet.kz/) is limited to section rhythm, large-scale imagery, restrained motion, a two-tier masthead, and destination-style footer structure. Do not copy that reference's brand history, claims, logo, photography, or page content.

**Key Characteristics:**

- Editorial green-and-white composition with dark forest interludes.
- Route geometry and ruled layouts used as operational wayfinding.
- Large, honest freight imagery paired with concise human contact paths.
- Shared navigation/footer shell with a distinct macrostructure for each page.

**The Continuous Route Rule.** New surfaces should feel like stages of one shipment journey, not a stack of interchangeable feature cards.

## Colors

The canonical palette lives in `tokens.css`; keep its OKLCH values as the single source of truth. Paper tones provide the white system, forest accents carry action and identity, and deep greens create cinematic sections without introducing a generic blue logistics palette.

### Primary

- **Route Green:** Main buttons, route markers, action bands, and selected states.
- **Deep Forest:** Utility masthead, hover states, links, and authoritative brand emphasis.
- **Signal Jade:** Moving route indicators and selected map nodes; use as a rare signal, not a large text field.

### Neutral

- **Warm Paper:** Default page, field, logo-tile, and light-button surface.
- **Layered Paper:** Alternating sections, office card, disabled and error-support surfaces.
- **Freight Ink:** Primary body and heading text on paper.
- **Ruled Sage:** Dividers, field borders, diagrams, and quiet structural lines.
- **Night Forest:** Full-width dark sections, footer, and photographic fallbacks.
- **Mist Text:** Secondary copy on dark forest surfaces.

### Named Rules

**The Green-and-White Rule.** Extend the existing paper/forest scale in `tokens.css`; do not add unrelated brand accents without a deliberate identity change.

**The Contrast Pairing Rule.** Keep ink on paper, paper on deep forest, and accent ink on route green. Re-test any changed pairing to WCAG AA: at least 4.5:1 for normal text and 3:1 for large text and essential control boundaries.

## Typography

**Display Font:** Sora (sans-serif fallback)  
**Body Font:** Manrope (sans-serif fallback)

**Character:** Sora gives route headlines a compact, geometric authority; Manrope keeps operational explanations, navigation, forms, and contact details calm and readable.

### Hierarchy

- **Display:** Reserved for the home hero; tight leading and a short line length create the first-viewport landmark.
- **Headline:** Page heroes and major section headings, generally limited to 12–18 characters per line by container width.
- **Title:** Service, process, and card headings.
- **Body:** Long-form explanations with a maximum line length of 72ch; introductory copy steps up responsively.
- **Label:** Navigation, buttons, route stops, form labels, and utility text; use weight rather than excessive capitalization.

**The Two-Voice Rule.** Sora owns headings and emphatic channel values; Manrope owns everything read for detail or action.

## Layout

The shared canvas is a centered 75rem container with 1rem minimum side gutters and fluid section spacing. Desktop layouts use asymmetric two-column grids, alternating image/copy placement, sticky supporting panels, ruled lists, and occasional four-column service or principle bands. The shared shell is a sticky, two-tier utility masthead: a 2.25rem contact strip over a 5rem primary navbar, followed by a dark destination footer and overlapping route-green call-to-action band.

The four page macrostructures are intentionally distinct:

- **Home — Route Ledger:** Full-viewport multimodal hero, four-stop route dock, human introduction, four-panel service panorama, vertical route process, and promise ledger.
- **About — Human Network:** Tall documentary hero, company statement, ruled coordination list, animated route atlas, and four-part principles grid.
- **Services — Service Atlas:** Panorama hero, sticky four-mode index, alternating service detail rows using one crop-ready image strip, and a multimodal route sweep.
- **Contact — Route Desk:** Forest route-field hero, direct phone/email channels, sticky office card beside the quote form, container-aligned map, and phone-led closing action.

Responsive breakpoints are 62rem (992px), 58rem (928px), 48rem (768px), 42rem (672px), and 36rem (576px). At 62rem major grids collapse; at 58rem navigation becomes a controlled dropdown; at 48rem the home hero/route dock recompose; at 42rem forms, footer, service index, CTA bands, and principle grids stack; at 36rem primary actions and service panels become single-column. Preserve zero horizontal scrolling and verify the full range, not only the named thresholds.

**The Page-World Rule.** Keep the masthead, footer, tokens, and route grammar shared, but preserve each page's macrostructure rather than cloning the Home page.

## Elevation & Depth

The system is flat and ruled by default. Depth appears selectively through photographic overlays, paper/forest tonal layering, sticky navigation shadow after scroll, raised CTA bands, the quote panel, and image captions. The two canonical shadows are `0 1rem 3rem var(--color-shadow-soft)` for quiet lift and `0 1.5rem 4rem var(--color-shadow)` for foreground actions.

**The Selective Lift Rule.** Use shadow for hierarchy or state—never as decoration on every card.

## Shapes

Corners are gently practical: 0.5rem for buttons, fields, imagery, and compact tiles; 0.75rem for panels and action bands; 1rem is available for larger surfaces; 999px is reserved for dots and the floating call control. One- and two-pixel rules are the primary structural device. Route circles, lines, and nodes are signature geometry; they should clarify sequence or location.

**The Ruled Ledger Rule.** Prefer borders, dividers, and tonal bands to a collection of floating rounded cards.

## Components

### Navigation

The two-tier masthead shows Dushanbe plus direct contact above the official logo, four page links, and the quote action. Active and hover links draw a green underline. At 58rem and below, the accessible toggle controls `aria-expanded`, locks body scrolling while open, closes on selection, and returns to desktop behavior above 928px. A scroll offset greater than 12px adds the quiet header shadow.

### Buttons and Links

Primary, light, and outline buttons share a 3rem minimum target, bold Manrope label, 0.5rem corner, and quick lift on hover. Text links use the deep green and a small directional movement. Every hover treatment must have a visible keyboard focus equivalent; the global focus style is a two-pixel focus outline with a 0.25rem offset.

### Route, Reveal, and Service Interactions

- Home route stops are real buttons with `aria-pressed` and an `aria-live` status. The active node advances every 4.2s, pauses for pointer/focus engagement and hidden tabs, and does not auto-rotate under reduced motion.
- About's operational route board cycles every 5.2s through four literal sequences: load then dispatch a truck, lower a container then sail a ship, handle a pallet by forklift, or load then dispatch an aircraft. Manual selections remain fixed until engagement ends, all four controls expose `aria-pressed`, and spatial motion is removed under reduced motion.
- Services uses a sticky mode index and IntersectionObserver-driven active state; service links pass `?service=road|sea|cargo|air` so Contact can preselect the form option.
- Reveal elements use IntersectionObserver and a 620ms upward fade. Content is fully visible without JavaScript and under `prefers-reduced-motion: reduce`.
- The services multimodal line sweeps over 3.6s and is also neutralized by the reduced-motion override.
- Same-origin page navigation uses a 300ms pale-paper route wipe centered on the green TOJDORON mark. It is bypassed under reduced motion. Freight photography uses restrained 1.8–2.5% hover expansion rather than large zooms.

### Quote Form and Contact Truth

Use the exact contact record: **+992 978 241717**, **+992 978 231717**, **tojdoron1717@gmail.com**, and **Jabor Rasulov Street 3, 3rd floor, landmark Farovon Market, Dushanbe, Tajikistan**. The canonical Google Maps query is `Jabor Rasulov Street 3, Dushanbe, Tajikistan`. Keep the current open-map URL exactly as `https://www.google.com/maps/search/?api=1&query=Jabor%20Rasulov%20Street%203%2C%20Dushanbe%2C%20Tajikistan` and the embed URL exactly as `https://www.google.com/maps?q=Jabor%20Rasulov%20Street%203%2C%20Dushanbe%2C%20Tajikistan&output=embed`.

The quote form is intentionally client-side. It validates name, email, and cargo details with labels, inline errors, `aria-invalid`, focused recovery, and a live status; it then prepares a structured `mailto:` draft to the official email and opens the visitor's email application. This is the truthful behavior because no backend form endpoint or CRM was supplied. Do not describe the enquiry as submitted or delivered until a real endpoint and success contract exist.

### Brand and Image Assets

`Logo.png` remains the official geometry source. The approved website treatment is `assets/tojdoron-logo-green-v2.png`: an exact transparent forest-green derivation that preserves the star, TD monogram, TOJDORON lettering, proportions, and alignment. Use it in the header, footer, and favicon without adding a white tile. `logo in greenish theme.png` is a color-treatment reference only; prompt files in `assets/prompts/` record the derivation.

Generated raster inventory:

- `assets/hero-logistics-tojdoron-v2.webp`: shipped Home hero; source-preserving composite with the green TOJDORON mark applied as realistic truck livery.
- `assets/hero-logistics-branded.webp`: retained previous Home hero version, no longer referenced.
- `assets/hero-logistics.webp`: generated unbranded base retained as source/reference, not the shipped hero.
- `assets/about-operations.webp`: generated documentary operations image used on Home and About.
- `assets/service-modes-tojdoron-v2.webp`: shipped four-panel road/sea/cargo/air strip with green TOJDORON livery integrated into the truck, ship, forklift, and aircraft.
- `assets/service-modes.webp`: retained unbranded four-panel source/reference, no longer referenced.

Each generated WebP has an adjacent `.webp.json` sidecar containing its prompt and creation timestamp. The corresponding files in `assets/prompts/` preserve the prompt text. Keep raster, sidecar, and prompt record together when moving or replacing an asset; any replacement needs equivalent provenance.

## Do's and Don'ts

### Do:

- **Do** keep the official logo, direct phone/email path, and quote action visible across all four pages.
- **Do** retain semantic landmarks, skip links, labels, meaningful alternatives, `aria-current`/live-state cues, and touch targets around 3rem or larger.
- **Do** treat route animation as progressive enhancement and preserve the no-JavaScript and reduced-motion reading experience.
- **Do** use concrete transport imagery and maintain its provenance sidecars.

### Don't:

- **Don't** invent founding dates, fleet size, shipment counts, certifications, testimonials, customers, social profiles, or service metrics.
- **Don't** copy M&M/Militzer & Münch history, claims, branding, media, or photography from the studied reference.
- **Don't** turn every section into a rounded card grid or introduce a blue corporate palette.
- **Don't** claim the static quote form sends data to TOJDORON; it only prepares a mailto draft for the visitor to send.
