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
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SURVEY_FORM_ID, SURVEY_FORM_NAME } from '@/constants/form';
import { TOAST_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { type PropsWithOnNext } from '@/types/props';

const EnterEmailStep = ({ onNext }: PropsWithOnNext) => {
  const { control, getFieldState, setFocus, getValues } = useFormContext();

  const { invalid } = getFieldState(SURVEY_FORM_NAME.EMAIL);

  const setFormValues = useSetRecoilState(surveyFormValuesAtom);

  const handleNext = () => {
    if (onNext !== undefined) {
      onNext();
    }

    const value = getValues(SURVEY_FORM_NAME.EMAIL);

    setFormValues((prev) => ({
      ...prev,
      [SURVEY_FORM_NAME.EMAIL]: value,
    }));
  };

  useEffect(() => {
    setFocus(SURVEY_FORM_NAME.EMAIL);
  }, [setFocus]);

  useEffect(() => {
    if (
      [
        SURVEY_FORM_NAME.AGE,
        SURVEY_FORM_NAME.GENDER,
        SURVEY_FORM_NAME.MBTI,
        SURVEY_FORM_NAME.CHILDHOOD_DREAM,
        SURVEY_FORM_NAME.MOST_IMPORTANT_VALUE,
        SURVEY_FORM_NAME.LIFE_SATISFACTION,
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
          <p className="text-6xl font-extrabold">Q7</p>
          <h1 className="text-2xl font-semibold">
            당신의 이메일을 입력해주세요
          </h1>
        </div>
        <FormField
          control={control}
          name={SURVEY_FORM_NAME.EMAIL}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel
                htmlFor={SURVEY_FORM_ID.EMAIL}
                className="text-sm text-white"
              >
                이메일 (선택)
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  id={SURVEY_FORM_ID.EMAIL}
                  placeholder="예) someone@umore.com"
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

export default EnterEmailStep;
