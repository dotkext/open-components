import { Component, signal } from '@angular/core';
import {
  OcAlert,
  OcAlertDescription,
  OcAlertTitle,
  OcBadge,
  OcButton,
  OcCard,
  OcCardContent,
  OcCardDescription,
  OcCardFooter,
  OcCardHeader,
  OcCardTitle,
  OcIconButton,
  OcInput,
  OcKbd,
  OcLabel,
  OcProgress,
  OcSeparator,
  OcSheet,
  OcSheetClose,
  OcSheetDescription,
  OcSheetFooter,
  OcSheetHeader,
  OcSheetTitle,
  OcSkeleton,
  OcSwitch,
  OcTextLink,
} from '@open-components/ui-angular';

@Component({
  selector: 'app-root',
  imports: [
    OcAlert,
    OcAlertDescription,
    OcAlertTitle,
    OcBadge,
    OcButton,
    OcCard,
    OcCardContent,
    OcCardDescription,
    OcCardFooter,
    OcCardHeader,
    OcCardTitle,
    OcIconButton,
    OcInput,
    OcKbd,
    OcLabel,
    OcProgress,
    OcSeparator,
    OcSheet,
    OcSheetClose,
    OcSheetDescription,
    OcSheetFooter,
    OcSheetHeader,
    OcSheetTitle,
    OcSkeleton,
    OcSwitch,
    OcTextLink,
  ],
  template: `
    <main class="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12">
      <header class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">OpenComponents — Angular</h1>
          <p class="text-muted-foreground text-sm">
            Rendered from <code>&#64;open-components/ui-angular</code> directives.
          </p>
        </div>
        <button type="button" class="rounded-md border px-3 py-1.5 text-sm" (click)="toggleTheme()">
          {{ dark ? 'Light mode' : 'Dark mode' }}
        </button>
      </header>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Button</h2>
        <div class="flex flex-wrap items-center gap-3 rounded-xl border p-6">
          <button ocButton>Default</button>
          <button ocButton variant="secondary">Secondary</button>
          <button ocButton variant="destructive">Destructive</button>
          <button ocButton variant="outline">Outline</button>
          <button ocButton variant="ghost">Ghost</button>
          <button ocButton variant="link">Link</button>
          <button ocButton size="sm">Small</button>
          <button ocButton size="lg">Large</button>
          <button ocButton class="bg-red-500 hover:bg-red-600">Overridden</button>
          <button ocButton disabled>Disabled</button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Badge</h2>
        <div class="flex flex-wrap items-center gap-3 rounded-xl border p-6">
          <span ocBadge>Default</span>
          <span ocBadge variant="secondary">Secondary</span>
          <span ocBadge variant="destructive">Destructive</span>
          <span ocBadge variant="outline">Outline</span>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Card</h2>
        <div ocCard class="max-w-md">
          <div ocCardHeader>
            <div ocCardTitle>Create project</div>
            <div ocCardDescription>Deploy your new project in one click.</div>
          </div>
          <div ocCardContent class="flex flex-col gap-4">
            <div class="grid gap-2">
              <label ocLabel for="ng-name">Name</label>
              <input ocInput id="ng-name" placeholder="My project" />
            </div>
            <div ocSeparator></div>
            <div ocSkeleton class="h-4 w-3/4"></div>
            <div ocSkeleton class="h-4 w-1/2"></div>
          </div>
          <div ocCardFooter>
            <button ocButton>Create</button>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Alert</h2>
        <div ocAlert variant="destructive">
          <div ocAlertTitle>Heads up!</div>
          <div ocAlertDescription>You can add components from the registry with the CLI.</div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Switch</h2>
        <div class="flex flex-wrap items-center gap-6 rounded-xl border p-6">
          <button ocSwitch [(checked)]="notifications" aria-label="Checked"></button>
          <button ocSwitch aria-label="Unchecked"></button>
          <button ocSwitch size="sm" aria-label="Small"></button>
          <button ocSwitch disabled aria-label="Disabled"></button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Progress</h2>
        <div class="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6">
          <oc-progress [value]="20" aria-label="20% complete"></oc-progress>
          <oc-progress [value]="55" aria-label="55% complete"></oc-progress>
          <oc-progress [value]="80" class="h-3" aria-label="80% complete"></oc-progress>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Icon Button</h2>
        <div class="flex flex-wrap items-center gap-2 rounded-xl border p-6">
          <button ocIconButton aria-label="Close">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-linecap="round" />
            </svg>
          </button>
          <button ocIconButton variant="outline" aria-label="Settings">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 5h10M3 11h10" stroke="currentColor" stroke-linecap="round" />
              <circle cx="6" cy="5" r="2" fill="currentColor" />
              <circle cx="10" cy="11" r="2" fill="currentColor" />
            </svg>
          </button>
          <button ocIconButton variant="solid" aria-label="Add">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Kbd &amp; Text Link</h2>
        <div class="flex flex-col gap-4 rounded-xl border p-6 text-sm">
          <p class="flex flex-wrap items-center gap-2">
            Press <kbd ocKbd>Ctrl</kbd> + <kbd ocKbd>K</kbd> to open the command menu.
          </p>
          <p>
            Read the <a ocTextLink href="#">documentation</a> or
            <a ocTextLink href="#" variant="muted">view the changelog</a>.
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Sheet</h2>
        <div class="flex items-center gap-3 rounded-xl border p-6">
          <button ocButton (click)="sheetOpen.set(true)">Open settings</button>
        </div>
        <oc-sheet [(open)]="sheetOpen" aria-label="Settings">
          <div ocSheetHeader>
            <div ocSheetTitle>Settings</div>
            <div ocSheetDescription>Manage your workspace preferences.</div>
          </div>
          <div class="flex flex-col gap-5 text-sm">
            <div class="flex items-center justify-between gap-4">
              <span>Email notifications</span>
              <button
                ocSwitch
                [(checked)]="notifications"
                aria-label="Email notifications"
              ></button>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span>Usage alerts</span>
              <button ocSwitch aria-label="Usage alerts"></button>
            </div>
            <div class="grid gap-2">
              <span class="text-muted-foreground">Setup progress</span>
              <oc-progress [value]="65" aria-label="Setup progress"></oc-progress>
            </div>
          </div>
          <div ocSheetFooter>
            <button ocButton variant="outline" ocSheetClose>Done</button>
          </div>
        </oc-sheet>
      </section>
    </main>
  `,
})
export class AppComponent {
  protected dark = false;
  protected readonly notifications = signal(true);
  protected readonly sheetOpen = signal(false);

  protected toggleTheme(): void {
    this.dark = !this.dark;
    document.documentElement.classList.toggle('dark', this.dark);
  }
}
