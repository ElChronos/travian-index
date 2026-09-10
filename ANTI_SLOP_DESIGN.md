# Crusader Trav anti-slop design brief

## Research synthesized

This project borrows the useful anti-slop principles from several public GitHub design skills and prompt collections, including:

- Krirox/anti-ai-slop-skills
- rwcod/anti-ai-slop-ui
- Ferousco-dev/anti-slop-design
- mah-claude/anti-slop-website-prompts
- ch040602/anti-ai-slop

The common guidance is consistent: define design intent before components, use a specific visual direction, avoid statistical-average SaaS patterns, make motion purposeful, use real/product-specific assets, use concrete copy, cover interaction states, and perform a final distinctiveness check.

## Project direction

**Classic browser MMORPG / Travian-era strategy portal.**

The site should feel like a game world first and a marketing page second. Use parchment, aged wood, brass, iron, map-room markings, browser-game chrome, and restrained medieval ornament. It should suggest a 2000s strategy MMO without becoming a skeuomorphic museum piece.

## Deliberate violations

1. No purple/blue SaaS gradients or glassmorphism.
2. No rounded-card-everywhere system; cards are mostly square/beveled with a few intentional control radii.
3. No generic centered hero -> three cards -> testimonial -> CTA rhythm. Use an asymmetric command-room composition, framed game imagery, ribbons, ledgers, and long-form sections.
4. No emoji for interface icons. Use typography, seals, borders, and labels instead.
5. No fake testimonials, fake user counts, or invented social proof.
6. No universal fade-up animation. Motion should have different jobs: scene entrance, parallax, marquee, hover response, and state feedback.

## Tokens

Palette: parchment, warm limestone, dark walnut, oxidized brass, deep forest accent, muted oxblood. Avoid neon and excessive shadow.

Typography: Cinzel for heraldic/display moments, Libre Baskerville for readable lore/body copy, DM Sans only for compact utility labels.

Shapes: square frames and bevels; 2–4px control radius only where it reads as a physical game control.

## Layout rules

- Prefer asymmetric split layouts and annotated screenshots.
- Use rules, dividers and marginal labels to imply a game manual / world map.
- Break repeated grids with one large focal element.
- Let typography create hierarchy rather than adding more decoration.
- Keep one dominant accent at a time.

## Motion rules

- Hero: one cinematic entrance and slow camera drift.
- Scroll: reveal whole sections or a single focal object; avoid animating every paragraph.
- Hover: use border illumination, small positional shifts, button fills, and subtle tilt only on explicitly interactive game surfaces.
- Parallax: low amplitude and disabled under reduced-motion.
- Cursor: custom on fine pointers only; never break touch or keyboard interaction.

## Quality gate

Before shipping a visual change, ask:

- Could this design belong to a random SaaS company?
- Is the game identity visible without reading the logo?
- Did we add a visual because it communicates game context, or because an AI template usually has one?
- Are numbers and labels real or explicitly framed as illustrative?
- Is there a clear focal point in each section?
- Does motion explain hierarchy or interaction?
- Are keyboard, mobile and reduced-motion users still supported?

Target: distinctive, game-specific, restrained, and usable. The goal is not to look unusual for its own sake; it is to look deliberately made for Crusader Trav.
