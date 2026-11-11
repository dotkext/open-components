import { describe, expect, it } from 'vitest';
import { alertVariants, alertDescriptionClass } from './alert/index';
import { badgeVariants } from './badge/index';
import { buttonVariants } from './button/index';
import { cardClass } from './card/index';
import { inputClass } from './input/index';
import { labelClass } from './label/index';
import { separatorVariants } from './separator/index';
import { skeletonClass } from './skeleton/index';

describe('buttonVariants', () => {
  it('applies the default variant and size', () => {
    const classes = buttonVariants();
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('h-9');
  });

  it('applies each variant', () => {
    expect(buttonVariants({ variant: 'outline' })).toContain('bg-background');
    expect(buttonVariants({ variant: 'ghost' })).toContain('hover:bg-accent');
    expect(buttonVariants({ variant: 'destructive' })).toContain('bg-destructive');
    expect(buttonVariants({ variant: 'secondary' })).toContain('bg-secondary');
    expect(buttonVariants({ variant: 'link' })).toContain('underline-offset-4');
  });

  it('applies each size', () => {
    expect(buttonVariants({ size: 'sm' })).toContain('h-8');
    expect(buttonVariants({ size: 'lg' })).toContain('h-10');
    expect(buttonVariants({ size: 'icon' })).toContain('size-9');
  });
});

describe('badgeVariants', () => {
  it('applies variants', () => {
    expect(badgeVariants()).toContain('bg-primary');
    expect(badgeVariants({ variant: 'secondary' })).toContain('bg-secondary');
    expect(badgeVariants({ variant: 'destructive' })).toContain('bg-destructive');
    expect(badgeVariants({ variant: 'outline' })).toContain('text-foreground');
  });
});

describe('alertVariants', () => {
  it('applies variants', () => {
    expect(alertVariants()).toContain('bg-card');
    expect(alertVariants({ variant: 'destructive' })).toContain('text-destructive');
    expect(alertDescriptionClass).toContain('text-muted-foreground');
  });
});

describe('static class definitions', () => {
  it('exposes classes for card, input, label and skeleton', () => {
    expect(cardClass).toContain('rounded-xl');
    expect(inputClass).toContain('h-9');
    expect(labelClass).toContain('text-sm');
    expect(skeletonClass).toContain('animate-pulse');
  });

  it('exposes separator orientations', () => {
    expect(separatorVariants()).toContain('h-px');
    expect(separatorVariants({ orientation: 'vertical' })).toContain('w-px');
  });
});
