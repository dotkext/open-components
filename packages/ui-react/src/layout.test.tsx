import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs/tabs';
import { Step, StepDescription, StepTitle, Steps } from './steps/steps';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu/dropdown-menu';
import { SegmentedControl, SegmentedControlItem } from './segmented-control/segmented-control';
import { CodeBlock } from './code-block/code-block';

describe('Collapsible', () => {
  it('toggles the content and exposes aria state', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole('button', { name: 'Details' });
    const content = screen.getByText('Hidden content');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content).not.toBeVisible();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).toBeVisible();
  });
});

describe('Tabs', () => {
  function Example() {
    return (
      <Tabs defaultValue="desktop">
        <TabsList aria-label="Client">
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="terminal">Terminal</TabsTrigger>
          <TabsTrigger value="sdk">SDK</TabsTrigger>
        </TabsList>
        <TabsContent value="desktop">Desktop content</TabsContent>
        <TabsContent value="terminal">Terminal content</TabsContent>
        <TabsContent value="sdk">SDK content</TabsContent>
      </Tabs>
    );
  }

  it('shows the selected panel and switches on click', () => {
    render(<Example />);
    expect(screen.getByText('Desktop content')).toBeVisible();
    expect(screen.getByText('Terminal content')).not.toBeVisible();

    fireEvent.click(screen.getByRole('tab', { name: 'Terminal' }));
    expect(screen.getByRole('tab', { name: 'Terminal' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Terminal content')).toBeVisible();
  });

  it('moves selection with arrow keys', () => {
    render(<Example />);
    const desktop = screen.getByRole('tab', { name: 'Desktop' });
    desktop.focus();
    fireEvent.keyDown(desktop, { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Terminal' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Terminal content')).toBeVisible();
  });
});

describe('Steps', () => {
  it('renders step states', () => {
    render(
      <Steps>
        <Step state="complete" number={1}>
          <StepTitle>Install</StepTitle>
          <StepDescription>Already done.</StepDescription>
        </Step>
        <Step state="current" number={2}>
          <StepTitle>Connect</StepTitle>
        </Step>
        <Step state="upcoming" number={3}>
          <StepTitle>Choose a model</StepTitle>
        </Step>
      </Steps>,
    );

    const steps = screen.getAllByRole('listitem');
    expect(steps).toHaveLength(3);
    expect(steps[0]).toHaveAttribute('data-state', 'complete');
    expect(steps[1]).toHaveAttribute('data-state', 'current');
    expect(screen.getByText('Choose a model')).toBeInTheDocument();
  });
});

describe('DropdownMenu', () => {
  function Example({ onSelect }: { onSelect?: () => void }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>Other platforms</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>macOS</DropdownMenuItem>
          <DropdownMenuItem>Windows</DropdownMenuItem>
          <DropdownMenuItem disabled>Linux</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  it('opens, selects an item and closes', () => {
    const onSelect = vi.fn();
    render(<Example onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'Other platforms' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'macOS' }));

    fireEvent.click(screen.getByRole('menuitem', { name: 'macOS' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: 'Other platforms' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('SegmentedControl', () => {
  it('selects an item and reflects aria-pressed', () => {
    render(
      <SegmentedControl defaultValue="curl">
        <SegmentedControlItem value="curl">cURL</SegmentedControlItem>
        <SegmentedControlItem value="ts">TypeScript</SegmentedControlItem>
      </SegmentedControl>,
    );

    const curl = screen.getByRole('button', { name: 'cURL' });
    const ts = screen.getByRole('button', { name: 'TypeScript' });
    expect(curl).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(ts);
    expect(ts).toHaveAttribute('aria-pressed', 'true');
    expect(curl).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('CodeBlock', () => {
  it('renders code and copies it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<CodeBlock code="npm install -g @opencode/cli" />);
    expect(screen.getByText('npm install -g @opencode/cli')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(writeText).toHaveBeenCalledWith('npm install -g @opencode/cli');
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});
