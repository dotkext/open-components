export const stepsClass = 'flex flex-col';

export const stepClass =
  'relative flex flex-col gap-1 pb-6 pl-10 after:absolute after:left-3 after:top-8 after:bottom-0 after:w-px after:bg-border last:pb-0 last:after:hidden';

export const stepMarkerClass =
  'absolute left-0 top-0 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-medium data-[state=complete]:border-primary data-[state=complete]:bg-primary data-[state=complete]:text-primary-foreground data-[state=current]:border-primary data-[state=current]:text-primary data-[state=upcoming]:text-muted-foreground';

export const stepTitleClass = 'text-sm font-medium';

export const stepDescriptionClass = 'text-muted-foreground text-sm';

export type StepState = 'complete' | 'current' | 'upcoming';
