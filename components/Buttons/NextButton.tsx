'use client';

import { useRouter } from 'next/navigation';

import type { ComponentPropsWithoutRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { ArrowRight } from 'lucide-react';
import { withQuery, withoutLeadingSlash } from 'ufo';

import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';
import type { Metadata } from '@/constants/types';
import type { FormValues } from '@/providers/form-provider';

type NextButtonProps = Required<
  Pick<ComponentPropsWithoutRef<typeof Button>, 'disabled'>
> & {
  step: number;
  itemId: Metadata['items'][number]['id'];
};

export function NextButton({ disabled, step, itemId }: NextButtonProps) {
  const router = useRouter();

  const { trigger, getFieldState } = useFormContext<FormValues>();

  const onClick = async () => {
    await trigger();

    const { invalid } = getFieldState(itemId);

    if (invalid) return;

    // anchor 태그로 구현해도 되지만,
    // invalid한 옵션을 선택해도 다음 버튼을 누를 수는 있게 하고 싶었음
    // 또, 폼 정보 잃는 문제
    router.push(
      withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: step + 1 })),
    );
  };

  return (
    <Button
      primary
      onClick={onClick}
      text="다음"
      icon={ArrowRight}
      disabled={disabled}
    />
  );
}
