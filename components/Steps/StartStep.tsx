import { PlayIcon } from 'lucide-react';

import { ButtonContainer, MoveButton } from '@/components/Button/MoveButton';
import { Paragraph, TextContainer, Title } from '@/components/Text';
import { metadata } from '@/constants/metadata';

export function StartStep() {
  return (
    <>
      <TextContainer className="flex-grow">
        <Title text={metadata.title} />
        <Paragraph text={metadata.description} />
      </TextContainer>
      <ButtonContainer>
        <MoveButton name="시작하기" icon={<PlayIcon />} toStep={0} />
      </ButtonContainer>
    </>
  );
}
