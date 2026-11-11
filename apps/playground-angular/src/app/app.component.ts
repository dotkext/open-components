import { Component } from '@angular/core';
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
  OcInput,
  OcLabel,
  OcSeparator,
  OcSkeleton,
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
    OcInput,
    OcLabel,
    OcSeparator,
    OcSkeleton,
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
    </main>
  `,
})
export class AppComponent {
  protected dark = false;

  protected toggleTheme(): void {
    this.dark = !this.dark;
    document.documentElement.classList.toggle('dark', this.dark);
  }
}
