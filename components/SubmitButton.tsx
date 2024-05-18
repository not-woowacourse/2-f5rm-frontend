'use client';

import { useFormContext } from 'react-hook-form';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui';
import type { FormValues } from '@/providers/form-provider';

export function SubmitButton() {
  const { handleSubmit } = useFormContext<FormValues>();

  const onValid = (data: FormValues) => {
    // TODO: push to the server
    console.log(data);
  };

  const onInvalid = (something: any) => {
    console.log(something);
  };

  return (
    <Button
      text="제출"
      icon={Check}
      primary
      onClick={handleSubmit(onValid, onInvalid)}
    />
  );
}
