'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FullScreenOverlay } from '@te6/ui';
import { CircleAlert, SkipForward } from 'lucide-react';
import { withQuery, withoutLeadingSlash } from 'ufo';

import { Paragraphs } from '@/components/Paragraphs';
import { Button } from '@/components/ui';
import { DEFAULT_PATHNAME } from '@/constants/constants';
import type { Metadata } from '@/constants/types';
import type { FormValues } from '@/providers/form-provider';

interface SkipButtonProps {
  step: number;
  item: Metadata['items'][number];
}

export function SkipButton({ step, item }: SkipButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const { resetField } = useFormContext<FormValues>();

  const onClick = () => {
    resetField(item.id);

    router.push(
      withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: step + 1 })),
    );
  };

  return (
    <>
      <FullScreenOverlay
        type="close"
        show={showConfirm}
        setShow={setShowConfirm}
        buttonLabel="잘못 눌렀어요"
      >
        <div className="flex flex-col items-center text-base-800 dark:text-base-200">
          <div className="mb-2.5 flex flex-col items-center gap-1 text-lg font-bold">
            <CircleAlert size={36} />
            <div>건너뛸까요?</div>
          </div>
          <Paragraphs
            className="mb-4 text-center text-sm text-base-600 dark:text-base-400"
            text="응답한 내용이 삭제됩니다. 이 문항을 건너뛸까요?"
          />
          <Button
            primary
            text="건너뛰기"
            icon={SkipForward}
            onClick={onClick}
          />
        </div>
      </FullScreenOverlay>
      <Button
        text="건너뛰기"
        icon={SkipForward}
        onClick={() => setShowConfirm(true)}
      />
    </>
  );
}
