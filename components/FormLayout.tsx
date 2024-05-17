'use client';

import { type FieldError, useFormContext } from 'react-hook-form';

import { AnswerInput } from '@/components/AnswerInput';
import { Header } from '@/components/Header';
import { NextButton } from '@/components/NextButton';
import { Paragraphs } from '@/components/Paragraphs';
import { SkipButton } from '@/components/SkipButton';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';
import { getOptionId, getQuestionId } from '@/lib/utils';
import type { FormValues, MultiSelectValues } from '@/providers/form-provider';

interface FormLayoutProps {
  step: number;
}

export function FormLayout({ step }: FormLayoutProps) {
  const item = metadata.items[step];
  const questionId = getQuestionId(step);

  const {
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const answer = watch(questionId);

  const canSkip =
    item.answer.type === 'multiselect'
      ? false
      : item.answer.restrictions.isOptional();

  const canConfirm =
    item.answer.type === 'multiselect'
      ? // if multiselect, make sure every required box is ticked
        item.answer.options.every((option, index) =>
          // control not mounted yet
          answer === undefined
            ? false
            : option.required
              ? (answer as MultiSelectValues)[getOptionId(index)]
              : true,
        )
      : // if not, make sure some input has been provided
        // FIXME
        answer !== undefined &&
        // @ts-expect-error
        answer !== NaN &&
        answer !== '';

  return (
    <div className="flex h-screen max-w-lg flex-grow flex-col">
      <Header text={metadata.title} showBackButton step={step} />
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 pt-16 text-base-600 dark:text-base-dark-400">
        <Title text={item.question} />
        <Paragraphs text={item.description} />
      </section>
      <section className="flex flex-col gap-3 p-3.5">
        <AnswerInput
          name={questionId}
          answer={item.answer}
          required={!canSkip}
          error={errors[questionId] as FieldError | undefined}
        />
        <div className="flex gap-2.5">
          {/* TODO: make skip button work */}
          {canSkip && <SkipButton step={step} />}
          <NextButton step={step} disabled={!canConfirm} />
        </div>
      </section>
    </div>
  );
}
