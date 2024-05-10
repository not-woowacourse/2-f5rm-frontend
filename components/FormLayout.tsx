'use client';

import { usePathname, useRouter } from 'next/navigation';

import { type FieldError, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { withQuery } from 'ufo';
import * as z from 'zod';

import { AnswerInput } from '@/components/AnswerInput';
import { Header } from '@/components/Header';
import { NextButton } from '@/components/NextButton';
import { Paragraphs } from '@/components/Paragraphs';
import { metadata } from '@/constants/metadata';

interface FormLayoutProps {
  step: number;
}

interface FormLayoutValues {
  [key: string]: string;
}

export function FormLayout({ step }: FormLayoutProps) {
  const item = metadata.items[step];

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    [key in (typeof metadata)['items'][number]['id']]: string;
  }>({
    ...(item.answer.restrictions && {
      resolver: zodResolver(
        z.object({
          [item.id]: item.answer.restrictions,
        }),
      ),
    }),
  });

  const router = useRouter();
  const pathname = usePathname();

  const onValid = (data: FormLayoutValues) => {
    console.log(data);

    router.push(withQuery(pathname, { step: step + 1 }));
  };

  return (
    <form
      className="flex h-screen max-w-lg flex-grow flex-col"
      onSubmit={handleSubmit(onValid)}
    >
      <Header text={metadata.title} showBackButton step={step} />
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 pt-14 text-base-600 dark:text-base-dark-400">
        <h1 className="text-balance text-2xl font-bold text-base-700 dark:text-base-dark-300">
          {item.question}
        </h1>
        <Paragraphs text={item.description} />
      </section>
      <section className="flex flex-col gap-3 p-3.5">
        <AnswerInput
          name={item.id}
          answer={item.answer}
          register={register}
          error={errors[item.id] as FieldError}
        />
        <NextButton disabled={!watch(item.id)} />
      </section>
    </form>
  );
}
