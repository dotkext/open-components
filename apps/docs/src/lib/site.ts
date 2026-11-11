export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: 'Layout' | 'Forms' | 'Feedback' | 'Display';
  webPreview: string;
}

export const components: ComponentDoc[] = [
  {
    slug: 'button',
    title: 'Button',
    description: 'Displays a button or a component that looks like a button.',
    category: 'Forms',
    webPreview: `
      <div class="flex flex-wrap items-center gap-3">
        <oc-button>Default</oc-button>
        <oc-button variant="secondary">Secondary</oc-button>
        <oc-button variant="outline">Outline</oc-button>
        <oc-button variant="ghost">Ghost</oc-button>
        <oc-button variant="link">Link</oc-button>
        <oc-button variant="destructive" size="sm">Delete</oc-button>
        <oc-button class="bg-red-500">Overridden</oc-button>
        <oc-button disabled>Disabled</oc-button>
      </div>
    `,
  },
  {
    slug: 'badge',
    title: 'Badge',
    description: 'Displays a badge or a component that looks like a badge.',
    category: 'Display',
    webPreview: `
      <div class="flex flex-wrap items-center gap-3">
        <oc-badge>Default</oc-badge>
        <oc-badge variant="secondary">Secondary</oc-badge>
        <oc-badge variant="destructive">Destructive</oc-badge>
        <oc-badge variant="outline">Outline</oc-badge>
      </div>
    `,
  },
  {
    slug: 'card',
    title: 'Card',
    description: 'Displays a card with header, content, and footer.',
    category: 'Layout',
    webPreview: `
      <oc-card class="max-w-sm">
        <oc-card-header>
          <oc-card-title>Create project</oc-card-title>
          <oc-card-description>Deploy your new project in one click.</oc-card-description>
        </oc-card-header>
        <oc-card-content class="flex flex-col gap-2">
          <oc-separator></oc-separator>
          <oc-skeleton class="h-4 w-3/4"></oc-skeleton>
        </oc-card-content>
        <oc-card-footer class="justify-between">
          <oc-button variant="outline">Cancel</oc-button>
          <oc-button>Create</oc-button>
        </oc-card-footer>
      </oc-card>
    `,
  },
  {
    slug: 'input',
    title: 'Input',
    description: 'Displays a form input field.',
    category: 'Forms',
    webPreview: `
      <div class="grid w-full max-w-sm gap-2">
        <oc-label for="preview-email">Email</oc-label>
        <oc-input id="preview-email" type="email" placeholder="you@example.com"></oc-input>
      </div>
    `,
  },
  {
    slug: 'label',
    title: 'Label',
    description: 'Renders an accessible label associated with controls.',
    category: 'Forms',
    webPreview: `
      <div class="grid w-full max-w-sm gap-2">
        <oc-label for="preview-label">Your name</oc-label>
        <oc-input id="preview-label" placeholder="Ada Lovelace"></oc-input>
      </div>
    `,
  },
  {
    slug: 'alert',
    title: 'Alert',
    description: 'Displays a callout for user attention.',
    category: 'Feedback',
    webPreview: `
      <div class="grid w-full gap-4">
        <oc-alert>
          <oc-alert-title>Heads up!</oc-alert-title>
          <oc-alert-description>You can add components with the shadcn CLI.</oc-alert-description>
        </oc-alert>
        <oc-alert variant="destructive">
          <oc-alert-title>Something went wrong</oc-alert-title>
          <oc-alert-description>Your session has expired. Please sign in again.</oc-alert-description>
        </oc-alert>
      </div>
    `,
  },
  {
    slug: 'separator',
    title: 'Separator',
    description: 'Visually or semantically separates content.',
    category: 'Layout',
    webPreview: `
      <div class="w-full max-w-sm">
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">OpenComponents</h4>
          <p class="text-muted-foreground text-sm">An open component registry.</p>
        </div>
        <oc-separator class="my-4"></oc-separator>
        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Docs</span>
          <oc-separator orientation="vertical"></oc-separator>
          <span>Source</span>
          <oc-separator orientation="vertical"></oc-separator>
          <span>Registry</span>
        </div>
      </div>
    `,
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    description: 'Use to show a placeholder while content is loading.',
    category: 'Display',
    webPreview: `
      <div class="flex w-full max-w-sm items-center gap-4">
        <oc-skeleton class="size-12 rounded-full"></oc-skeleton>
        <div class="flex flex-1 flex-col gap-2">
          <oc-skeleton class="h-4 w-3/4"></oc-skeleton>
          <oc-skeleton class="h-4 w-1/2"></oc-skeleton>
        </div>
      </div>
    `,
  },
];

export const componentBySlug = Object.fromEntries(
  components.map((component) => [component.slug, component]),
) as Record<string, ComponentDoc>;

/** Prefix an internal path with Astro's configured base (GitHub Pages support). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return `${base}${path.replace(/^\//, '')}`;
}

export const gettingStartedLinks = [
  { label: 'Installation', href: 'installation' },
  { label: 'Theming', href: 'theming' },
  { label: 'Registry', href: 'registry' },
];
