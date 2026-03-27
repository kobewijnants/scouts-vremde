# Design System Strategy: The Guided Expedition

## 1. Overview & Creative North Star
**Creative North Star: The Guided Expedition**

This design system moves away from the rigid, "boxed-in" layout of traditional youth organization websites. Instead, it adopts an **Editorial Adventure** aesthetic. The goal is to balance the raw, tactile nature of scouting with a sophisticated digital layer that reassures parents. 

We break the "template" look through **intentional asymmetry**—images that break the container, text that overlaps organic shapes, and a typography scale that feels bold and authoritative. The interface should feel like a premium field guide: organized, high-quality, but fundamentally connected to the outdoors. We avoid a flat, static experience by using layered surfaces that mimic the depth of a forest floor.

---

## 2. Colors
Our palette is rooted in the earth but refined for the screen. We utilize a rich interplay of "Forest Green" and "Bark Brown" against a warm, paper-like "Sand" background.

*   **Primary (`#5a2e00`)**: Used for brand-critical elements and deep grounding. 
*   **Secondary (`#3b6934`)**: Our "Forest Green," used for navigation and environmental context.
*   **Accent (Primary Container/Fixed)**: We use the warm orange-yellow tones (`#ffb273`, `#7c4100`) sparingly for high-action CTAs to mimic the spark of a campfire.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. We define space through **Tonal Transitions**. 
*   Transition from `surface` (`#fdf9ef`) to `surface-container-low` (`#f7f3e9`) to signal a shift in content (e.g., from a hero section to a news feed).
*   Use background color shifts to define the boundaries of your digital world.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
1.  **Base Layer:** `surface` (The canvas).
2.  **Structural Layer:** `surface-container-low` (Content groupings).
3.  **Feature Layer:** `surface-container-highest` (Interactive cards or prominent sidebars).
Each nested container should move one step up or down the tier list to create natural, borderless depth.

### Glassmorphism & Signature Textures
To add "soul," use subtle gradients transitioning from `primary` to `primary_container` on large buttons or hero backgrounds. For floating navigation or mobile menus, apply **Glassmorphism**: use `surface` at 80% opacity with a `20px` backdrop-blur. This allows the "scout colors" to bleed through, creating an integrated, modern feel.

---

## 3. Typography
We use a high-contrast pairing to reflect our "Friendly Professional" persona.

*   **Display & Headlines (Plus Jakarta Sans)**: These are our "Friendly" voice. The rounded terminals are approachable, but the geometric construction remains modern. Use `display-lg` for hero statements with tight letter-spacing (-2%) to create a bespoke, editorial look.
*   **Body & Labels (Manrope)**: These provide "Professional" clarity. Manrope’s clean lines ensure that technical details (camp dates, gear lists) are legible for parents.
*   **Visual Hierarchy**: Use `headline-sm` in `secondary` (Green) for sub-headers to ground the reader, while keeping `body-lg` in `on-surface-variant` for a softer, more sophisticated reading experience.

---

## 4. Elevation & Depth
In this system, depth is a result of light and shadow, not lines.

*   **The Layering Principle**: Instead of a card shadow, place a `surface-container-lowest` card on a `surface-container-high` section. The subtle shift in beige/sand tones provides enough contrast to signify "lift" without visual clutter.
*   **Ambient Shadows**: When a floating effect is required (e.g., a "Join Us" modal), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(28, 28, 22, 0.06)`. The shadow color must be a tint of `on-surface` (`#1c1c16`), never a generic grey.
*   **The Ghost Border**: If accessibility requires a stroke (e.g., input fields), use the `outline-variant` token at **15% opacity**. It should feel like a suggestion of a boundary, not a hard fence.

---

## 5. Components

### Buttons
*   **Primary**: `primary` background with `on-primary` text. Use `rounded-full` for a friendly, organic feel. Include a subtle gradient from `primary` to `primary_container`.
*   **Secondary**: `secondary_container` background with `on-secondary_container` text. This is for secondary actions like "Download Info PDF."
*   **Tertiary**: No background. Use `primary` text with an underline that only appears on hover.

### Cards & Lists
*   **Cards**: Strictly no borders. Use `surface-container-low` and `rounded-xl`. 
*   **No Dividers**: Forbid 1px horizontal lines between list items. Use **Vertical White Space** (spacing scale `6` or `8`) to separate items.
*   **Adventure Icons**: Use `tertiary_fixed` background for small circular iconography (e.g., a compass icon next to a "Location" list item).

### Input Fields
*   Background: `surface-container-highest`.
*   Border: The **Ghost Border** fallback (15% opacity `outline-variant`).
*   Focus State: A 2px solid `primary` border to ensure clear accessibility.

### Special Component: "The Scout Badge" (Chips)
Use `secondary_fixed` for status tags (e.g., "Registration Open"). The text should be `on-secondary_fixed_variant` for high-end tonal harmony. Use `rounded-md` (0.75rem) to differentiate from the fully rounded buttons.

---

## 6. Do's and Don'ts

### Do:
*   **Use Intentional Asymmetry**: Allow an image of a forest or scout activity to overlap two different `surface-container` sections.
*   **Embrace Negative Space**: Use the `spacing-20` (5rem) and `spacing-24` (6rem) tokens to let the typography breathe.
*   **Tone-on-Tone**: Place dark green text (`on-secondary_container`) on a light green background (`secondary_container`) for a sophisticated, low-contrast look.

### Don't:
*   **No 1px Solid Outlines**: Never use a high-contrast border to separate sections or cards.
*   **No Pure Black**: Never use `#000000`. Always use `on-background` (`#1c1c16`) to maintain the organic, warm feel.
*   **No Crowding**: If a layout feels "busy," increase the vertical spacing. Scouting is about the vast outdoors; the website should feel just as spacious.
*   **No Standard Shadows**: Avoid the default "drop shadow" look. If it looks like a standard UI kit, it has failed the "Adventure" test. Use tonal layering first.