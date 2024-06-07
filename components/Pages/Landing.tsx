import { StartButton } from '@/components/Buttons/StartButton';
import { BottomInteractionArea } from '@/components/Containers/BottomInteractionArea';
import { InfoArea } from '@/components/Containers/InfoArea';
import { Paragraphs } from '@/components/Paragraphs';
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
