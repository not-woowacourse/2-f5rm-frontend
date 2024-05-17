'use client';

import { usePathname, useRouter } from 'next/navigation';

import type { ComponentPropsWithoutRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { ArrowRight } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';
import { getQuestionId } from '@/lib/utils';
import type { FormValues } from '@/providers/form-provider';

type NextButtonProps = Required<
  Pick<ComponentPropsWithoutRef<typeof Button>, 'disabled'>
> & {
  step: number;
};

export function NextButton({ disabled, step }: NextButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { getFieldState } = useFormContext<FormValues>();

  const onClick = () => {
    const { invalid } = getFieldState(getQuestionId(step));

    if (invalid) return;

    // 다음 버튼을 anchor 태그로 구현해도 되지만,
    // invalid한 옵션을 선택해도 다음 버튼을 누를 수는 있게 하고 싶었음
    router.push(withQuery(pathname, { step: step + 1 }));
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
