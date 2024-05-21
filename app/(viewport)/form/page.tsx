'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Step1 from '@/components/steps/Step1';
import Step2 from '@/components/steps/Step2';
import Step3 from '@/components/steps/Step3';
import Step4 from '@/components/steps/Step4';
import { Button } from '@/components/ui/button';
import {
  BalanceGameCategories,
  BasicInformationCategories,
  ErrorMessages,
  SelfPromotionCategories,
} from '@/constants/categories';
import { StepType, Steps } from '@/constants/steps';

const RegisterSchema = z.object({
  mbti: z.string().min(1, { message: ErrorMessages.mbti }),
  name: z.string().min(1, { message: ErrorMessages.name }),
  gender: z.string().min(1, { message: ErrorMessages.gender }),
  email: z.string().email(ErrorMessages.email),
  instagramId: z.string(),
  age: z.coerce.number(),
  type: z.string().optional(),
  animal: z.string().min(1, { message: ErrorMessages.animal }),
  situation: z
    .array(
      z.object({
        scenario: z.number(),
        choice: z.number(),
      }),
    )
    .length(4),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function Form() {
  const router = useRouter();
  const methods = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      mbti: '',
      name: '',
      gender: '',
      email: '',
      instagramId: '',
      type: '',
      animal: '',
      situation: [
        { scenario: 0, choice: 0 },
        { scenario: 1, choice: 0 },
        { scenario: 2, choice: 0 },
        { scenario: 3, choice: 0 },
      ],
    },
  });
  const [step, setStep] = useState(0);

  const getStepFields = () => {
    switch (step) {
      case 0:
        return BasicInformationCategories;
      case 2:
        return SelfPromotionCategories;
      case 3:
        return BalanceGameCategories;
      default:
        return [];
    }
  };

  const handleNextStep = async () => {
    const currentStepFields = getStepFields();
    const valid = await methods.trigger(currentStepFields as []);
    if (valid && step < Steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data);
    if (Steps[step] === StepType.balanceGame) {
      const hasInvalidChoice = data.situation.some((s) => s.choice === 0);
      if (hasInvalidChoice) {
        methods.setError('situation', {
          type: 'manual',
          message: ErrorMessages.situation,
        });
        return;
      }
    }
    router.push('/completed');
  };

  return (
    <FormProvider {...methods}>
      <div className="relative flex h-screen w-full flex-col justify-between bg-white p-4">
        <div className="flex items-center gap-x-3">
          <button
            className="flex h-9 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-all duration-300 hover:bg-slate-500 disabled:opacity-50"
            onClick={handlePrevStep}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="relative z-10 h-3 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
            <div
              className="absolute h-full rounded-full transition-all"
              style={{
                width: `${((step + 1) / Steps.length) * 100}%`,
                background: 'linear-gradient(90deg, #adc9f9 0%, #4377e9 100%)',
              }}
            />
          </div>
        </div>

        <div className="h-full p-2">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-between py-8"
          >
            <section>
              {step === 0 && <Step1 />}
              {step === 1 && <Step2 />}
              {step === 2 && <Step3 />}
              {step === 3 && <Step4 />}
            </section>
            <div className="sticky bottom-0">
              {step !== Steps.length - 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={handleNextStep}
                >
                  다음
                </Button>
              )}
              {step === Steps.length - 1 && (
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  제출
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
