import { BackButton } from '@/components/BackButton';
import { BottomInteractionArea } from '@/components/BottomInteractionArea';
import { ButtonContainer } from '@/components/ButtonContainer';
import { Header } from '@/components/Header';
import { InfoArea } from '@/components/InfoArea';
import { Paragraphs } from '@/components/Paragraphs';
import { SubmitButton } from '@/components/SubmitButton';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';

export function Confirm() {
  return (
    <>
      <Header text={metadata.title} showBackButton />
      <InfoArea hasHeader>
        <Title text="수고하셨습니다." />
        <Paragraphs text="완료" />
      </InfoArea>
      <BottomInteractionArea>
        <ButtonContainer>
          <BackButton large />
          <SubmitButton />
        </ButtonContainer>
      </BottomInteractionArea>
    </>
  );
}
