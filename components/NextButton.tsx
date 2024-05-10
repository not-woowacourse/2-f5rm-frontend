'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui';

type NextButtonProps = Pick<
  ComponentPropsWithoutRef<typeof Button>,
  'disabled'
>;

export function NextButton({ disabled }: NextButtonProps) {
  return (
    <Button
      primary
      type="submit"
      text="다음"
      icon={ArrowRight}
      disabled={disabled}
    />
  );
}
