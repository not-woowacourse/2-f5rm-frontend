import { BackButton } from '@/components/Buttons/BackButton';
import { ShareButton } from '@/components/Buttons/ShareButton';
import { BottomInteractionArea } from '@/components/Containers/BottomInteractionArea';
import { ButtonContainer } from '@/components/Containers/ButtonContainer';
import { InfoArea } from '@/components/Containers/InfoArea';
import { Header } from '@/components/Header';
import { Paragraphs } from '@/components/Paragraphs';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';

export function Success() {
  return (
    <>
      <Header text={metadata.title} showBackButton />
      <InfoArea hasHeader>
        <Title text="제출 완료" />
        <Paragraphs
          text={`제출이 성공적으로 완료되었습니다.\n설문에 참여해 주셔서 다시 한 번 감사드립니다.`}
        />
      </InfoArea>
      <BottomInteractionArea>
        <ButtonContainer>
          <BackButton large toStart />
          <ShareButton />
        </ButtonContainer>
      </BottomInteractionArea>
    </>
  );
}
