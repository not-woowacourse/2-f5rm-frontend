'use client';

import { usePathname } from 'next/navigation';

import { SkipForward } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';

interface SkipButtonProps {
  step: number;
}

export function SkipButton({ step }: SkipButtonProps) {
  const pathname = usePathname();

  return (
    <Button
      text="건너뛰기"
      icon={SkipForward}
      href={withQuery(pathname, { step: step + 1 })}
    />
  );
}
