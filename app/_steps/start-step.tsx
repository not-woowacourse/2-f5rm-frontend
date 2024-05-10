import Image from 'next/image';

import { ChevronRight } from 'lucide-react';

import happy_family from '@/assets/images/happy-family.webp';
import { Button } from '@/components/ui/button';
import { type PropsWithOnNext } from '@/types/props';

const StartStep = ({ onNext }: PropsWithOnNext) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <h1 className="text-4xl leading-snug">
          <b>우</b>리는
          <br />
          <b>모</b>두
          <br />
          <b>어</b>린이였다
        </h1>
      </div>
      <Image
        src={happy_family}
        width={280}
        height={280}
        alt="행복한 가족 사진"
        className="my-10"
      />
      <div className="text-center">
        <p>5월 가정의 달을 맞아 소소한 설문 하나를 준비해봤어요 ✨</p>
        <p>설문은 3분 정도 소요되며, 익명으로 진행됩니다.</p>
      </div>
      <Button
        variant="secondary"
        onClick={onNext}
        className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(512px-2rem)]"
      >
        <ChevronRight className="mr-2 h-5 w-5" />
        시작하기
      </Button>
    </div>
  );
};

export default StartStep;
