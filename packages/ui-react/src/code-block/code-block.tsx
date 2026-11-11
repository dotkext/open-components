import { useState, type ComponentProps } from 'react';
import { codeBlockClass, codeBlockPreClass } from '@open-components/core/code-block';
import { cn, copyText } from '@open-components/utils';

export type CodeBlockProps = Omit<ComponentProps<'div'>, 'children'> & {
  code: string;
  copyable?: boolean;
};

export function CodeBlock({ code, copyable = true, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await copyText(code)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div data-slot="code-block" className={cn(codeBlockClass, className)} {...props}>
      <pre className={codeBlockPreClass}>
        <code>{code}</code>
      </pre>
      {copyable && (
        <button
          type="button"
          data-slot="code-block-copy"
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="bg-background/80 hover:bg-accent absolute right-2 top-2 inline-flex h-7 items-center rounded-md border px-2 text-xs font-medium transition-colors"
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
}
