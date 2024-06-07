import { redirect } from 'next/navigation';

import { Confirm } from '@/components/Pages/Confirm';
import { FormLayout } from '@/components/Pages/FormLayout';
import { Landing } from '@/components/Pages/Landing';
import { Success } from '@/components/Pages/Success';
import {
  DEFAULT_PATHNAME,
  type STEP_SEARCHPARAM_KEY,
} from '@/constants/constants';
import { metadata } from '@/constants/metadata';
import type { NextAppPage } from '@/types/next';

type HomePageProps = NextAppPage<typeof STEP_SEARCHPARAM_KEY>;

export default function HomePage({ searchParams: { step } }: HomePageProps) {
  const { items } = metadata;

  // "/"
  if (step === undefined) return <Landing />;

  // "/?step=3&step=4"
  if (Array.isArray(step)) redirect(DEFAULT_PATHNAME);

  // "/?step=success"
  if (step === 'success') return <Success />;

  // here I'm not using parseInt since parseInt("123abc", 10) === 123
  const stepAsNumber = Number(step);

  // "/?step=foobar" / "/?step=0.5"
  if (isNaN(stepAsNumber) || Number.isInteger(stepAsNumber) === false)
    redirect(DEFAULT_PATHNAME);

  // "/?step=-1" / "?step=11" (step:0~9)
  if (stepAsNumber < 0 || stepAsNumber > items.length)
    redirect(DEFAULT_PATHNAME);

  // "/?step=10" (step: 0~9)
  if (stepAsNumber === items.length) return <Confirm />;

  // "/?step=5" (step: 0~9)
  return <FormLayout step={stepAsNumber} />;
}
