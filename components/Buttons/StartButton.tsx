'use client';

import { ArrowRight } from 'lucide-react';
import { withQuery, withoutLeadingSlash } from 'ufo';

import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';

export function StartButton() {
  return (
    <Button
      primary
      text="시작"
      icon={ArrowRight}
      href={withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: 0 }))}
    />
  );
}
