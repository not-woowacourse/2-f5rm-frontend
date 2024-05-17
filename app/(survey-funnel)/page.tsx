'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
import { HookFormDevTool__Csr } from '@/components/etc/HookFormDevTool__Csr';
import { type FormValues, formSchema } from '@/constants/form';
import { TOAST_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { SEARCH_PARAMS } from '@/constants/search-params';
import { axiosPostForm } from '@/lib/api-instance';
import { cn, noop } from '@/lib/utils';
import { type ValuesOf } from '@/types/utility';

const Step = {
  Start: 'start',
  EnterAge: 'enter-age',
  EnterGender: 'enter-gender',
  EnterMbti: 'enter-mbti',
  EnterChildhoodDream: 'enter-childhood-dream',
  EnterMostImportantValue: 'enter-most-important-value',
  EnterLifeSatisfaction: 'enter-life-satisfaction',
  EnterEmail: 'enter-email',
  Submit: 'submit',
} as const;

type Step = ValuesOf<typeof Step>;

const initialStep = Step.Start;

const RootPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useMutation({
    mutationFn: axiosPostForm,
    onSuccess: () => {
      methods.reset();

      toast.success(TOAST_MESSAGES.SURVEY_SUBMITTED);

      /* TODO: make a result page */
      router.push(ROUTES.ROOT);
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.SURVEY_SUBMIT_FAILED);
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate({ data: values });
  };

  const step = searchParams.get(SEARCH_PARAMS.FUNNEL_STEP) ?? initialStep;

  const moveStep = (step: Step) => {
    const queryString = createQueryString(SEARCH_PARAMS.FUNNEL_STEP, step);

    router.push('?' + queryString);
  };

  /**
   * @reference
   * https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <main
      className={cn(
        'mx-auto min-h-dvh max-w-lg',
        'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      )}
    >
      <FormProvider {...methods}>
        <HookFormDevTool__Csr control={methods.control} />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="px-4 py-4">
            {step === Step.Start && (
              <StartStep onNext={() => moveStep(Step.EnterAge)} />
            )}
            {step === Step.EnterAge && (
              <EnterAgeStep onNext={() => moveStep(Step.EnterGender)} />
            )}
            {step === Step.EnterGender && (
              <EnterGenderStep onNext={() => moveStep(Step.EnterMbti)} />
            )}
            {step === Step.EnterMbti && (
              <EnterMbtiStep
                onNext={() => moveStep(Step.EnterChildhoodDream)}
              />
            )}
            {step === Step.EnterChildhoodDream && (
              <EnterChildhoodDreamStep
                onNext={() => moveStep(Step.EnterMostImportantValue)}
              />
            )}
            {step === Step.EnterMostImportantValue && (
              <EnterMostImportantValueStep
                onNext={() => moveStep(Step.EnterLifeSatisfaction)}
              />
            )}
            {step === Step.EnterLifeSatisfaction && (
              <EnterLifeSatisfactionStep
                onNext={() => moveStep(Step.EnterEmail)}
              />
            )}
            {step === Step.EnterEmail && (
              <EnterEmailStep onNext={() => moveStep(Step.Submit)} />
            )}
            {step === Step.Submit && <SubmitStep onNext={noop} />}
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default RootPage;