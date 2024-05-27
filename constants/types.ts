import type { ComponentPropsWithoutRef } from 'react';

import type { Schema } from 'zod';

import type { Input } from '@/components/ui/input';

export type ItemValue = {
  value: string;
};

type DefaultRestriction = {
  restrictions: Schema;
};

export enum InputType {
  Text = 'text',
  URL = 'url',
  Email = 'email',
  Number = 'number',
  Tel = 'tel',
}

type TextInputAnswer = DefaultRestriction & {
  type: InputType;
  description?: string;
  prefix?: string;
  suffix?: string;
} & Pick<ComponentPropsWithoutRef<typeof Input>, 'placeholder'>;

type SelectAnswer = DefaultRestriction & {
  type: 'select';
  items: ItemValue[];
};

export type MultiSelectOption = {
  id: string; // should be unique
  title: string;
  description?: string;
};

type MultiSelectAnswer = DefaultRestriction & {
  type: 'multiselect';
  options: MultiSelectOption[];
};

export type Answer = TextInputAnswer | SelectAnswer | MultiSelectAnswer;

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

export type Recommendation = {
  title: string;
  description: string;
};

export type FormAnswer = {
  id: number;
  stringValue: string | null;
  integerValue: number | null;
  doubleValue: number | null;
  booleanValue: boolean | null;
  dateValue: string | null;
  question: {
    id: number;
    key: string;
    type: string;
    isArray: boolean;
    isOptional: boolean;
  };
};
