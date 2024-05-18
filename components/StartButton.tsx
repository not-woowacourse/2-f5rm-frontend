'use client';

import { ArrowRight } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';
import { PATHNAME } from '@/constants/constants';

export function StartButton() {
  return (
    <Button
      primary
      text="시작"
      icon={ArrowRight}
      href={withQuery(PATHNAME, { step: 0 })}
    />
  );
}
