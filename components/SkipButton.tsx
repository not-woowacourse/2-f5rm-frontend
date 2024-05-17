'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useFormContext } from 'react-hook-form';

import { SkipForward } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';
import type { Metadata } from '@/constants/types';
import type { FormValues } from '@/providers/form-provider';

interface SkipButtonProps {
  step: number;
  itemId: Metadata['items'][number]['id'];
}

export function SkipButton({ step, itemId }: SkipButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { setValue } = useFormContext<FormValues>();

  const onClick = () => {
    setValue(itemId, null);

    router.push(withQuery(pathname, { step: step + 1 }));
  };

  return <Button text="건너뛰기" icon={SkipForward} onClick={onClick} />;
}
