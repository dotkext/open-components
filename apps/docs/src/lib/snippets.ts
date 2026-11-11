export interface ComponentSnippets {
  react: string;
  angular: string;
  web: string;
}

export const snippets: Record<string, ComponentSnippets> = {
  button: {
    react: `import { Button } from '@open-components/ui-react/button';

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </div>
  );
}`,
    angular: `<button ocButton>Save</button>
<button ocButton variant="outline">Cancel</button>
<button ocButton variant="destructive" size="sm">Delete</button>`,
    web: `<oc-button>Save</oc-button>
<oc-button variant="outline">Cancel</oc-button>
<oc-button variant="destructive" size="sm">Delete</oc-button>`,
  },
  badge: {
    react: `import { Badge } from '@open-components/ui-react/badge';

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`,
    angular: `<span ocBadge>Default</span>
<span ocBadge variant="secondary">Secondary</span>
<span ocBadge variant="destructive">Destructive</span>
<span ocBadge variant="outline">Outline</span>`,
    web: `<oc-badge>Default</oc-badge>
<oc-badge variant="secondary">Secondary</oc-badge>
<oc-badge variant="destructive">Destructive</oc-badge>
<oc-badge variant="outline">Outline</oc-badge>`,
  },
  card: {
    react: `import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@open-components/ui-react/card';
import { Button } from '@open-components/ui-react/button';

export function Example() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>Configure your new project below.</CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
}`,
    angular: `<div ocCard class="max-w-sm">
  <div ocCardHeader>
    <div ocCardTitle>Create project</div>
    <div ocCardDescription>Deploy your new project in one click.</div>
  </div>
  <div ocCardContent>Configure your new project below.</div>
  <div ocCardFooter class="justify-between">
    <button ocButton variant="outline">Cancel</button>
    <button ocButton>Create</button>
  </div>
</div>`,
    web: `<oc-card class="max-w-sm">
  <oc-card-header>
    <oc-card-title>Create project</oc-card-title>
    <oc-card-description>Deploy your new project in one click.</oc-card-description>
  </oc-card-header>
  <oc-card-content>Configure your new project below.</oc-card-content>
  <oc-card-footer class="justify-between">
    <oc-button variant="outline">Cancel</oc-button>
    <oc-button>Create</oc-button>
  </oc-card-footer>
</oc-card>`,
  },
  input: {
    react: `import { Input } from '@open-components/ui-react/input';
import { Label } from '@open-components/ui-react/label';

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}`,
    angular: `<div class="grid w-full max-w-sm gap-2">
  <label ocLabel for="email">Email</label>
  <input ocInput id="email" type="email" placeholder="you@example.com" />
</div>`,
    web: `<div class="grid w-full max-w-sm gap-2">
  <oc-label for="email">Email</oc-label>
  <oc-input id="email" type="email" placeholder="you@example.com"></oc-input>
</div>`,
  },
  label: {
    react: `import { Label } from '@open-components/ui-react/label';
import { Input } from '@open-components/ui-react/input';

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="name">Your name</Label>
      <Input id="name" placeholder="Ada Lovelace" />
    </div>
  );
}`,
    angular: `<div class="grid w-full max-w-sm gap-2">
  <label ocLabel for="name">Your name</label>
  <input ocInput id="name" placeholder="Ada Lovelace" />
</div>`,
    web: `<div class="grid w-full max-w-sm gap-2">
  <oc-label for="name">Your name</oc-label>
  <oc-input id="name" placeholder="Ada Lovelace"></oc-input>
</div>`,
  },
  alert: {
    react: `import {
  Alert, AlertDescription, AlertTitle,
} from '@open-components/ui-react/alert';

export function Example() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
    </Alert>
  );
}`,
    angular: `<div ocAlert variant="destructive">
  <div ocAlertTitle>Something went wrong</div>
  <div ocAlertDescription>Your session has expired. Please sign in again.</div>
</div>`,
    web: `<oc-alert variant="destructive">
  <oc-alert-title>Something went wrong</oc-alert-title>
  <oc-alert-description>Your session has expired. Please sign in again.</oc-alert-description>
</oc-alert>`,
  },
  separator: {
    react: `import { Separator } from '@open-components/ui-react/separator';

export function Example() {
  return (
    <div className="w-full max-w-sm">
      <p className="text-sm">OpenComponents</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}`,
    angular: `<div class="w-full max-w-sm">
  <p class="text-sm">OpenComponents</p>
  <div ocSeparator class="my-4"></div>
  <div class="flex h-5 items-center gap-4 text-sm">
    <span>Docs</span>
    <div ocSeparator orientation="vertical"></div>
    <span>Source</span>
  </div>
</div>`,
    web: `<div class="w-full max-w-sm">
  <p class="text-sm">OpenComponents</p>
  <oc-separator class="my-4"></oc-separator>
  <div class="flex h-5 items-center gap-4 text-sm">
    <span>Docs</span>
    <oc-separator orientation="vertical"></oc-separator>
    <span>Source</span>
  </div>
</div>`,
  },
  skeleton: {
    react: `import { Skeleton } from '@open-components/ui-react/skeleton';

export function Example() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}`,
    angular: `<div class="flex w-full max-w-sm items-center gap-4">
  <div ocSkeleton class="size-12 rounded-full"></div>
  <div class="flex flex-1 flex-col gap-2">
    <div ocSkeleton class="h-4 w-3/4"></div>
    <div ocSkeleton class="h-4 w-1/2"></div>
  </div>
</div>`,
    web: `<div class="flex w-full max-w-sm items-center gap-4">
  <oc-skeleton class="size-12 rounded-full"></oc-skeleton>
  <div class="flex flex-1 flex-col gap-2">
    <oc-skeleton class="h-4 w-3/4"></oc-skeleton>
    <oc-skeleton class="h-4 w-1/2"></oc-skeleton>
  </div>
</div>`,
  },
  sheet: {
    react: `import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from '@open-components/ui-react/sheet';
import { Switch } from '@open-components/ui-react/switch';

export function Example() {
  return (
    <Sheet>
      <SheetTrigger>Open settings</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your workspace preferences.</SheetDescription>
        </SheetHeader>
        <div className="flex items-center justify-between text-sm">
          <span>Email notifications</span>
          <Switch defaultChecked aria-label="Email notifications" />
        </div>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}`,
    angular: `<button ocButton (click)="settingsOpen.set(true)">Open settings</button>
<oc-sheet [(open)]="settingsOpen">
  <div ocSheetHeader>
    <div ocSheetTitle>Settings</div>
    <div ocSheetDescription>Manage your workspace preferences.</div>
  </div>
  <div class="flex items-center justify-between text-sm">
    <span>Email notifications</span>
    <button ocSwitch [(checked)]="emailNotifications" aria-label="Email notifications"></button>
  </div>
  <div ocSheetFooter>
    <button ocSheetClose>Close</button>
  </div>
</oc-sheet>`,
    web: `<oc-button id="open-settings">Open settings</oc-button>
<oc-sheet id="settings-sheet" aria-label="Settings">
  <oc-sheet-header>
    <oc-sheet-title>Settings</oc-sheet-title>
    <oc-sheet-description>Manage your workspace preferences.</oc-sheet-description>
  </oc-sheet-header>
  <div class="flex items-center justify-between text-sm">
    <span>Email notifications</span>
    <oc-switch checked aria-label="Email notifications"></oc-switch>
  </div>
  <oc-sheet-footer>
    <oc-sheet-close>Close</oc-sheet-close>
  </oc-sheet-footer>
</oc-sheet>

<!-- Open it from script: document.getElementById('settings-sheet').open = true -->`,
  },
  switch: {
    react: `import { Switch } from '@open-components/ui-react/switch';

export function Example() {
  return (
    <div className="flex items-center gap-6">
      <Switch defaultChecked aria-label="Enabled" />
      <Switch aria-label="Disabled" />
      <Switch defaultChecked size="sm" aria-label="Small" />
    </div>
  );
}`,
    angular: `<button ocSwitch [checked]="true" aria-label="Enabled"></button>
<button ocSwitch aria-label="Disabled"></button>
<button ocSwitch size="sm" aria-label="Small"></button>`,
    web: `<oc-switch checked aria-label="Enabled"></oc-switch>
<oc-switch aria-label="Disabled"></oc-switch>
<oc-switch checked size="sm" aria-label="Small"></oc-switch>`,
  },
  progress: {
    react: `import { Progress } from '@open-components/ui-react/progress';

export function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={20} aria-label="20% complete" />
      <Progress value={55} aria-label="55% complete" />
      <Progress value={80} className="h-3" aria-label="80% complete" />
    </div>
  );
}`,
    angular: `<div class="flex w-full max-w-sm flex-col gap-4">
  <oc-progress [value]="20" aria-label="20% complete"></oc-progress>
  <oc-progress [value]="55" aria-label="55% complete"></oc-progress>
  <oc-progress [value]="80" class="h-3" aria-label="80% complete"></oc-progress>
</div>`,
    web: `<div class="flex w-full max-w-sm flex-col gap-4">
  <oc-progress value="20" aria-label="20% complete"></oc-progress>
  <oc-progress value="55" aria-label="55% complete"></oc-progress>
  <oc-progress value="80" class="h-3" aria-label="80% complete"></oc-progress>
</div>`,
  },
  'icon-button': {
    react: `import { IconButton } from '@open-components/ui-react/icon-button';

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <IconButton aria-label="Close">×</IconButton>
      <IconButton variant="outline" aria-label="Settings">
        ⚙
      </IconButton>
      <IconButton variant="solid" aria-label="Add">
        +
      </IconButton>
      <IconButton variant="destructive" aria-label="Delete">
        −
      </IconButton>
    </div>
  );
}`,
    angular: `<button ocIconButton aria-label="Close">×</button>
<button ocIconButton variant="outline" aria-label="Settings">⚙</button>
<button ocIconButton variant="solid" aria-label="Add">+</button>
<button ocIconButton variant="destructive" aria-label="Delete">−</button>`,
    web: `<oc-icon-button aria-label="Close">×</oc-icon-button>
<oc-icon-button variant="outline" aria-label="Settings">⚙</oc-icon-button>
<oc-icon-button variant="solid" aria-label="Add">+</oc-icon-button>
<oc-icon-button variant="destructive" aria-label="Delete">−</oc-icon-button>`,
  },
  kbd: {
    react: `import { Kbd } from '@open-components/ui-react/kbd';

export function Example() {
  return (
    <p className="flex items-center gap-2 text-sm">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command menu.
    </p>
  );
}`,
    angular: `<p class="flex items-center gap-2 text-sm">
  Press <kbd ocKbd>Ctrl</kbd> + <kbd ocKbd>K</kbd> to open the command menu.
</p>`,
    web: `<p class="flex items-center gap-2 text-sm">
  Press <oc-kbd>Ctrl</oc-kbd> + <oc-kbd>K</oc-kbd> to open the command menu.
</p>`,
  },
  'text-link': {
    react: `import { TextLink } from '@open-components/ui-react/text-link';

export function Example() {
  return (
    <p className="text-sm">
      Read the <TextLink href="/docs">documentation</TextLink> or{' '}
      <TextLink href="/changelog" variant="muted">
        view the changelog
      </TextLink>
      .
    </p>
  );
}`,
    angular: `<p class="text-sm">
  Read the <a ocTextLink href="/docs">documentation</a> or
  <a ocTextLink href="/changelog" variant="muted">view the changelog</a>.
</p>`,
    web: `<p class="text-sm">
  Read the <oc-link href="/docs">documentation</oc-link> or
  <oc-link href="/changelog" variant="muted">view the changelog</oc-link>.
</p>`,
  },
};
