import type { ComponentPropsWithoutRef } from 'react';

import type { Schema } from 'zod';

import type { Checkbox, Selector, TextInput } from '@/components/ui';

type DefaultRestriction = {
  restrictions: Schema;
};

type TextInputAnswer = DefaultRestriction & {
  type: 'text' | 'url' | 'email' | 'number' | 'tel';
} & Pick<
    ComponentPropsWithoutRef<typeof TextInput>,
    'title' | 'placeholder' | 'prefix' | 'suffix'
  >;

type SelectAnswer = DefaultRestriction & {
  type: 'select';
} & Pick<ComponentPropsWithoutRef<typeof Selector>, 'items' | 'title'>;

export type MultiSelectOption = Pick<
  ComponentPropsWithoutRef<typeof Checkbox>,
  'title' | 'description'
> & {
  id: string; // should be unique
  required?: boolean;
};

type MultiSelectAnswer = {
  type: 'multiselect';
  options: MultiSelectOption[];
};

type Answer = TextInputAnswer | SelectAnswer | MultiSelectAnswer;

interface Item {
  id: string; // should be unique
  question: string;
  description: string;
  answer: Answer;
}

export interface Metadata {
  title: string;
  description: string;
  items: Item[];
}
