'use client';

import type { PropsWithChildren } from 'react';
import { FormProvider as RHFProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { metadata } from '@/constants/metadata';
import type { Metadata, MultiSelectOption } from '@/constants/types';

type MultiSelectValues = Record<MultiSelectOption['id'], boolean>;

export type FormValues = Record<
  Metadata['items'][number]['id'],
  string | number | MultiSelectValues | undefined
>;

export function FormProvider({ children }: PropsWithChildren) {
  const restrictions = z.object(
    Object.fromEntries(
      metadata.items.map((item) => [
        item.id,
        item.answer.type === 'multiselect'
          ? z.object(
              Object.fromEntries(
                item.answer.options.map((option) => [
                  option.id,
                  option.required ? z.literal(true) : z.boolean(),
                ]),
              ),
            )
          : item.answer.restrictions,
      ]),
    ),
  );

  const arrayItemsDefaultValues = metadata.items
    .filter(
      (item) =>
        (item.answer.type === 'email' ||
          item.answer.type === 'number' ||
          item.answer.type === 'tel' ||
          item.answer.type === 'text' ||
          item.answer.type === 'url') &&
        item.answer.isArray,
    )
    .reduce((acc, item) => ({ ...acc, [item.id]: [{ [item.id]: '' }] }), {});

  const methods = useForm<FormValues>({
    resolver: zodResolver(restrictions),
    mode: 'all',
    defaultValues: arrayItemsDefaultValues,
  });

  return <RHFProvider {...methods}>{children}</RHFProvider>;
}
