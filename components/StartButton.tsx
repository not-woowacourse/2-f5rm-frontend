'use client';

import { ArrowRight } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';

export function StartButton() {
  return (
    <Button
      primary
      text="시작"
      icon={ArrowRight}
      href={withQuery(DEFAULT_PATHNAME, { step: 0 })}
    />
  );
}
