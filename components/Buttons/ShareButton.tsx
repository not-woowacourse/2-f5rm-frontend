'use client';

import { Share } from 'lucide-react';
import { withQuery } from 'ufo';

import { Button } from '@/components/ui';
import { metadata } from '@/constants/metadata';

export function ShareButton() {
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.share === 'undefined'
  )
    return null;

  const onClick = () => {
    navigator.share({
      text: `설문을 공유합니다: ${metadata.title}`,
      url: withQuery(window.location.href, { step: undefined }),
    });
  };

  return <Button primary text="설문 공유" icon={Share} onClick={onClick} />;
}
