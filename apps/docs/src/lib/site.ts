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
  {
    slug: 'sheet',
    title: 'Sheet',
    description: 'A modal panel that slides in from an edge of the screen.',
    category: 'Layout',
    webPreview: `
      <div class="flex flex-col items-center gap-3">
        <button
          type="button"
          class="bg-primary text-primary-foreground inline-flex h-9 items-center rounded-md px-4 text-sm font-medium"
          onclick="document.getElementById('oc-demo-sheet').open = true"
        >
          Open sheet
        </button>
        <p class="text-muted-foreground text-sm">Press Escape or click the backdrop to close.</p>
      </div>
      <oc-sheet id="oc-demo-sheet" aria-label="Settings">
        <oc-sheet-header>
          <oc-sheet-title>Settings</oc-sheet-title>
          <oc-sheet-description>Manage your workspace preferences.</oc-sheet-description>
        </oc-sheet-header>
        <div class="flex flex-col gap-4 text-sm">
          <div class="flex items-center justify-between gap-4">
            <span>Email notifications</span>
            <oc-switch checked aria-label="Email notifications"></oc-switch>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span>Usage alerts</span>
            <oc-switch aria-label="Usage alerts"></oc-switch>
          </div>
          <oc-progress value="65" aria-label="Setup progress"></oc-progress>
        </div>
        <oc-sheet-footer>
          <oc-sheet-close
            class="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium"
          >
            Close
          </oc-sheet-close>
        </oc-sheet-footer>
      </oc-sheet>
    `,
  },
  {
    slug: 'switch',
    title: 'Switch',
    description: 'A control that toggles between on and off states.',
    category: 'Forms',
    webPreview: `
      <div class="flex flex-wrap items-center gap-6">
        <oc-switch checked aria-label="Checked"></oc-switch>
        <oc-switch aria-label="Unchecked"></oc-switch>
        <oc-switch checked size="sm" aria-label="Small"></oc-switch>
        <oc-switch disabled aria-label="Disabled"></oc-switch>
      </div>
    `,
  },
  {
    slug: 'progress',
    title: 'Progress',
    description: 'Displays an indicator showing the completion progress of a task.',
    category: 'Feedback',
    webPreview: `
      <div class="flex w-full max-w-sm flex-col gap-4">
        <oc-progress value="20" aria-label="20% complete"></oc-progress>
        <oc-progress value="55" aria-label="55% complete"></oc-progress>
        <oc-progress value="80" class="h-3" aria-label="80% complete"></oc-progress>
      </div>
    `,
  },
  {
    slug: 'icon-button',
    title: 'Icon Button',
    description: 'A button that contains only an icon.',
    category: 'Forms',
    webPreview: `
      <div class="flex items-center gap-2">
        <oc-icon-button aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-linecap="round"/></svg>
        </oc-icon-button>
        <oc-icon-button variant="outline" aria-label="Settings">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 5h10M3 11h10" stroke="currentColor" stroke-linecap="round"/><circle cx="6" cy="5" r="2" fill="currentColor"/><circle cx="10" cy="11" r="2" fill="currentColor"/></svg>
        </oc-icon-button>
        <oc-icon-button variant="solid" aria-label="Add">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-linecap="round"/></svg>
        </oc-icon-button>
        <oc-icon-button variant="destructive" aria-label="Delete">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4" stroke="currentColor" stroke-linecap="round"/></svg>
        </oc-icon-button>
      </div>
    `,
  },
  {
    slug: 'kbd',
    title: 'Kbd',
    description: 'Displays a keyboard keycap.',
    category: 'Display',
    webPreview: `
      <div class="flex flex-col items-center gap-4 text-sm">
        <div class="flex flex-wrap items-center gap-2">
          <span>Press</span>
          <oc-kbd>Ctrl</oc-kbd>
          <span>+</span>
          <oc-kbd>K</oc-kbd>
          <span>to open the command menu.</span>
        </div>
        <div class="flex items-center gap-2">
          <oc-kbd>Shift</oc-kbd>
          <oc-kbd>Enter</oc-kbd>
        </div>
      </div>
    `,
  },
  {
    slug: 'text-link',
    title: 'Text Link',
    description: 'An inline link for navigation or secondary actions.',
    category: 'Display',
    webPreview: `
      <p class="text-sm">
        Read the <oc-link href="https://example.com">documentation</oc-link> or
        <oc-link href="#" variant="muted">view the changelog</oc-link>.
      </p>
    `,
  },
  {
    slug: 'collapsible',
    title: 'Collapsible',
    description: 'A disclosure region that expands and collapses its content.',
    category: 'Layout',
    webPreview: `
      <oc-collapsible open class="w-full max-w-md rounded-xl border p-4">
        <oc-collapsible-trigger>
          <span class="font-medium">Connect a client</span>
          <span class="text-muted-foreground ml-auto text-sm">Toggle</span>
        </oc-collapsible-trigger>
        <oc-collapsible-content class="text-muted-foreground mt-4 text-sm">
          Once connected you can access everything available in the console.
        </oc-collapsible-content>
      </oc-collapsible>
    `,
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    description: 'Layered panels that reveal one section at a time.',
    category: 'Layout',
    webPreview: `
      <oc-tabs value="desktop" class="w-full">
        <oc-tab-list aria-label="Client">
          <oc-tab value="desktop">Desktop</oc-tab>
          <oc-tab value="terminal">Terminal</oc-tab>
          <oc-tab value="sdk">SDK</oc-tab>
        </oc-tab-list>
        <oc-tab-panel value="desktop" class="text-muted-foreground text-sm">
          Install the desktop app and connect this workspace.
        </oc-tab-panel>
        <oc-tab-panel value="terminal" class="text-muted-foreground text-sm">
          Run the CLI and connect from your terminal.
        </oc-tab-panel>
        <oc-tab-panel value="sdk" class="text-muted-foreground text-sm">
          Create an API key and make your first request.
        </oc-tab-panel>
      </oc-tabs>
    `,
  },
  {
    slug: 'steps',
    title: 'Steps',
    description: 'A vertical sequence of steps with completion states.',
    category: 'Display',
    webPreview: `
      <oc-steps class="w-full max-w-md">
        <oc-step state="complete" number="1">
          <oc-step-title>Install the client</oc-step-title>
          <oc-step-description>Skip this if you already have it.</oc-step-description>
        </oc-step>
        <oc-step state="current" number="2">
          <oc-step-title>Connect this workspace</oc-step-title>
          <oc-step-description>Approve the sign-in in your browser.</oc-step-description>
        </oc-step>
        <oc-step state="upcoming" number="3">
          <oc-step-title>Choose a model</oc-step-title>
          <oc-step-description>Pick a model from the selector.</oc-step-description>
        </oc-step>
      </oc-steps>
    `,
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'A floating menu of actions or options.',
    category: 'Display',
    webPreview: `
      <oc-dropdown-menu>
        <oc-dropdown-trigger>Other platforms</oc-dropdown-trigger>
        <oc-dropdown-content>
          <oc-dropdown-label>Installers</oc-dropdown-label>
          <oc-dropdown-item value="macos">macOS</oc-dropdown-item>
          <oc-dropdown-item value="windows">Windows</oc-dropdown-item>
          <oc-dropdown-separator></oc-dropdown-separator>
          <oc-dropdown-item value="linux">Linux</oc-dropdown-item>
        </oc-dropdown-content>
      </oc-dropdown-menu>
    `,
  },
  {
    slug: 'segmented-control',
    title: 'Segmented Control',
    description: 'A compact set of mutually exclusive options.',
    category: 'Forms',
    webPreview: `
      <div class="flex flex-col items-center gap-4">
        <oc-segmented-control value="curl" aria-label="Language">
          <oc-segment value="curl">cURL</oc-segment>
          <oc-segment value="typescript">TypeScript</oc-segment>
          <oc-segment value="python">Python</oc-segment>
        </oc-segmented-control>
        <p class="text-muted-foreground text-sm">Selected: cURL</p>
      </div>
    `,
  },
  {
    slug: 'code-block',
    title: 'Code Block',
    description: 'A code snippet with a copy action.',
    category: 'Display',
    webPreview: `
      <oc-code-block
        code="npm install -g @opencode/cli"
        class="w-full max-w-md"
      ></oc-code-block>
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
