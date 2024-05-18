import type { PropsWithChildren } from 'react';

export function ButtonContainer({ children }: PropsWithChildren) {
  return <div className="flex gap-2.5">{children}</div>;
}
