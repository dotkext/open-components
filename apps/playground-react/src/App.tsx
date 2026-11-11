import { useState } from 'react';
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
  IconButton,
  Input,
  Kbd,
  Label,
  Progress,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Switch,
  TextLink,
} from '@open-components/ui-react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border p-6">{children}</div>
    </section>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">OpenComponents — React</h1>
          <p className="text-muted-foreground text-sm">
            Rendered from <code>@open-components/ui-react</code>.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={toggleDark}>
          {dark ? 'Light mode' : 'Dark mode'}
        </Button>
      </header>

      <Section title="Button">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button className="bg-red-500 hover:bg-red-600">Overridden</Button>
      </Section>

      <Section title="Badge">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one click.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="My project" />
          </div>
          <Separator />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
        <CardFooter>
          <Button>Create</Button>
        </CardFooter>
      </Card>

      <Alert variant="destructive">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components from the registry with the CLI.</AlertDescription>
      </Alert>

      <Section title="Switch">
        <Switch defaultChecked aria-label="Checked" />
        <Switch aria-label="Unchecked" />
        <Switch size="sm" defaultChecked aria-label="Small" />
        <Switch disabled aria-label="Disabled" />
      </Section>

      <Section title="Progress">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Progress value={20} aria-label="20% complete" />
          <Progress value={55} aria-label="55% complete" />
          <Progress value={80} className="h-3" aria-label="80% complete" />
        </div>
      </Section>

      <Section title="Icon Button">
        <IconButton aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </IconButton>
        <IconButton variant="outline" aria-label="Settings">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 5h10M3 11h10" stroke="currentColor" strokeLinecap="round" />
            <circle cx="6" cy="5" r="2" fill="currentColor" />
            <circle cx="10" cy="11" r="2" fill="currentColor" />
          </svg>
        </IconButton>
        <IconButton variant="solid" aria-label="Add">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </IconButton>
        <IconButton variant="destructive" aria-label="Delete">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </IconButton>
      </Section>

      <Section title="Kbd">
        <p className="flex items-center gap-2 text-sm">
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command menu.
        </p>
      </Section>

      <Section title="Text Link">
        <p className="text-sm">
          Read the <TextLink href="#">documentation</TextLink> or{' '}
          <TextLink href="#" variant="muted">
            view the changelog
          </TextLink>
          .
        </p>
      </Section>

      <Section title="Sheet">
        <Button onClick={() => setSheetOpen(true)}>Open settings</Button>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Manage your workspace preferences.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span>Email notifications</span>
                <Switch defaultChecked aria-label="Email notifications" />
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
              <Button variant="outline" onClick={() => setSheetOpen(false)}>
                Done
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Section>
    </main>
  );
}
