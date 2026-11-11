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
};
