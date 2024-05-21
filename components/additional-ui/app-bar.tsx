'use client';

import { useRouter } from 'next/navigation';

import { type PropsWithChildren } from 'react';

import { ChevronLeft } from 'lucide-react';

import { IconButton } from '@/components/additional-ui/icon-button';
import { cn } from '@/lib/utils';
import { type PropsWithClassName } from '@/types/props';

const AppBar = ({
  className,
  children,
}: PropsWithChildren & PropsWithClassName) => {
  return (
    <header
      className={cn(
        'fixed inset-x-auto top-0 z-50 flex h-14 w-full max-w-lg items-center px-2',
        className,
      )}
    >
      {children}
    </header>
  );
};

type AppBarBackProps = {
  onClick?: () => void;
};

const AppBarBack = ({ onClick }: AppBarBackProps) => {
  const router = useRouter();

  return (
    <IconButton size="lg" onClick={onClick ?? router.back}>
      <ChevronLeft className="h-6 w-6" />
    </IconButton>
  );
};

type AppBarTitleProps = PropsWithChildren & PropsWithClassName;

const AppBarTitle = ({ children, className }: AppBarTitleProps) => {
  return (
    <div
      className={cn(
        'font-bold',
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { AppBar, AppBarBack, AppBarTitle };
