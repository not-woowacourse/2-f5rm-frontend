'use client';

import { useRouter } from 'next/navigation';

import { useFormContext } from 'react-hook-form';

import { ArrowLeft, Check } from 'lucide-react';

import { Header } from '@/components/Header';
import { Paragraphs } from '@/components/Paragraphs';
import { Title } from '@/components/Title';
import { Button } from '@/components/ui';
import { metadata } from '@/constants/metadata';
import type { FormValues } from '@/providers/form-provider';

export function Confirm() {
  const router = useRouter();

  const { handleSubmit, watch } = useFormContext<FormValues>();

  const onValid = (data: FormValues) => {
    console.log(data);
  };

  const onInvalid = (something: any) => {
    console.log(something);
  };

  return (
    <div className="flex h-screen max-w-lg flex-grow flex-col">
      <Header
        text={metadata.title}
        showBackButton
        step={metadata.items.length}
      />
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 pt-16 text-base-600 dark:text-base-dark-400">
        <Title text="수고하셨습니다." />
        <Paragraphs text={JSON.stringify(watch())} />
      </section>
      <section className="flex flex-col gap-3 p-3.5">
        <div className="flex gap-2.5">
          <Button text="뒤로" icon={ArrowLeft} onClick={router.back} />
          <Button
            text="제출"
            icon={Check}
            primary
            onClick={handleSubmit(onValid, onInvalid)}
          />
        </div>
      </section>
    </div>
  );
}
