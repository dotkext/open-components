export const dropdownTriggerClass =
  'inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50';

export const dropdownContentClass =
  'bg-popover text-popover-foreground absolute right-0 top-full z-50 mt-1 min-w-40 overflow-hidden rounded-md border p-1 shadow-md data-[state=closed]:hidden';

export const dropdownItemClass =
  'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50';

export const dropdownLabelClass = 'text-muted-foreground px-2 py-1.5 text-xs font-medium';

export const dropdownSeparatorClass = 'bg-border -mx-1 my-1 h-px';
