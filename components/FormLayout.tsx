'use client';

import { useEffect } from 'react';
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

  const { watch, trigger, formState, getFieldState } =
    useFormContext<FormValues>();
  const userInput = watch(item.id);

  const { isDirty, error, invalid } = getFieldState(item.id, formState);

  // multiselect의 모든 option이 optional임
  const multiselectCanSkip =
    item.answer.type === 'multiselect' &&
    item.answer.options.every((option) => option.required !== true);

  // multiselect에서 tick한 옵션이 없음
  const multiselectNoneTicked =
    item.answer.type === 'multiselect' &&
    Object.values(userInput ?? {}).every((value) => value === false);

  const canSkip =
    item.answer.type === 'multiselect'
      ? multiselectCanSkip
      : item.answer.restrictions.isOptional();

  const canConfirm =
    // register 아직 안 된 경우 다음 버튼 비활성화
    userInput === undefined
      ? false
      : item.answer.type === 'multiselect'
        ? // multiselect의 모든 option이 optional이면서 아무 옵션도 선택되지 않은 경우
          // 다음 버튼 비활성화
          multiselectCanSkip && multiselectNoneTicked
          ? false
          : // multiselect에 required option이 있는 경우,
            // 모든 required option을 tick해야 다음 버튼 활성화
            invalid === false
        : // multiselect 아닌 경우, input 건드려야 다음 버튼 활성화
          isDirty === true;

  console.log({ multiselectCanSkip, multiselectNoneTicked, invalid });

  useEffect(() => {
    // 첫 렌더에서는 invalid가 항상 false이므로 다음 버튼 비활성화를 위해 trigger()
    if (item.answer.type === 'multiselect') {
      trigger();
    }
  }, [trigger, item]);

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
          error={error}
        />
        <div className="flex gap-2.5">
          {canSkip && <SkipButton step={step} itemId={item.id} />}
          <NextButton step={step} itemId={item.id} disabled={!canConfirm} />
        </div>
      </section>
    </div>
  );
}
