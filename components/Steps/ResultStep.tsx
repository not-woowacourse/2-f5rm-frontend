'use client';

import { HomeIcon, ShipIcon } from 'lucide-react';

import { ButtonContainer, MoveButton } from '@/components/Button/MoveButton';
import { Header } from '@/components/Header';
import { Paragraph, TextContainer, Title } from '@/components/Text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { metadata } from '@/constants/metadata';

export function ResultStep() {
  return (
    <>
      <Header text={metadata.title} />
      <TextContainer className="flex-grow">
        <Title text="추천 결과" />
        <Paragraph
          text={`
          당신의 취향에 맞는 추천 웹툰은 아래와 같습니다. 추천 결과에 만족하셨나요?\n
          설문에 참여해 주셔서 다시 한 번 감사드립니다. `}
        />
        <div className="mt-3 flex flex-col items-center rounded-xl bg-white py-3">
          <Avatar>
            <AvatarImage src="../../favicon.ico" />
            <AvatarFallback>
              <ShipIcon />
            </AvatarFallback>
          </Avatar>
          <TextContainer className="text-center">
            <Title text="code 404 : 찾을 수 없는 용사" />
            <Paragraph
              text={`완결\n코믹 판타지 로맨스 어드벤처\nNOT우테코스튜디오`}
            />
          </TextContainer>
        </div>
      </TextContainer>
      <ButtonContainer>
        <MoveButton name="홈으로 이동" icon={<HomeIcon />} />
      </ButtonContainer>
    </>
  );
}
