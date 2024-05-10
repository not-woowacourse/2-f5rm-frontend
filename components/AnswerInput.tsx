'use client';

import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { TextInput } from '@/components/ui';
import type { metadata } from '@/constants/metadata';

interface AnswerInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  error: FieldError | undefined;
  answer: (typeof metadata)['items'][number]['answer'];
}

export function AnswerInput<T extends FieldValues>({
  register,
  name,
  error,
  answer,
}: AnswerInputProps<T>) {
  return (
    <div>
      {(answer.type === 'text' ||
        answer.type === 'email' ||
        answer.type === 'number' ||
        answer.type === 'url') && (
        <TextInput
          name={name}
          register={register}
          options={{ valueAsNumber: answer.type === 'number' }}
          type={answer.type}
          title={answer.label}
          placeholder={answer.placeholder}
          prefix={answer.prefix}
          suffix={answer.suffix}
          error={error?.message}
        />
      )}
    </div>
  );
}
