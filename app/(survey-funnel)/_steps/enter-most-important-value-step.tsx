import { useFormContext } from 'react-hook-form';

import { ChevronRight } from 'lucide-react';

import {
  AppBar,
  AppBarBack,
  AppBarTitle,
} from '@/components/additional-ui/app-bar';
import {
  ButtonRadioGroup,
  ButtonRadioGroupItem,
} from '@/components/additional-ui/button-radio-group';
import { Button } from '@/components/ui/button';
import { FormControl, FormField } from '@/components/ui/form';
import { FORM_NAME } from '@/constants/form';
import { type PropsWithOnNext } from '@/types/props';

const EnterMostImportantValueStep = ({ onNext }: PropsWithOnNext) => {
  const { control, getFieldState } = useFormContext();

  const { invalid } = getFieldState(FORM_NAME.MOST_IMPORTANT_VALUE);

  return (
    <div className="flex flex-col items-center gap-4">
      <AppBar>
        <AppBarBack />
        <AppBarTitle>우모어</AppBarTitle>
      </AppBar>
      <div className="flex w-full flex-col items-start gap-8 pt-14">
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-6xl font-extrabold">Q5</p>
          <h1 className="text-2xl font-semibold">
            지금 당신의 삶에서 <br /> 가장 중요한 가치를 말해주세요
          </h1>
        </div>
        <FormField
          control={control}
          name={FORM_NAME.MOST_IMPORTANT_VALUE}
          render={({ field }) => (
            <FormControl>
              <ButtonRadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex w-full flex-col gap-2"
              >
                <FormControl>
                  <ButtonRadioGroupItem value="money">
                    돈, 물질적 풍요
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value="family">
                    가족
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value="fame">
                    명예, 인정받는 삶
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value="career">
                    커리어, 취업
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value="etc">기타</ButtonRadioGroupItem>
                </FormControl>
              </ButtonRadioGroup>
            </FormControl>
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

export default EnterMostImportantValueStep;
