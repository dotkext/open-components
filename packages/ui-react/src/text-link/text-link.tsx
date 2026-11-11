import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { textLinkVariants } from '@open-components/core/text-link';
import { cn } from '@open-components/utils';

export type TextLinkProps = ComponentProps<'a'> & VariantProps<typeof textLinkVariants>;

export function TextLink({ className, variant, ...props }: TextLinkProps) {
  return (
    <a data-slot="text-link" className={cn(textLinkVariants({ variant }), className)} {...props} />
  );
}
