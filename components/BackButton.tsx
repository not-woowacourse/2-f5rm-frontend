'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui';

interface BackButtonProps {
  large?: boolean;
}

export function BackButton({ large = false }: BackButtonProps) {
  const router = useRouter();

  // anchor href로 구현 가능하나 form 정보를 잃기 때문에 router로 구현
  const onClick = router.back;

  if (large) return <Button text="뒤로" icon={ArrowLeft} onClick={onClick} />;

  return (
    <button
      type="button"
      aria-label="이전 화면으로 이동"
      className="m-2 flex aspect-square items-center justify-center rounded-lg outline-none ring-accent-500 ring-offset-2 ring-offset-body transition-all hover:bg-base-300 focus-visible:ring-2 active:scale-95 dark:ring-offset-body-dark dark:hover:bg-base-dark-700"
      onClick={onClick}
    >
      <ArrowLeft />
    </button>
  );
}
