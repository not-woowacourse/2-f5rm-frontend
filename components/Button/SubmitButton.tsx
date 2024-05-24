'use client';

import { useRouter } from 'next/navigation';

import { useFormContext } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { CheckIcon, RotateCcw } from 'lucide-react';
import { withQuery, withoutLeadingSlash } from 'ufo';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  API_URL,
  CLIENT_NAME,
  DEFAULT_PATHNAME,
  FORM_ID,
} from '@/constants/constants';
import type { FormValues } from '@/providers/form-provider';

export function SubmitButton() {
  const { handleSubmit, reset } = useFormContext<FormValues>();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: unknown) => {
      const { status } = await fetch(`${API_URL}/forms/${FORM_ID}`, {
        method: 'POST',
        headers: {
          'client-name': CLIENT_NAME,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      switch (status) {
        case 201:
          return;
        case 400:
          throw new Error(`제출된 값이 ${FORM_ID} 스키마와 맞지 않습니다.`);
        case 401:
          throw new Error(`${CLIENT_NAME} 클라이언트를 찾을 수 없습니다.`);
        case 404:
          throw new Error(`${FORM_ID} 이름으로 등록된 스키마가 없습니다.`);
        default:
          throw new Error(error?.message ?? '오류가 발생했습니다.');
      }
    },
    onError: (error) => {
      toast({
        title: '제출 실패',
        description: error.message,
        style: {
          borderRadius: '8px',
          background: '#ffcccc',
          color: '#ff0000',
        },
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '응답이 성공적으로 제출되었습니다',
        style: {
          borderRadius: '8px',
        },
      });
      reset();
      router.push(
        withoutLeadingSlash(withQuery(DEFAULT_PATHNAME, { step: 'success' })),
      );
    },
  });

  const onValid = (formData: FormValues) => {
    const mapped = Object.fromEntries(
      Object.entries(formData).map((entry) => {
        return entry;
      }),
    );

    mutate(mapped);
  };
  const onIncomplete = () => {
    toast({
      title: '제출 실패',
      description: '모든 필수 항목에 답변하지 않으셨습니다.',
      style: {
        borderRadius: '8px',
        background: '#ffcccc',
        color: '#ff0000',
      },
    });
  };

  const onSubmitClick = handleSubmit(onValid, onIncomplete);

  return (
    <Button className="mx-3 w-full" onClick={onSubmitClick}>
      {isPending ? <RotateCcw /> : <CheckIcon />}
      <p className="mx-1">제출</p>
    </Button>
  );
}
