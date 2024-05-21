'use client';

import { useRouter } from 'next/navigation';

import { useFormContext } from 'react-hook-form';

import { SkipForward } from 'lucide-react';
import { withQuery, withoutLeadingSlash } from 'ufo';

import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';
import type { Metadata } from '@/constants/types';
import type { FormValues } from '@/providers/form-provider';

interface SkipButtonProps {
  step: number;
  item: Metadata['items'][number];
}

export function SkipButton({ step, item }: SkipButtonProps) {
  const router = useRouter();

  const { setValue } = useFormContext<FormValues>();

  const onClick = () => {
    if (item.answer.type === 'multiselect') {
      item.answer.options.forEach((option) =>
        setValue(`${item.id}.${option.id}`, false),
      );
    } else {
      setValue(item.id, undefined);
    }

    router.push(
      withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: step + 1 })),
    );
  };

  return <Button text="건너뛰기" icon={SkipForward} onClick={onClick} />;
}
