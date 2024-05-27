'use client';

import { useRouter } from 'next/navigation';

import type { PropsWithChildren, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react';
import { withQuery, withoutLeadingSlash } from 'ufo';

import { Button } from '@/components/ui/button';
import { DEFAULT_PATHNAME } from '@/constants/constants';
import type { Metadata } from '@/constants/types';
import type { FormValues } from '@/providers/form-provider';

interface NextButtonProps {
  step: number;
  disabled: boolean;
  itemId: Metadata['items'][number]['id'];
}

export function NextButton({ step, disabled, itemId }: NextButtonProps) {
  const router = useRouter();
  const { trigger, getFieldState } = useFormContext<FormValues>();

  const onClick = async () => {
    await trigger();
    const { invalid } = getFieldState(itemId);
    if (invalid) return;

    router.push(
      withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: step + 1 })),
    );
  };

  return (
    <Button className="mx-3 w-full" onClick={onClick} disabled={disabled}>
      <ChevronRight />
      <p className="mx-1">다음</p>
    </Button>
  );
}
interface MoveButtonProps {
  toStep?: number;
  name: string;
  icon?: ReactNode;
}
export function MoveButton({ toStep, name, icon }: MoveButtonProps) {
  const router = useRouter();
  const onClick =
    typeof toStep === 'number'
      ? () =>
          router.push(
            withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: toStep })),
          )
      : () => router.push(DEFAULT_PATHNAME);
  return (
    <Button className="mx-3 w-full" onClick={onClick}>
      {icon}
      <p className="mx-1">{name}</p>
    </Button>
  );
}

interface PrevButtonProps {
  toStart?: boolean;
}

export function PrevButton({ toStart }: PrevButtonProps) {
  const router = useRouter();

  const onClick = toStart ? () => router.push(DEFAULT_PATHNAME) : router.back;

  return (
    <Button
      aria-label={toStart ? '홈으로 이동' : '이전 화면으로 이동'}
      className="ring-accent-500 ring-offset-body hover:bg-base-300 m-2 flex aspect-square items-center justify-center rounded-lg p-0 outline-none ring-offset-2 transition-all focus-visible:ring-2 active:scale-95"
      onClick={onClick}
    >
      {toStart === true ? <HomeIcon /> : <ChevronLeft />}
    </Button>
  );
}

export function ButtonContainer({ children }: PropsWithChildren) {
  return <section className={'mb-3 flex w-full'}>{children}</section>;
}
