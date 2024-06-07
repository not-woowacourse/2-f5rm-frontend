'use client';

import type { ComponentPropsWithoutRef } from 'react';
import type { FieldValues } from 'react-hook-form';

import {
  Button as BaseButton,
  Checkbox as BaseCheckbox,
  Selector as BaseSelector,
  TextInput as BaseTextInput,
} from '@te6/ui';

type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton>;

type CheckboxProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseCheckbox<T>
>;

type TextInputProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseTextInput<T>
>;

type SelectorProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseSelector<T>
>;

export function Button(props: ButtonProps) {
  return <BaseButton {...props} />;
}

export function Checkbox<T extends FieldValues>(props: CheckboxProps<T>) {
  return <BaseCheckbox<T> {...props} />;
}

export function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
  return <BaseTextInput<T> {...props} />;
}

export function Selector<T extends FieldValues>(props: SelectorProps<T>) {
  return <BaseSelector<T> {...props} />;
}
