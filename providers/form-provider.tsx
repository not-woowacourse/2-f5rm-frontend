'use client';

import type { PropsWithChildren } from 'react';
import { FormProvider as RHFProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { metadata } from '@/constants/metadata';
import type { Metadata } from '@/constants/types';

export type MultiSelectValues = Metadata['items'][number]['answer']['type'];

export type FormValues = Record<
  Metadata['items'][number]['id'],
  string | number | string[] | number[] | MultiSelectValues | null
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

  const methods = useForm<FormValues>({
    resolver: zodResolver(restrictions),
    mode: 'all',
  });

  return <RHFProvider {...methods}>{children}</RHFProvider>;
}
