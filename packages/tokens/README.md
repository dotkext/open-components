# `@open-components/tokens`

Design tokens shared by every OpenComponents renderer (React, Angular, Web Components).

- `tokens.css` — shadcn-compatible CSS variables in OKLCH, with a `.dark` theme.
- `theme.css` — Tailwind v4 `@theme inline` mapping + base layer.

## Usage

```css
@import 'tailwindcss';
@import '@open-components/tokens/tokens.css';
@import '@open-components/tokens/theme.css';

/* Make Tailwind scan the component sources so their utilities are generated. */
@source '../node_modules/@open-components/core/src';
@source '../node_modules/@open-components/ui-react/src';
```

Toggle dark mode by adding the `dark` class to `<html>`.
