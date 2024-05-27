'use client';

import type { PropsWithChildren } from 'react';
import { type FieldError, type Path, useFormContext } from 'react-hook-form';

import { MultiSelector } from '@/components/AnswerInput/MultiSelector';
import { Selector } from '@/components/AnswerInput/Selector';
import { TextInput } from '@/components/AnswerInput/TextInput';
import type { Answer } from '@/constants/types';
import { InputType } from '@/constants/types';
import type { Metadata } from '@/constants/types';
import { type FormValues } from '@/providers/form-provider';

interface AnswerProps<T extends FormValues> {
  name: Path<T>;
  answer: Metadata['items'][number]['answer'];
  error: FieldError | undefined;
}

export function Answer<T extends FormValues>({
  name,
  answer,
  error,
}: AnswerProps<T>) {
  const { setValue, getValues } = useFormContext<FormValues>();
  return (
    <>
      {(answer.type === InputType.Text ||
        answer.type === InputType.Email ||
        answer.type === InputType.Tel ||
        answer.type === InputType.Number ||
        answer.type === InputType.URL) && (
        <TextInput
          name={name}
          setValue={setValue}
          type={answer.type}
          placeholder={answer.placeholder}
          prefix={answer.prefix}
          suffix={answer.suffix}
          error={error?.message}
        />
      )}
      {answer.type === 'select' && (
        <Selector
          name={name}
          setValue={setValue}
          items={answer.items}
          error={error?.message}
        />
      )}
      {answer.type === 'multiselect' && (
        <MultiSelector
          name={name}
          setValue={setValue}
          getValues={getValues}
          items={answer.options}
          error={error?.message}
        />
      )}
    </>
  );
}

export function AnswerContainer({ children }: PropsWithChildren) {
  return (
    <section className="text-base-600 w-full flex-grow flex-col gap-3.5 overflow-auto">
      {children}
    </section>
  );
}
