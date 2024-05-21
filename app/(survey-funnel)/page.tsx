'use client';

import { useRouter } from 'next/navigation';

import { FormProvider, type UseFormProps, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { toast } from 'sonner';

import EnterAgeStep from '@/app/(survey-funnel)/_steps/enter-age-step';
import EnterChildhoodDreamStep from '@/app/(survey-funnel)/_steps/enter-childhood-dream-step';
import EnterEmailStep from '@/app/(survey-funnel)/_steps/enter-email-step';
import EnterGenderStep from '@/app/(survey-funnel)/_steps/enter-gender-step';
import EnterLifeSatisfactionStep from '@/app/(survey-funnel)/_steps/enter-life-satisfaction-step';
import EnterMbtiStep from '@/app/(survey-funnel)/_steps/enter-mbti-step';
import EnterMostImportantValueStep from '@/app/(survey-funnel)/_steps/enter-most-important-value-step';
import StartStep from '@/app/(survey-funnel)/_steps/start-step';
import SubmitStep from '@/app/(survey-funnel)/_steps/submit-step';
import { surveyFormValuesAtom } from '@/atoms/form-values-atom';
import { HookFormDevTool__Csr } from '@/components/etc/HookFormDevTool__Csr';
import {
  SURVEY_FUNNEL_STEP,
  type SurveyFormValues,
  surveyFormSchema,
} from '@/constants/form';
import { TOAST_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useFunnel } from '@/hooks/use-funnel';
import { useRecoilValue__Ssr } from '@/hooks/use-recoil-value__ssr';
import { axiosPostForm } from '@/lib/api-instance';
import { cn, getValues } from '@/lib/utils';

const RootPage__SsrWrapper = () => {
  const surveyFormValues = useRecoilValue__Ssr(surveyFormValuesAtom);

  if (surveyFormValues === null) {
    return null;
  }

  return <RootPage defaultSurveyFormValues={surveyFormValues} />;
};

type RootPageProps = {
  defaultSurveyFormValues: UseFormProps<SurveyFormValues>['defaultValues'];
};

const RootPage = ({ defaultSurveyFormValues }: RootPageProps) => {
  const router = useRouter();

  const { Funnel, setStep } = useFunnel({
    steps: getValues(SURVEY_FUNNEL_STEP),
    initialStep: SURVEY_FUNNEL_STEP.START,
  });

  const resetSurveyFormValues = useResetRecoilState(surveyFormValuesAtom);

  const methods = useForm<SurveyFormValues>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues: defaultSurveyFormValues,
  });

  const { mutate } = useMutation({
    mutationFn: axiosPostForm,
    onSuccess: () => {
      methods.reset();
      resetSurveyFormValues();

      toast.success(TOAST_MESSAGES.SURVEY_SUBMITTED);

      /* TODO: make a result page */
      router.push(ROUTES.ROOT);
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.SURVEY_SUBMIT_FAILED);
    },
  });

  const onSubmit = (values: SurveyFormValues) => {
    mutate({ data: values });
  };

  return (
    <main
      className={cn(
        'mx-auto min-h-dvh max-w-lg',
        'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      )}
    >
      <FormProvider {...methods}>
        <HookFormDevTool__Csr control={methods.control} />
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4">
          <Funnel>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.START}>
              <StartStep onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_AGE)} />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_AGE}>
              <EnterAgeStep
                onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_GENDER)}
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_GENDER}>
              <EnterGenderStep
                onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_MBTI)}
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_MBTI}>
              <EnterMbtiStep
                onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_CHILDHOOD_DREAM)}
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_CHILDHOOD_DREAM}>
              <EnterChildhoodDreamStep
                onNext={() =>
                  setStep(SURVEY_FUNNEL_STEP.ENTER_MOST_IMPORTANT_VALUE)
                }
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_MOST_IMPORTANT_VALUE}>
              <EnterMostImportantValueStep
                onNext={() =>
                  setStep(SURVEY_FUNNEL_STEP.ENTER_LIFE_SATISFACTION)
                }
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_LIFE_SATISFACTION}>
              <EnterLifeSatisfactionStep
                onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_EMAIL)}
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_EMAIL}>
              <EnterEmailStep
                onNext={() => setStep(SURVEY_FUNNEL_STEP.SUBMIT)}
              />
            </Funnel.Step>
            <Funnel.Step name={SURVEY_FUNNEL_STEP.SUBMIT}>
              <SubmitStep />
            </Funnel.Step>
          </Funnel>
        </form>
      </FormProvider>
    </main>
  );
};

export default RootPage__SsrWrapper;
