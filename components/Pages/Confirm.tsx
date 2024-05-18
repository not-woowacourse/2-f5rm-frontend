import { BackButton } from '@/components/Buttons/BackButton';
import { SubmitButton } from '@/components/Buttons/SubmitButton';
import { BottomInteractionArea } from '@/components/Containers/BottomInteractionArea';
import { ButtonContainer } from '@/components/Containers/ButtonContainer';
import { InfoArea } from '@/components/Containers/InfoArea';
import { Header } from '@/components/Header';
import { Paragraphs } from '@/components/Paragraphs';
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
