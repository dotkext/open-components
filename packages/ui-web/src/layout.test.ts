import { describe, expect, it, vi } from 'vitest';
import './code-block/code-block';
import './collapsible/collapsible';
import './dropdown-menu/dropdown-menu';
import './segmented-control/segmented-control';
import './steps/steps';
import './tabs/tabs';

type OcTestElement = HTMLElement & { updateComplete: Promise<boolean> };

const create = (tag: string): OcTestElement => document.createElement(tag) as OcTestElement;

describe('oc-collapsible', () => {
  it('toggles the content from the trigger', async () => {
    const collapsible = create('oc-collapsible');
    collapsible.innerHTML = `
      <oc-collapsible-trigger>Details</oc-collapsible-trigger>
      <oc-collapsible-content>Hidden</oc-collapsible-content>
    `;
    document.body.append(collapsible);
    await collapsible.updateComplete;

    const trigger = collapsible.querySelector<HTMLElement>('oc-collapsible-trigger')!;
    const content = collapsible.querySelector<HTMLElement>('oc-collapsible-content')!;

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(content.hidden).toBe(true);

    trigger.click();
    await collapsible.updateComplete;

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(content.hidden).toBe(false);
  });
});

describe('oc-tabs', () => {
  it('wires tabs and panels and switches on click', async () => {
    const tabs = create('oc-tabs');
    tabs.setAttribute('value', 'desktop');
    tabs.innerHTML = `
      <oc-tab-list>
        <oc-tab value="desktop">Desktop</oc-tab>
        <oc-tab value="terminal">Terminal</oc-tab>
      </oc-tab-list>
      <oc-tab-panel value="desktop">Desktop content</oc-tab-panel>
      <oc-tab-panel value="terminal">Terminal content</oc-tab-panel>
    `;
    document.body.append(tabs);
    await tabs.updateComplete;

    const desktop = tabs.querySelector<HTMLElement>('oc-tab[value="desktop"]')!;
    const terminal = tabs.querySelector<HTMLElement>('oc-tab[value="terminal"]')!;
    const terminalPanel = tabs.querySelector<HTMLElement>('oc-tab-panel[value="terminal"]')!;

    expect(desktop.getAttribute('aria-selected')).toBe('true');
    expect(terminalPanel.hidden).toBe(true);

    terminal.click();
    await tabs.updateComplete;

    expect(terminal.getAttribute('aria-selected')).toBe('true');
    expect(terminalPanel.hidden).toBe(false);
  });

  it('activates tabs with arrow keys', async () => {
    const tabs = create('oc-tabs');
    tabs.setAttribute('value', 'one');
    tabs.innerHTML = `
      <oc-tab-list>
        <oc-tab value="one">One</oc-tab>
        <oc-tab value="two">Two</oc-tab>
      </oc-tab-list>
      <oc-tab-panel value="one">One content</oc-tab-panel>
      <oc-tab-panel value="two">Two content</oc-tab-panel>
    `;
    document.body.append(tabs);
    await tabs.updateComplete;

    const one = tabs.querySelector<HTMLElement>('oc-tab[value="one"]')!;
    one.focus();
    one.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await tabs.updateComplete;

    expect(tabs.getAttribute('value')).toBe('two');
    expect(
      tabs.querySelector<HTMLElement>('oc-tab[value="two"]')?.getAttribute('aria-selected'),
    ).toBe('true');
  });
});

describe('oc-steps', () => {
  it('renders step states and numbers', async () => {
    const steps = create('oc-steps');
    steps.innerHTML = `
      <oc-step state="complete" number="1"><oc-step-title>Install</oc-step-title></oc-step>
      <oc-step state="upcoming" number="3"><oc-step-title>Model</oc-step-title></oc-step>
    `;
    document.body.append(steps);
    await steps.updateComplete;

    const stepElements = steps.querySelectorAll<HTMLElement>('oc-step');
    await (stepElements[0] as OcTestElement | undefined)?.updateComplete;

    expect(stepElements[0]?.getAttribute('data-state')).toBe('complete');
    expect(stepElements[0]?.querySelector('svg')).not.toBeNull();
    expect(stepElements[1]?.querySelector('[data-slot="step-marker"]')?.textContent?.trim()).toBe(
      '3',
    );
  });
});

describe('oc-dropdown-menu', () => {
  it('shows items, selects one and emits oc-select', async () => {
    const menu = create('oc-dropdown-menu');
    menu.innerHTML = `
      <oc-dropdown-trigger>Other platforms</oc-dropdown-trigger>
      <oc-dropdown-content>
        <oc-dropdown-item value="macos">macOS</oc-dropdown-item>
        <oc-dropdown-item value="windows">Windows</oc-dropdown-item>
      </oc-dropdown-content>
    `;
    document.body.append(menu);
    await menu.updateComplete;

    const trigger = menu.querySelector<HTMLElement>('oc-dropdown-trigger')!;
    const content = menu.querySelector<HTMLElement>('oc-dropdown-content')!;
    expect(content.hidden).toBe(true);

    trigger.click();
    await menu.updateComplete;
    expect(content.hidden).toBe(false);

    const listener = vi.fn();
    menu.addEventListener('oc-select', listener);
    menu.querySelector<HTMLElement>('oc-dropdown-item[value="macos"]')!.click();
    await menu.updateComplete;

    expect(listener).toHaveBeenCalledTimes(1);
    expect(content.hidden).toBe(true);
  });

  it('closes on Escape', async () => {
    const menu = create('oc-dropdown-menu');
    menu.innerHTML = `
      <oc-dropdown-trigger>Open</oc-dropdown-trigger>
      <oc-dropdown-content><oc-dropdown-item>One</oc-dropdown-item></oc-dropdown-content>
    `;
    menu.setAttribute('open', '');
    document.body.append(menu);
    await menu.updateComplete;

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await menu.updateComplete;

    expect(menu.hasAttribute('open')).toBe(false);
  });
});

describe('oc-segmented-control', () => {
  it('selects a segment', async () => {
    const control = create('oc-segmented-control');
    control.setAttribute('value', 'curl');
    control.innerHTML = `
      <oc-segment value="curl">cURL</oc-segment>
      <oc-segment value="ts">TypeScript</oc-segment>
    `;
    document.body.append(control);
    await control.updateComplete;

    const ts = control.querySelector<HTMLElement>('oc-segment[value="ts"]')!;
    const listener = vi.fn();
    control.addEventListener('oc-value-change', listener);

    ts.click();
    await control.updateComplete;

    expect(control.getAttribute('value')).toBe('ts');
    expect(ts.getAttribute('aria-pressed')).toBe('true');
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('oc-code-block', () => {
  it('renders code and copies it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const block = create('oc-code-block');
    block.setAttribute('code', 'npm install -g @opencode/cli');
    document.body.append(block);
    await block.updateComplete;

    expect(block.textContent).toContain('npm install -g @opencode/cli');

    block.querySelector<HTMLElement>('[data-slot="code-block-copy"]')!.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await block.updateComplete;

    expect(writeText).toHaveBeenCalledWith('npm install -g @opencode/cli');
    expect(
      block.querySelector<HTMLElement>('[data-slot="code-block-copy"]')?.getAttribute('aria-label'),
    ).toBe('Copied');
  });
});
