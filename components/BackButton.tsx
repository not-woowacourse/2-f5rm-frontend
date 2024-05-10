'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';
import { withQuery } from 'ufo';

interface BackButtonProps {
  step: number;
}

export function BackButton({ step }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      aria-label="이전 화면으로 이동"
      className="m-2 flex aspect-square items-center justify-center rounded-lg outline-none ring-accent-500 ring-offset-2 ring-offset-body transition-all hover:bg-base-300 focus-visible:ring-2 active:scale-95 dark:ring-offset-body-dark dark:hover:bg-base-dark-700"
      onClick={() =>
        router.replace(
          withQuery(pathname, { step: step === 0 ? undefined : step - 1 }),
        )
      }
    >
      <ArrowLeft />
    </button>
  );
}
