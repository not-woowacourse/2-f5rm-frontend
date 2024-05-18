'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { FullScreenOverlay } from '@te6/ui';
import { Check, CircleAlert, RotateCcw } from 'lucide-react';
import { withQuery } from 'ufo';

import { Paragraphs } from '@/components/Paragraphs';
import { Button } from '@/components/ui';
import {
  API_URL,
  CLIENT_NAME,
  DEFAULT_PATHNAME,
  FORM_ID,
} from '@/constants/constants';
import type { FormValues } from '@/providers/form-provider';

export function SubmitButton() {
  const { handleSubmit } = useFormContext<FormValues>();
  const router = useRouter();

  const [showingError, setShowingError] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: FormValues) => {
      const { status, json } = await fetch(`${API_URL}/forms/${FORM_ID}`, {
        method: 'POST',
        headers: { 'client-name': CLIENT_NAME },
        body: JSON.stringify(formData),
      });

      switch (status) {
        case 201:
          // not used
          return await json();
        case 400:
          throw new Error(`제출된 값이 ${FORM_ID} 스키마와 맞지 않습니다.`);
        case 401:
          throw new Error(`${CLIENT_NAME} 클라이언트를 찾을 수 없습니다.`);
        case 404:
          throw new Error(`${FORM_ID} 이름으로 등록된 스키마가 없습니다.`);
      }
    },
    onMutate: () => setShowingError(false),
    onError: () => setShowingError(true),
    onSuccess: () =>
      router.push(withQuery(DEFAULT_PATHNAME, { step: 'success' })),
  });

  const onValid = (formData: FormValues) => {
    mutate(formData);
  };

  const onInvalid = (something: any) => {
    console.log(something);
  };

  const onSubmitClick = handleSubmit(onValid, onInvalid);

  return (
    <>
      {error && (
        <FullScreenOverlay
          type="close"
          show={showingError}
          setShow={setShowingError}
        >
          <div className="flex flex-col items-center text-base-800 dark:text-base-200">
            <div className="mb-2.5 flex flex-col items-center gap-1 text-lg font-bold">
              <CircleAlert size={36} />
              <div>오류</div>
            </div>
            <Paragraphs
              text={error.message}
              className="mb-4 text-sm text-base-600 dark:text-base-400"
            />
            <Button
              text="다시 시도"
              icon={RotateCcw}
              isLoading={isPending}
              primary
              onClick={onSubmitClick}
            />
          </div>
        </FullScreenOverlay>
      )}
      <Button
        text="제출"
        icon={Check}
        isLoading={isPending}
        primary
        onClick={onSubmitClick}
      />
    </>
  );
}
