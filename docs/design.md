---

name: Sage & Lime Kinetic

colors:

  surface: '#f9f9f6'

  surface-dim: '#dadad7'

  surface-bright: '#f9f9f6'

  surface-container-lowest: '#ffffff'

  surface-container-low: '#f3f4f1'

  surface-container: '#eeeeeb'

  surface-container-high: '#e8e8e5'

  surface-container-highest: '#e2e3e0'

  on-surface: '#1a1c1a'

  on-surface-variant: '#41493a'

  inverse-surface: '#2f312f'

  inverse-on-surface: '#f1f1ee'

  outline: '#717a68'

  outline-variant: '#c1cab5'

  surface-tint: '#2f6c00'

  primary: '#2f6c00'

  on-primary: '#ffffff'

  primary-container: '#9fe870'

  on-primary-container: '#2e6900'

  inverse-primary: '#91d963'

  secondary: '#5e5f5a'

  on-secondary: '#ffffff'

  secondary-container: '#e1e0da'

  on-secondary-container: '#63635e'

  tertiary: '#5b5f5c'

  on-tertiary: '#ffffff'

  tertiary-container: '#d3d6d1'

  on-tertiary-container: '#595d59'

  error: '#ba1a1a'

  on-error: '#ffffff'

  error-container: '#ffdad6'

  on-error-container: '#93000a'

  primary-fixed: '#acf67c'

  primary-fixed-dim: '#91d963'

  on-primary-fixed: '#092100'

  on-primary-fixed-variant: '#225100'

  secondary-fixed: '#e4e2dd'

  secondary-fixed-dim: '#c8c6c1'

  on-secondary-fixed: '#1b1c19'

  on-secondary-fixed-variant: '#474743'

  tertiary-fixed: '#e0e3de'

  tertiary-fixed-dim: '#c4c7c3'

  on-tertiary-fixed: '#191c1a'

  on-tertiary-fixed-variant: '#444844'

  background: '#f9f9f6'

  on-background: '#1a1c1a'

  surface-variant: '#e2e3e0'

  primary-active: '#cdffad'

  primary-pale: '#e2f6d5'

  ink-deep: '#163300'

  canvas: '#ffffff'

  mute: '#868685'

  positive: '#2ead4b'

  warning: '#ffd11a'

  negative: '#d03238'

  accent-orange: '#ffc091'

  accent-cyan: '#38c8ff'

typography:

  display-mega:

    fontFamily: Sora

    fontSize: 126px

    fontWeight: '800'

    lineHeight: 107px

    letterSpacing: -0.04em

  display-xl:

    fontFamily: Sora

    fontSize: 64px

    fontWeight: '800'

    lineHeight: 54px

    letterSpacing: -0.03em

  display-xl-mobile:

    fontFamily: Sora

    fontSize: 40px

    fontWeight: '800'

    lineHeight: 44px

    letterSpacing: -0.02em

  display-md:

    fontFamily: Sora

    fontSize: 40px

    fontWeight: '800'

    lineHeight: 34px

    letterSpacing: -0.02em

  display-sm:

    fontFamily: Inter

    fontSize: 32px

    fontWeight: '600'

    lineHeight: 38px

  body-lg:

    fontFamily: Inter

    fontSize: 20px

    fontWeight: '400'

    lineHeight: 30px

  body-md:

    fontFamily: Inter

    fontSize: 16px

    fontWeight: '400'

    lineHeight: 24px

  body-sm-strong:

    fontFamily: Inter

    fontSize: 14px

    fontWeight: '600'

    lineHeight: 20px

  button-md:

    fontFamily: Inter

    fontSize: 16px

    fontWeight: '600'

    lineHeight: 24px

  caption:

    fontFamily: Inter

    fontSize: 12px

    fontWeight: '400'

    lineHeight: 16px

rounded:

  sm: 0.25rem

  DEFAULT: 0.5rem

  md: 0.75rem

  lg: 1rem

  xl: 1.5rem

  full: 9999px

spacing:

  base: 4px

  xs: 4px

  sm: 8px

  md: 12px

  lg: 16px

  xl: 24px

  2xl: 32px

  3xl: 48px

  gutter: 24px

  margin-mobile: 16px

  margin-desktop: 48px

---

## Brand & Style

This design system embodies a "Scandinavian Fintech" aesthetic: authoritative, high-contrast, and hyper-functional. It balances the raw energy of heavyweight typography with a sophisticated, calming color palette. 

The style is **Modern Minimalism** with a focus on **Structural Contrast**. It rejects traditional depth cues like shadows in favor of distinct surface layering and extreme typographic scale. The brand personality is professional yet disruptively bold, designed to evoke a sense of transparency and modern efficiency. 

Key visual signatures include:

- Heavyweight "900" display headlines for immediate hierarchy.

- A signature lime-green for all high-conversion touchpoints.

- Sage-tinted backgrounds that reduce eye strain and provide a premium canvas for content.

## Colors

The color strategy relies on **Polarity Flipping**. The primary interaction color is a vivid lime (#9fe870), used exclusively for brand-critical actions. 

- **Primary & Secondary:** The interaction between the lime green and "Ink" (#0e0f0c) defines the high-impact areas.

- **Surface Strategy:** The default background is a sage-tinted "Canvas Soft" (#e8ebe6). White (#ffffff) is reserved for cards and modular components to create natural "flat" elevation.

- **Semantic Clarity:** Success states use a dedicated forest-green (#2ead4b) to ensure they are never confused with brand-primary CTA buttons.

## Typography

Use what we already are using (outfit)

**Note:** For mobile, headlines must scale aggressively. Headlines exceeding 40px should be reduced to the `display-xl-mobile` token to maintain layout integrity.

## Layout & Spacing

This design system uses a **12-column fluid grid** for desktop and a **4-column grid** for mobile.

- **Rhythm:** A strict 4px base unit governs all dimensions.

- **Sectioning:** Content sections should use `3xl` (48px) vertical padding to provide significant breathing room between major narrative blocks.

- **Containers:** Content is typically housed in centered containers with a max-width of 1280px. 

- **Internal Spacing:** Components like cards use the `xl` (24px) token for internal padding to match the radius of the container, creating a balanced visual weight.

## Elevation & Depth

The design system follows a **Flat Layering** philosophy. 

Depth is achieved through **Surface Tiers** rather than shadows:

- **Tier 0 (Background):** Sage-tinted (#e8ebe6) "Canvas Soft".

- **Tier 1 (Content):** Pure White (#ffffff) "Canvas" cards.

- **Tier 2 (Accent):** Ink (#0e0f0c) or Primary Green (#9fe870) surfaces for callouts.

Low-contrast outlines (1px solid "Ink" or "Mute") are used for interactive inputs and secondary buttons. Shadows are strictly reserved for ephemeral overlays like Modals and Tooltips, where they should be soft, diffused, and low-opacity.

## Shapes

The system is defined by its **Aggressive Pill-Rounding**. 

The canonical corner radius is **24px `rounded-xl`)**, which must be applied to all primary cards and buttons. This creates a soft, friendly counter-balance to the heavy, sharp typography. 

Secondary elements like inputs use a smaller **12px `rounded-md`)** radius to maintain a tighter structural feel within forms. Status badges and tags should always be fully rounded (pill-shaped).

## Components

### Buttons

- **Primary:** Background `primary`, text `ink-deep`, radius `24px`. No border.

- **Secondary:** Background `canvas-soft`, text `secondary`, radius `24px`.

- **Tertiary:** Transparent background, 1px `secondary` border, text `secondary`.

### Cards

- **Standard:** Background `canvas`, radius `24px`, padding `xl`. No shadow.

- **Highlight:** Background `secondary`, text `white`, radius `24px`.

### Inputs

- **Field:** Background `canvas`, 1px solid `ink` (or `mute` when inactive), radius `12px`, padding `lg`.

- **Focus State:** 2px solid `primary`.

### Chips & Badges

- **Status:** Pill-shaped (9999px), using semantic colors `positive`, `warning`, `negative`) with high-contrast text overlays.

- **Filter Chips:** 1px solid `mute`, radius `8px`, using `body-sm-strong` for labels.

### Lists

- Use horizontal dividers in `canvas-soft`. 

- List items should have `lg` (16px) vertical padding to ensure high touch-target accessibility.