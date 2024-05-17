'use client';

import { useFormContext } from 'react-hook-form';

import { AnswerInput } from '@/components/AnswerInput';
import { Header } from '@/components/Header';
import { NextButton } from '@/components/NextButton';
import { Paragraphs } from '@/components/Paragraphs';
import { SkipButton } from '@/components/SkipButton';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';
import type { FormValues } from '@/providers/form-provider';

interface FormLayoutProps {
  step: number;
}

export function FormLayout({ step }: FormLayoutProps) {
  const item = metadata.items[step];

  const {
    watch,
    formState: { errors },
    getFieldState,
  } = useFormContext<FormValues>();

  const answer = watch(item.id);

  const canSkip =
    item.answer.type === 'multiselect'
      ? // TODO: if all multiselect items are optional, make the question skippable
        false
      : item.answer.restrictions.isOptional();

  const canConfirm =
    answer === undefined
      ? false
      : item.answer.type === 'multiselect'
        ? // if multiselect, make sure every required box is ticked
          getFieldState(item.id).invalid === false
        : // if not, make sure some input has been provided
          // @ts-expect-error
          answer !== null && answer !== NaN && answer !== '';

  return (
    <div className="flex h-screen max-w-lg flex-grow flex-col">
      <Header text={metadata.title} showBackButton step={step} />
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 pt-16 text-base-600 dark:text-base-dark-400">
        <Title text={item.question} />
        <Paragraphs text={item.description} />
      </section>
      <section className="flex flex-col gap-3 p-3.5">
        <AnswerInput
          name={item.id}
          answer={item.answer}
          required={!canSkip}
          error={errors[item.id]}
        />
        <div className="flex gap-2.5">
          {canSkip && <SkipButton step={step} itemId={item.id} />}
          <NextButton step={step} itemId={item.id} disabled={!canConfirm} />
        </div>
      </section>
    </div>
  );
}
