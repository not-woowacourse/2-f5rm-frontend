'use client';

import { ButtonContainer } from '@/components/Button/MoveButton';
import { SubmitButton } from '@/components/Button/SubmitButton';
import { Header } from '@/components/Header';
import { Paragraph, TextContainer, Title } from '@/components/Text';
import { metadata } from '@/constants/metadata';

export function SubmitStep() {
  return (
    <>
      <Header text={metadata.title} showPrevButton toStart />
      <TextContainer className="flex-grow">
        <Title text="감사합니다." />
        <Paragraph
          text={`설문에 성실히 응답해 주셔서 대단히 감사드립니다. 제출을 마지막으로 모든 과정이 완료됩니다.
          제출 버튼을 누르시면 설문이 최종 제출되니 한번 더 확인 후 진행해 주시기 바랍니다.
          감사합니다.`}
        />
      </TextContainer>
      <ButtonContainer>
        <SubmitButton />
      </ButtonContainer>
    </>
  );
}
