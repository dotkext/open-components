import { cva, type VariantProps } from 'class-variance-authority';

export const textLinkVariants = cva(
  'rounded-sm underline-offset-4 outline-none transition-colors hover:underline focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'text-primary',
        muted: 'text-muted-foreground hover:text-foreground',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type TextLinkVariant = NonNullable<VariantProps<typeof textLinkVariants>['variant']>;
