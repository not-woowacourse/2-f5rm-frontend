'use client';

import { usePathname, useRouter } from 'next/navigation';

import type { ComponentPropsWithoutRef } from 'react';

import { ArrowRight } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';

type NextButtonProps = Pick<
  ComponentPropsWithoutRef<typeof Button>,
  'isLoading'
> & {
  step: number;
};

export function NextButton({ isLoading, step }: NextButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      primary
      text="다음"
      isLoading={isLoading}
      onClick={() => router.replace(withQuery(pathname, { step: step + 1 }))}
      icon={ArrowRight}
    />
  );
}
