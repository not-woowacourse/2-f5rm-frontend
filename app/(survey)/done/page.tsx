import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import smily_child from '@/assets/images/smily-child.png';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

const DonePage = () => {
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
        src={smily_child}
        priority
        width={280}
        alt="활짝 웃는 어린이"
        className="my-10"
      />
      <div className="text-center">
        <p>설문이 모두 완료되었어요 😊</p>
        <p>시간 내주셔서 감사합니다!</p>
      </div>
      <Link href={ROUTES.ROOT}>
        <Button
          variant="secondary"
          className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(512px-2rem)]"
        >
          <ChevronRight className="mr-2 h-5 w-5" />
          처음으로
        </Button>
      </Link>
    </div>
  );
};

export default DonePage;
