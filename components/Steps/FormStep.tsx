'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Answer, AnswerContainer } from '@/components/AnswerInput/Answer';
import { ButtonContainer, NextButton } from '@/components/Button/MoveButton';
import { Header } from '@/components/Header';
import { Paragraph, TextContainer, Title } from '@/components/Text';
import { metadata } from '@/constants/metadata';
import type { FormValues } from '@/providers/form-provider';

interface FormStepProps {
  step: number;
}
export function FormStep({ step }: FormStepProps) {
  const item = metadata.items[step];
  const { watch, formState, getFieldState, trigger } =
    useFormContext<FormValues>();

  const userInput = watch(item.id);
  const { isDirty, error, invalid } = getFieldState(item.id, formState);

  const canConfirm =
    userInput !== undefined && invalid === false && isDirty === true;
  const toStart: boolean = step === 0 || step === 10;

  useEffect(() => {
    // 첫 렌더에서는 invalid가 항상 false이므로 다음 버튼 비활성화를 위해 trigger()
    trigger();
  }, [item, trigger]);

  return (
    <>
      <Header text={metadata.title} showPrevButton toStart={toStart} />
      <TextContainer>
        <Title text={item.question} />
        <Paragraph text={item.description} />
      </TextContainer>
      <AnswerContainer>
        <Answer name={item.id} answer={item.answer} error={error} />
      </AnswerContainer>
      <ButtonContainer>
        <NextButton disabled={!canConfirm} itemId={item.id} step={step} />
      </ButtonContainer>
    </>
  );
}
