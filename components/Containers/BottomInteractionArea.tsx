import type { PropsWithChildren } from 'react';

export function BottomInteractionArea({ children }: PropsWithChildren) {
  return <section className="flex flex-col gap-3 p-3.5">{children}</section>;
}
