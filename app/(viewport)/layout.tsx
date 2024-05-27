import { type PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div
      id="container-wrapper"
      className="flex w-full flex-col items-center justify-center bg-slate-100"
    >
      <div className="flex h-screen w-full max-w-[500px] flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
