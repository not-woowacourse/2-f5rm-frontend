import { BackButton } from '@/components/BackButton';
import { BottomInteractionArea } from '@/components/BottomInteractionArea';
import { ButtonContainer } from '@/components/ButtonContainer';
import { Header } from '@/components/Header';
import { InfoArea } from '@/components/InfoArea';
import { Paragraphs } from '@/components/Paragraphs';
import { ShareButton } from '@/components/ShareButton';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';

export function Success() {
  return (
    <>
      <Header text={metadata.title} showBackButton />
      <InfoArea hasHeader>
        <Title text="제출 완료" />
        <Paragraphs text="제출이 완료되었습니다. 설문에 참여해 주셔서 감사합니다." />
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
