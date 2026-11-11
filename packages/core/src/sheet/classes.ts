import { cva, type VariantProps } from 'class-variance-authority';

export const sheetOverlayClass = 'fixed inset-0 z-50 bg-black/50';

export const sheetContentVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg outline-none',
  {
    variants: {
      side: {
        right: 'inset-y-0 right-0 h-full w-full max-w-sm border-l',
        left: 'inset-y-0 left-0 h-full w-full max-w-sm border-r',
        top: 'inset-x-0 top-0 max-h-[85vh] w-full border-b',
        bottom: 'inset-x-0 bottom-0 max-h-[85vh] w-full border-t',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

export const sheetHeaderClass = 'flex flex-col gap-1.5';
export const sheetTitleClass = 'text-lg font-semibold tracking-tight';
export const sheetDescriptionClass = 'text-muted-foreground text-sm';
export const sheetFooterClass = 'mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end';

export type SheetSide = NonNullable<VariantProps<typeof sheetContentVariants>['side']>;
