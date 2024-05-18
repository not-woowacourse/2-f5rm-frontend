import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type InfoAreaProps = PropsWithChildren & {
  hasHeader?: boolean;
};

export function InfoArea({ children, hasHeader = false }: InfoAreaProps) {
  return (
    <section
      className={cn(
        'flex flex-grow flex-col gap-3.5 overflow-auto p-4 text-base-600 dark:text-base-dark-400',
        hasHeader && 'pt-16',
      )}
    >
      {children}
    </section>
  );
}
