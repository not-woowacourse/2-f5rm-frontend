import { redirect } from 'next/navigation';

import { FormStep } from '@/components/Steps/FormStep';
import { ResultStep } from '@/components/Steps/ResultStep';
import { StartStep } from '@/components/Steps/StartStep';
import { SubmitStep } from '@/components/Steps/SubmitStep';
import {
  DEFAULT_PATHNAME,
  type STEP_SEARCHPARAM_KEY,
} from '@/constants/constants';
import { metadata } from '@/constants/metadata';

export interface NextAppPage<T extends string> {
  params: { slug: string };
  searchParams: Partial<Record<T, string | string[] | undefined>>;
}
type HomePageProps = NextAppPage<typeof STEP_SEARCHPARAM_KEY>;

export default function HomePage({ searchParams: { step } }: HomePageProps) {
  const { items } = metadata;

  // "/"
  if (step === undefined) return <StartStep />;

  // "/?step=3&step=4"
  if (typeof step !== 'string') redirect(DEFAULT_PATHNAME);

  // "/?step=success"
  if (step === 'success') return <ResultStep />;

  // here I'm not using parseInt since parseInt("123abc", 10) === 123
  const stepNumber = +step;

  // "/?step=foobar" / "/?step=0.5"
  if (isNaN(stepNumber) || Math.floor(stepNumber) !== stepNumber)
    redirect(DEFAULT_PATHNAME);

  // "/?step=-1" / "?step=11" (step:0~9)
  if (stepNumber < 0 || stepNumber > items.length) redirect(DEFAULT_PATHNAME);

  // "/?step=10" (step: 0~9)
  if (stepNumber === items.length) return <SubmitStep />;

  // "/?step=5" (step: 0~9)
  return <FormStep step={stepNumber} />;
}
