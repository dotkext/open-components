import { cva, type VariantProps } from 'class-variance-authority';

export const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md transition-colors outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        solid: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
      },
      size: {
        sm: 'size-7',
        default: 'size-9',
        lg: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  },
);

export type IconButtonVariant = NonNullable<VariantProps<typeof iconButtonVariants>['variant']>;
export type IconButtonSize = NonNullable<VariantProps<typeof iconButtonVariants>['size']>;
