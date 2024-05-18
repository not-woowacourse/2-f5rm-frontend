'use client';

import { type FieldError, type Path, useFormContext } from 'react-hook-form';

import { Checkbox, Selector, TextInput } from '@/components/ui';
import type { metadata } from '@/constants/metadata';
import { type FormValues } from '@/providers/form-provider';

interface AnswerInputProps<T extends FormValues> {
  name: Path<T>;
  answer: (typeof metadata)['items'][number]['answer'];
  required: boolean;
  error: FieldError | undefined;
}

export function AnswerInput<T extends FormValues>({
  name,
  answer,
  required,
  error,
}: AnswerInputProps<T>) {
  const { register } = useFormContext<FormValues>();

  return (
    <div>
      {(answer.type === 'text' ||
        answer.type === 'email' ||
        answer.type === 'number' ||
        answer.type === 'url') && (
        <TextInput
          key={name}
          name={name}
          register={register}
          options={{
            valueAsNumber: answer.type === 'number',
            // this is only to show the red asterisk
            required,
          }}
          type={answer.type}
          title={answer.title}
          placeholder={answer.placeholder}
          prefix={answer.prefix}
          suffix={answer.suffix}
          error={error?.message}
        />
      )}
      {answer.type === 'select' && (
        <Selector
          key={name}
          name={name}
          register={register}
          options={{ required }}
          title={answer.title}
          items={answer.items}
          error={error?.message}
          // TODO: handle this better
          gridCols="grid-cols-3"
        />
      )}
      {answer.type === 'multiselect' && (
        <fieldset className="flex flex-col gap-2.5">
          {answer.options.map((option) => (
            <Checkbox
              key={`${name}.${option.id}`}
              name={`${name}.${option.id}`}
              register={register}
              title={option.title}
              description={option.description}
              options={{ required: option.required }}
            />
          ))}
        </fieldset>
      )}
    </div>
  );
}
