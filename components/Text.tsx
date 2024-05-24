import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface TitleProps {
  text: string;
}

export function Title({ text }: TitleProps) {
  return (
    <h1 className="text-base-800 text-balance text-xl font-extrabold">
      {text}
    </h1>
  );
}

interface ParagraphProps {
  text: string;
  className?: string;
}

export function Paragraph({ text, className }: ParagraphProps) {
  return text.split('\n').map((paragraph, index) => (
    <p key={index} className={cn(className)}>
      {paragraph}
    </p>
  ));
}

interface TextContainerProps extends PropsWithChildren {
  className?: string;
}

export function TextContainer({ children, className }: TextContainerProps) {
  return (
    <section
      className={cn(
        className,
        'text-base-600 flex w-full flex-col gap-3.5 overflow-auto p-4',
      )}
    >
      {children}
    </section>
  );
}
