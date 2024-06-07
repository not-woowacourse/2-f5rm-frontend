'use client';

import { useRouter } from 'next/navigation';

import type { ComponentPropsWithoutRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { ArrowLeft, ArrowLeftToLine } from 'lucide-react';
import { withoutLeadingSlash } from 'ufo';

import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';
import { type FormValues } from '@/providers/form-provider';

type BackButtonProps = (
  | (Pick<ComponentPropsWithoutRef<typeof Button>, 'primary'> & {
      large: true;
    })
  | {
      primary?: never;
      large?: false;
    }
) & {
  toStart?: boolean;
  reset?: boolean;
};

export function BackButton({
  primary,
  large = false,
  toStart = false,
  reset = false,
}: BackButtonProps) {
  const router = useRouter();
  const { reset: resetForm } = useFormContext<FormValues>();

  // anchor href로 구현 가능하나 form 정보를 잃기 때문에 router로 구현
  const onClick = () => {
    reset && resetForm();

    toStart
      ? router.push(withoutLeadingSlash(DEFAULT_PATHNAME))
      : router.back();
  };

  if (large)
    return (
      <Button
        primary={primary}
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
