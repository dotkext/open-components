import { cva, type VariantProps } from 'class-variance-authority';

/**
 * A switch track. The thumb is drawn with a `::before` pseudo-element so the
 * same class list works for React, Angular and light-DOM web components.
 */
export const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-colors outline-none before:absolute before:left-0.5 before:top-1/2 before:-translate-y-1/2 before:rounded-full before:bg-background before:shadow-sm before:transition-transform before:content-[''] focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input data-[state=unchecked]:before:translate-x-0",
  {
    variants: {
      size: {
        default: 'h-5 w-9 before:size-4 data-[state=checked]:before:translate-x-4',
        sm: 'h-4 w-7 before:size-3 data-[state=checked]:before:translate-x-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type SwitchSize = NonNullable<VariantProps<typeof switchVariants>['size']>;
