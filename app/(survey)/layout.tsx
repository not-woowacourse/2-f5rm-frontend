import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const SurveyLayout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={cn(
        'mx-auto min-h-dvh max-w-lg',
        'bg-gradient-to-r from-orange-500 to-red-500 text-white',
        'p-4',
      )}
    >
      {children}
    </main>
  );
};

export default SurveyLayout;
