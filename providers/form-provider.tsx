'use client';

import type { PropsWithChildren } from 'react';
import { FormProvider as RHFProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { metadata } from '@/constants/metadata';
import { getQuestionId } from '@/lib/utils';

export type MultiSelectValues = Record<`option-${number}`, boolean>;

export type FormValues = Record<
  `question-${number}`,
  string | number | string[] | number[] | MultiSelectValues
>;

export function FormProvider({ children }: PropsWithChildren) {
  const restrictions = z.object(
    Object.fromEntries(
      metadata.items.map((item, index) => [
        getQuestionId(index),
        item.answer.type === 'multiselect'
          ? // TODO: validate this better (maybe use getOptionId() and use required field)
            z.record(z.string().startsWith('option-'), z.boolean())
          : item.answer.restrictions,
      ]),
    ),
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(restrictions),
    mode: 'onBlur',
  });

  return <RHFProvider {...methods}>{children}</RHFProvider>;
}
