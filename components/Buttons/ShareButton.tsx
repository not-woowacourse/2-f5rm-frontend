'use client';

import { Share } from 'lucide-react';

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
      url: window.location.origin,
    });
  };

  return <Button primary text="설문 공유" icon={Share} onClick={onClick} />;
}
