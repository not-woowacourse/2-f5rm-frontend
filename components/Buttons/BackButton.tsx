'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft, ArrowLeftToLine } from 'lucide-react';

import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';

interface BackButtonProps {
  large?: boolean;
  toStart?: boolean;
}

export function BackButton({
  large = false,
  toStart = false,
}: BackButtonProps) {
  const router = useRouter();

  // anchor href로 구현 가능하나 form 정보를 잃기 때문에 router로 구현
  const onClick = toStart ? () => router.push(DEFAULT_PATHNAME) : router.back;

  if (large)
    return (
      <Button
        text={toStart ? '처음으로' : '뒤로'}
        icon={toStart ? ArrowLeftToLine : ArrowLeft}
        onClick={onClick}
      />
    );

  return (
    <button
      type="button"
      aria-label={toStart ? '첫 화면으로 이동' : '이전 화면으로 이동'}
      className="m-2 flex aspect-square items-center justify-center rounded-lg outline-none ring-accent-500 ring-offset-2 ring-offset-body transition-all hover:bg-base-300 focus-visible:ring-2 active:scale-95 dark:ring-offset-body-dark dark:hover:bg-base-dark-700"
      onClick={onClick}
    >
      <ArrowLeft />
    </button>
  );
}
