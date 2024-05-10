import { ChevronRight } from 'lucide-react';

import {
  AppBar,
  AppBarBack,
  AppBarTitle,
} from '@/components/additional-ui/app-bar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type PropsWithOnNext } from '@/types/props';

const EnterEmailStep = ({ onNext }: PropsWithOnNext) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <AppBar>
        <AppBarBack />
        <AppBarTitle>우모어 · 우리는 모두 어린이였다</AppBarTitle>
      </AppBar>
      <div className="flex w-full flex-col items-start gap-8 pt-14">
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-6xl font-extrabold">Q7</p>
          <h1 className="text-2xl font-semibold">
            당신의 이메일을 입력해주세요
          </h1>
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs">
            이메일
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="예) someone@umore.com"
            className="text-black"
          />
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={onNext}
        className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(512px-2rem)]"
      >
        <ChevronRight className="mr-2 h-5 w-5" />
        다음
      </Button>
    </div>
  );
};

export default EnterEmailStep;
