import type { ComponentPropsWithoutRef } from 'react';

import type { Schema } from 'zod';

import type { Checkbox, Selector, TextInput } from '@/components/ui';

type DefaultAnswer = {
  restrictions: Schema;
};

type TextInputAnswer = DefaultAnswer & {
  type: 'text' | 'url' | 'email' | 'number' | 'datetime';
  isArray?: boolean;
} & Pick<
    ComponentPropsWithoutRef<typeof TextInput>,
    'title' | 'placeholder' | 'prefix' | 'suffix'
  >;

type SelectAnswer = DefaultAnswer & {
  type: 'select';
} & Pick<ComponentPropsWithoutRef<typeof Selector>, 'items' | 'title'>;

type MultiSelectAnswer = {
  type: 'multiselect';
  options: (Pick<
    ComponentPropsWithoutRef<typeof Checkbox>,
    'title' | 'description'
  > & { required?: boolean })[];
};

type Answer = TextInputAnswer | SelectAnswer | MultiSelectAnswer;

interface Item {
  question: string;
  description: string;
  answer: Answer;
}

export interface Metadata {
  title: string;
  description: string;
  items: Item[];
}
