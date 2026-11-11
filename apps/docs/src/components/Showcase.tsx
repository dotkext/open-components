import { useState, type ComponentType } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CodeBlock,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Input,
  Kbd,
  Label,
  Progress,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Step,
  StepDescription,
  StepTitle,
  Steps,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextLink,
} from '@open-components/ui-react';

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 5h10M3 11h10" stroke="currentColor" strokeLinecap="round" />
      <circle cx="6" cy="5" r="2" fill="currentColor" />
      <circle cx="10" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="demo-project-name">Name</Label>
          <Input id="demo-project-name" placeholder="My project" />
        </div>
        <Separator />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
}

function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" type="email" placeholder="you@example.com" />
    </div>
  );
}

function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="demo-name">Your name</Label>
      <Input id="demo-name" placeholder="Ada Lovelace" />
    </div>
  );
}

function AlertDemo() {
  return (
    <div className="grid w-full gap-4">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components with the shadcn CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
      </Alert>
    </div>
  );
}

function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">OpenComponents</h4>
        <p className="text-muted-foreground text-sm">An open component registry.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Registry</span>
      </div>
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <p className="text-muted-foreground text-sm">Press Escape or click the backdrop to close.</p>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Manage your workspace preferences.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span>Email notifications</span>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                aria-label="Email notifications"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Usage alerts</span>
              <Switch aria-label="Usage alerts" />
            </div>
            <div className="grid gap-2">
              <span className="text-muted-foreground">Setup progress</span>
              <Progress value={65} aria-label="Setup progress" />
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 text-sm">
      <div className="flex items-center justify-between gap-6">
        <span>Email notifications</span>
        <Switch checked={checked} onCheckedChange={setChecked} aria-label="Email notifications" />
      </div>
      <div className="flex items-center justify-between gap-6">
        <span>Usage alerts</span>
        <Switch defaultChecked aria-label="Usage alerts" />
      </div>
      <div className="flex items-center justify-between gap-6">
        <span>Small switch</span>
        <Switch size="sm" defaultChecked aria-label="Small switch" />
      </div>
      <div className="flex items-center justify-between gap-6">
        <span className="text-muted-foreground">Disabled</span>
        <Switch disabled aria-label="Disabled switch" />
      </div>
    </div>
  );
}

function ProgressDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={20} aria-label="20% complete" />
      <Progress value={55} aria-label="55% complete" />
      <Progress value={80} className="h-3" aria-label="80% complete" />
    </div>
  );
}

function IconButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <IconButton aria-label="Close">
        <XIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Settings">
        <SlidersIcon />
      </IconButton>
      <IconButton variant="solid" aria-label="Add">
        <PlusIcon />
      </IconButton>
      <IconButton variant="destructive" aria-label="Delete">
        <TrashIcon />
      </IconButton>
    </div>
  );
}

function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span>Press</span>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
        <span>to open the command menu.</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
      </div>
    </div>
  );
}

function TextLinkDemo() {
  return (
    <p className="text-sm">
      Read the <TextLink href="#">documentation</TextLink> or{' '}
      <TextLink href="#" variant="muted">
        view the changelog
      </TextLink>
      .
    </p>
  );
}

function CollapsibleDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border p-4">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <span className="font-medium">Connect a client</span>
          <span className="text-muted-foreground ml-auto text-sm">Toggle</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="text-muted-foreground mt-4 text-sm">
          Once connected you can access everything available in the console.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="desktop" className="w-full max-w-md">
      <TabsList aria-label="Client">
        <TabsTrigger value="desktop">Desktop</TabsTrigger>
        <TabsTrigger value="terminal">Terminal</TabsTrigger>
        <TabsTrigger value="sdk">SDK</TabsTrigger>
      </TabsList>
      <TabsContent value="desktop" className="text-muted-foreground text-sm">
        Install the desktop app and connect this workspace.
      </TabsContent>
      <TabsContent value="terminal" className="text-muted-foreground text-sm">
        Run the CLI and connect from your terminal.
      </TabsContent>
      <TabsContent value="sdk" className="text-muted-foreground text-sm">
        Create an API key and make your first request.
      </TabsContent>
    </Tabs>
  );
}

function StepsDemo() {
  return (
    <Steps className="w-full max-w-md">
      <Step state="complete" number={1}>
        <StepTitle>Install the client</StepTitle>
        <StepDescription>Skip this if you already have it.</StepDescription>
      </Step>
      <Step state="current" number={2}>
        <StepTitle>Connect this workspace</StepTitle>
        <StepDescription>Approve the sign-in in your browser.</StepDescription>
      </Step>
      <Step state="upcoming" number={3}>
        <StepTitle>Choose a model</StepTitle>
        <StepDescription>Pick a model from the selector.</StepDescription>
      </Step>
    </Steps>
  );
}

function DropdownMenuDemo() {
  const [platform, setPlatform] = useState('Other platforms');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md border px-3 py-1.5">
        {platform}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {['macOS', 'Windows', 'Linux'].map((name) => (
          <DropdownMenuItem key={name} onSelect={() => setPlatform(name)}>
            {name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>AppImage</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SegmentedControlDemo() {
  const [language, setLanguage] = useState('curl');
  const snippets: Record<string, string> = {
    curl: 'curl https://api.example.com/v1/models',
    typescript: 'await client.models.list()',
    python: 'client.models.list()',
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <SegmentedControl value={language} onValueChange={setLanguage} aria-label="Language">
        <SegmentedControlItem value="curl">cURL</SegmentedControlItem>
        <SegmentedControlItem value="typescript">TypeScript</SegmentedControlItem>
        <SegmentedControlItem value="python">Python</SegmentedControlItem>
      </SegmentedControl>
      <CodeBlock code={snippets[language] ?? ''} />
    </div>
  );
}

function CodeBlockDemo() {
  return <CodeBlock code="npm install -g @opencode/cli" className="w-full max-w-md" />;
}

const demos: Record<string, ComponentType> = {
  button: ButtonDemo,
  badge: BadgeDemo,
  card: CardDemo,
  input: InputDemo,
  label: LabelDemo,
  alert: AlertDemo,
  separator: SeparatorDemo,
  skeleton: SkeletonDemo,
  sheet: SheetDemo,
  switch: SwitchDemo,
  progress: ProgressDemo,
  'icon-button': IconButtonDemo,
  kbd: KbdDemo,
  'text-link': TextLinkDemo,
  collapsible: CollapsibleDemo,
  tabs: TabsDemo,
  steps: StepsDemo,
  'dropdown-menu': DropdownMenuDemo,
  'segmented-control': SegmentedControlDemo,
  'code-block': CodeBlockDemo,
};

export default function Showcase({ name }: { name: string }) {
  const Demo = demos[name];
  if (!Demo) return null;
  return <Demo />;
}
