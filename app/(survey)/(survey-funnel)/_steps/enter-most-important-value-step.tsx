import { redirect } from 'next/navigation';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ChevronRight } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

import { surveyFormValuesAtom } from '@/atoms/form-values-atom';
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
import { MOST_IMPORTANT_VALUE, SURVEY_FORM_NAME } from '@/constants/form';
import { TOAST_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { type PropsWithOnNext } from '@/types/props';

const EnterMostImportantValueStep = ({ onNext }: PropsWithOnNext) => {
  const { control, getFieldState, getValues } = useFormContext();

  const { invalid } = getFieldState(SURVEY_FORM_NAME.MOST_IMPORTANT_VALUE);

  const setFormValues = useSetRecoilState(surveyFormValuesAtom);

  const handleNext = () => {
    if (onNext !== undefined) {
      onNext();
    }

    const value = getValues(SURVEY_FORM_NAME.MOST_IMPORTANT_VALUE);

    setFormValues((prev) => ({
      ...prev,
      [SURVEY_FORM_NAME.MOST_IMPORTANT_VALUE]: value,
    }));
  };

  useEffect(() => {
    if (
      [
        SURVEY_FORM_NAME.AGE,
        SURVEY_FORM_NAME.GENDER,
        SURVEY_FORM_NAME.MBTI,
        SURVEY_FORM_NAME.CHILDHOOD_DREAM,
        // SURVEY_FORM_NAME.MOST_IMPORTANT_VALUE,
        // SURVEY_FORM_NAME.LIFE_SATISFACTION,
        // SURVEY_FORM_NAME.EMAIL,
      ].some((key) => getValues(key) === undefined)
    ) {
      toast.error(TOAST_MESSAGES.INVALID_STEP);

      redirect(ROUTES.ROOT);
    }
  }, []);

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
          name={SURVEY_FORM_NAME.MOST_IMPORTANT_VALUE}
          render={({ field }) => (
            <FormControl>
              <ButtonRadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex w-full flex-col gap-2"
              >
                <FormControl>
                  <ButtonRadioGroupItem value={MOST_IMPORTANT_VALUE.MONEY}>
                    돈, 물질적 풍요
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value={MOST_IMPORTANT_VALUE.FAMILY}>
                    가족
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value={MOST_IMPORTANT_VALUE.FAME}>
                    명예, 인정받는 삶
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value={MOST_IMPORTANT_VALUE.CAREER}>
                    커리어, 취업
                  </ButtonRadioGroupItem>
                </FormControl>
                <FormControl>
                  <ButtonRadioGroupItem value={MOST_IMPORTANT_VALUE.ETC}>
                    기타
                  </ButtonRadioGroupItem>
                </FormControl>
              </ButtonRadioGroup>
            </FormControl>
          )}
        />
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={handleNext}
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
