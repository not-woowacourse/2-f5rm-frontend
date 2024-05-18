import { BottomInteractionArea } from '@/components/BottomInteractionArea';
import { InfoArea } from '@/components/InfoArea';
import { Paragraphs } from '@/components/Paragraphs';
import { StartButton } from '@/components/StartButton';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';

export function Landing() {
  return (
    <>
      <InfoArea>
        <Title text={metadata.title} large />
        <Paragraphs text={metadata.description} />
      </InfoArea>
      <BottomInteractionArea>
        <StartButton />
      </BottomInteractionArea>
    </>
  );
}
