'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { withQuery } from 'ufo';
import * as z from 'zod';

import { AnswerInput } from '@/components/AnswerInput';
import { Header } from '@/components/Header';
import { NextButton } from '@/components/NextButton';
import { Paragraphs } from '@/components/Paragraphs';
import { SkipButton } from '@/components/SkipButton';
import { LOCALSTORAGE_KEY } from '@/constants/constants';
import { metadata } from '@/constants/metadata';
import { currentStorage } from '@/lib/storage';
import { getOptionId, getQuestionId } from '@/lib/utils';

interface FormLayoutProps {
  step: number;
}

export type FormValues = Record<
  `question-${number}`,
  string | number | Record<`option-${number}`, boolean>
>;

export function FormLayout({ step }: FormLayoutProps) {
  const item = metadata.items[step];

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    ...(item.answer.type !== 'multiselect' && {
      resolver: zodResolver(
        z.object({
          [getQuestionId(step)]: item.answer.restrictions,
        }),
      ),
    }),
  });

  console.log(dirtyFields);

  const answer = useWatch({ control, name: getQuestionId(step) });

  const router = useRouter();
  const pathname = usePathname();

  const onValid = (data: FormValues) => {
    const newData = { ...currentStorage(), ...data };
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newData));

    router.push(withQuery(pathname, { step: step + 1 }));
  };

  const onInvalid = (something: any) => {
    console.log(something);
  };

  const canSkip =
    item.answer.type === 'multiselect'
      ? false
      : item.answer.restrictions.isOptional();

  const canConfirm =
    // if multiselect, make sure every required box is ticked
    (item.answer.type === 'multiselect' &&
      item.answer.options.every((option, index) =>
        // control not mounted yet
        answer === undefined
          ? false
          : option.required
            ? (answer as { [key: string]: boolean })[getOptionId(index)]
            : true,
      )) ||
    // if not, make sure some input has been provided
    (item.answer.type !== 'multiselect' && watch()[getQuestionId(step)]);

  return (
    <form
      className="flex h-screen max-w-lg flex-grow flex-col"
      onSubmit={handleSubmit(onValid, onInvalid)}
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
          name={getQuestionId(step)}
          answer={item.answer}
          register={register}
          required={!canSkip}
          error={errors[getQuestionId(step)]}
        />
        <div className="flex gap-2.5">
          {canSkip && <SkipButton step={step} />}
          <NextButton disabled={!canConfirm} />
        </div>
      </section>
    </form>
  );
}
