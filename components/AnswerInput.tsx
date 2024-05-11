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
  name: Path<T>;
  answer: (typeof metadata)['items'][number]['answer'];
  register: UseFormRegister<T>;
  required: boolean;
  error: FieldError | undefined;
}

export function AnswerInput<T extends FieldValues>({
  name,
  answer,
  register,
  required,
  error,
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
          options={{
            valueAsNumber: answer.type === 'number',
            // this is only to show the red asterisk
            required,
          }}
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
