import { useFormContext } from 'react-hook-form';

import { ChevronRight } from 'lucide-react';

import {
  AppBar,
  AppBarBack,
  AppBarTitle,
} from '@/components/additional-ui/app-bar';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FORM_ID, FORM_NAME } from '@/constants/form';
import { type PropsWithOnNext } from '@/types/props';

const EnterAgeStep = ({ onNext }: PropsWithOnNext) => {
  const { control, getFieldState } = useFormContext();

  const { invalid } = getFieldState(FORM_NAME.AGE);

  return (
    <div className="flex flex-col items-center gap-4">
      <AppBar>
        <AppBarBack />
        <AppBarTitle>우모어</AppBarTitle>
      </AppBar>
      <div className="flex w-full flex-col items-start gap-8 pt-14">
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-6xl font-extrabold">Q1</p>
          <h1 className="text-2xl font-semibold">당신의 나이를 입력해주세요</h1>
        </div>
        <FormField
          control={control}
          name={FORM_NAME.AGE}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel htmlFor={FORM_ID.AGE} className="text-sm text-white">
                만 나이
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  id={FORM_ID.AGE}
                  min="1"
                  max="122"
                  placeholder="예) 23"
                  className="text-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={onNext}
        disabled={invalid}
        className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(512px-2rem)]"
      >
        <ChevronRight className="mr-2 h-5 w-5" />
        다음
      </Button>
    </div>
  );
};

export default EnterAgeStep;
