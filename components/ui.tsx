'use client';

import type { ComponentPropsWithoutRef } from 'react';
import type { FieldValues } from 'react-hook-form';

import {
  Button as BaseButton,
  Checkbox as BaseCheckbox,
  TextInput as BaseTextInput,
} from '@te6/ui';

type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton>;

type CheckboxProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseCheckbox<T>
>;

type TextInputProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseTextInput<T>
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
