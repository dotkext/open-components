import type { ComponentProps } from 'react';
import { kbdClass } from '@open-components/core/kbd';
import { cn } from '@open-components/utils';

export type KbdProps = ComponentProps<'kbd'>;

export function Kbd({ className, ...props }: KbdProps) {
  return <kbd data-slot="kbd" className={cn(kbdClass, className)} {...props} />;
}
