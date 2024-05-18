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
        <Title text="감사합니다." />
        <Paragraphs
          text={`설문에 성실히 응답해 주셔서 대단히 감사드립니다. 이 설문 제출을 마지막으로 모든 과정이 완료됩니다.
          여러분의 소중한 의견은 더 나은 서비스 제공에 크게 기여할 것입니다.
          바쁘신 와중에도 시간 내어 참여해 주셔서 진심으로 감사드리며, 앞으로도 꾸준한 성원을 부탁드립니다.
          제출 버튼을 누르시면 설문이 최종 제출되니 한번 더 확인 후 진행해 주시기 바랍니다.
          감사합니다.`}
        />
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
