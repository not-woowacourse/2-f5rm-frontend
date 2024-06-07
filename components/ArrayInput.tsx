'use client';

import { type ComponentPropsWithoutRef } from 'react';
import {
  type Path,
  type UseFormRegister,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import { PlusCircle, Trash2 } from 'lucide-react';

import type { AnswerInput } from '@/components/AnswerInput';
import { Button, TextInput } from '@/components/ui';
import type { FormValues } from '@/providers/form-provider';

type FieldInputProps<T extends FormValues> = Pick<
  ComponentPropsWithoutRef<typeof AnswerInput>,
  'name' | 'answer'
> & {
  register: UseFormRegister<T>;
};

export function FieldInput<T extends FormValues>({
  name,
  answer,
  register,
}: FieldInputProps<T>) {
  const {
    formState: { errors },
    trigger,
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({ name });

  if (answer.type === 'multiselect' || answer.type === 'select') return null;

  return (
    <div className="flex flex-col gap-3">
      {/* FIXME: 메타 validation(min/max/중복)이 한 박자씩 느림 */}
      {(errors[name]?.root ?? errors[name]) && (
        <div className="animate-shake pl-1 text-sm font-medium text-red-500 dark:text-red-500">
          {errors[name]?.root?.message ?? errors[name]?.message}
        </div>
      )}
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-2">
          <TextInput
            key={`${name}.${index}.${name}`}
            register={register}
            name={`${name}.${index}.${name}` as Path<T>}
            options={{
              valueAsNumber: answer.type === 'number',
              // do not show the red asterisk here
            }}
            type={answer.type}
            title={answer.title}
            placeholder={answer.placeholder}
            prefix={answer.prefix}
            suffix={answer.suffix}
            error={(errors?.[name] as any)?.[index]?.[name]?.message}
          />
          <div className="flex h-[42px] flex-none">
            <Button
              icon={Trash2}
              text="제거"
              onClick={() => {
                trigger();
                remove(index);
              }}
            />
          </div>
        </div>
      ))}
      <Button
        text="추가"
        icon={PlusCircle}
        onClick={() => {
          trigger();
          append({ [name]: '' });
        }}
      />
    </div>
  );
}
