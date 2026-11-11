import { describe, expect, it } from 'vitest';
import { alertVariants, alertDescriptionClass } from './alert/index';
import { badgeVariants } from './badge/index';
import { buttonVariants } from './button/index';
import { cardClass } from './card/index';
import { iconButtonVariants } from './icon-button/index';
import { inputClass } from './input/index';
import { kbdClass } from './kbd/index';
import { labelClass } from './label/index';
import { progressClass } from './progress/index';
import { separatorVariants } from './separator/index';
import { sheetContentVariants } from './sheet/index';
import { skeletonClass } from './skeleton/index';
import { switchVariants } from './switch/index';
import { textLinkVariants } from './text-link/index';

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

describe('new primitives', () => {
  it('switch variants expose sizes and state hooks', () => {
    expect(switchVariants()).toContain('data-[state=checked]:bg-primary');
    expect(switchVariants({ size: 'sm' })).toContain('h-4');
  });

  it('progress exposes track classes', () => {
    expect(progressClass).toContain('bg-input');
  });

  it('icon button exposes variants and sizes', () => {
    expect(iconButtonVariants()).toContain('hover:bg-accent');
    expect(iconButtonVariants({ variant: 'solid', size: 'lg' })).toContain('size-10');
  });

  it('kbd, text link and sheet classes are defined', () => {
    expect(kbdClass).toContain('font-mono');
    expect(textLinkVariants({ variant: 'muted' })).toContain('text-muted-foreground');
    expect(sheetContentVariants({ side: 'left' })).toContain('border-r');
  });
});
