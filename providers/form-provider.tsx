'use client';

import type { PropsWithChildren } from 'react';
import { FormProvider as RHFProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { metadata } from '@/constants/metadata';
import type { Metadata, MultiSelectOption } from '@/constants/types';

type MultiSelectValues = Array<MultiSelectOption['id']>;

export type FormValues = Record<
  Metadata['items'][number]['id'],
  string | number | MultiSelectValues | undefined
>;

export function FormProvider({ children }: PropsWithChildren) {
  const restrictions = z.object(
    Object.fromEntries(
      metadata.items.map((item) => [item.id, item.answer.restrictions]),
    ),
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(restrictions),
    mode: 'all',
  });

  return <RHFProvider {...methods}>{children}</RHFProvider>;
}
