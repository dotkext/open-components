import { cva, type VariantProps } from 'class-variance-authority';

export const separatorVariants = cva('bg-border shrink-0', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type SeparatorOrientation = NonNullable<
  VariantProps<typeof separatorVariants>['orientation']
>;
