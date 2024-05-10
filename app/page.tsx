'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import EnterAgeStep from '@/app/_steps/enter-age-step';
import EnterChildhoodDreamStep from '@/app/_steps/enter-childhood-dream-step';
import EnterEmailStep from '@/app/_steps/enter-email-step';
import EnterGenderStep from '@/app/_steps/enter-gender-step';
import EnterLifeSatisfactionStep from '@/app/_steps/enter-life-satisfaction-step';
import EnterMbtiStep from '@/app/_steps/enter-mbti-step';
import EnterMostImportantValueStep from '@/app/_steps/enter-most-important-value-step';
import StartStep from '@/app/_steps/start-step';
import SubmitStep from '@/app/_steps/submit-step';
import { HookFormDevTool__Csr } from '@/components/etc/HookFormDevTool__Csr';
import { SEARCH_PARAMS } from '@/constants/search-params';

enum Step {
  Start = 'start',
  EnterAge = 'enter-age',
  EnterGender = 'enter-gender',
  EnterMbti = 'enter-mbti',
  EnterChildhoodDream = 'enter-childhood-dream',
  EnterMostImportantValue = 'enter-most-important-value',
  EnterLifeSatisfaction = 'enter-life-satisfaction',
  EnterEmail = 'enter-email',
  Submit = 'submit',
}

const gender = ['female', 'male', 'etc'] as const;

const mbti = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
] as const;

const mostImportantValue = [
  'money',
  'family',
  'fame',
  'career',
  'etc',
] as const;

const initialStep = Step.Start;

const formSchema = z.object({
  age: z.coerce.number().int().gte(1).lte(122),
  gender: z.enum(gender),
  mbti: z.enum(mbti),
  childhoodDream: z.string().min(1),
  mostImportantValue: z.enum(mostImportantValue),
  lifeSatisfaction: z.coerce.number().int().gte(1).lte(10),
  email: z.string().email(),
});

type InferredFormSchema = z.infer<typeof formSchema>;

const RootPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<InferredFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      /* i want not to use default values */
    },
  });

  const onSubmit = (values: InferredFormSchema) => {
    console.log(values); /* FIXME: why not working? */
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
    <main className="mx-auto min-h-dvh max-w-lg">
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
            {step === Step.Submit && (
              <SubmitStep
                onNext={() => {
                  moveStep(Step.Start); /* TODO: make a done page */
                }}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default RootPage;
export type { InferredFormSchema };
