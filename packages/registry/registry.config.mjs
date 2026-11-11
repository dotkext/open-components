/**
 * Registry manifest: maps a component to the React source (served to consumers)
 * and the shared headless variant module that is vendored alongside it.
 */
export const components = [
  {
    name: 'button',
    title: 'Button',
    description: 'Displays a button or a component that looks like a button.',
    react: 'ui-react/src/button/button.tsx',
    variants: 'core/src/button/variants.ts',
    dependencies: ['class-variance-authority'],
  },
  {
    name: 'badge',
    title: 'Badge',
    description: 'Displays a badge or a component that looks like a badge.',
    react: 'ui-react/src/badge/badge.tsx',
    variants: 'core/src/badge/variants.ts',
    dependencies: ['class-variance-authority'],
  },
  {
    name: 'card',
    title: 'Card',
    description: 'Displays a card with header, content, and footer.',
    react: 'ui-react/src/card/card.tsx',
    variants: 'core/src/card/classes.ts',
    dependencies: [],
  },
  {
    name: 'input',
    title: 'Input',
    description: 'Displays a form input field.',
    react: 'ui-react/src/input/input.tsx',
    variants: 'core/src/input/classes.ts',
    dependencies: [],
  },
  {
    name: 'label',
    title: 'Label',
    description: 'Renders an accessible label associated with controls.',
    react: 'ui-react/src/label/label.tsx',
    variants: 'core/src/label/classes.ts',
    dependencies: [],
  },
  {
    name: 'alert',
    title: 'Alert',
    description: 'Displays a callout for user attention.',
    react: 'ui-react/src/alert/alert.tsx',
    variants: 'core/src/alert/variants.ts',
    dependencies: ['class-variance-authority'],
  },
  {
    name: 'separator',
    title: 'Separator',
    description: 'Visually or semantically separates content.',
    react: 'ui-react/src/separator/separator.tsx',
    variants: 'core/src/separator/variants.ts',
    dependencies: ['class-variance-authority'],
  },
  {
    name: 'skeleton',
    title: 'Skeleton',
    description: 'Use to show a placeholder while content is loading.',
    react: 'ui-react/src/skeleton/skeleton.tsx',
    variants: 'core/src/skeleton/classes.ts',
    dependencies: [],
  },
];

export const registryName = 'open-components';
