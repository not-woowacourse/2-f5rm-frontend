import { redirect } from 'next/navigation';

import { Confirm } from '@/components/Confirm';
import { FormLayout } from '@/components/FormLayout';
import { Landing } from '@/components/Landing';
import { PATHNAME, type STEP_SEARCHPARAM_KEY } from '@/constants/constants';
import { metadata } from '@/constants/metadata';
import type { NextAppPage } from '@/types/next';

type HomePageProps = NextAppPage<typeof STEP_SEARCHPARAM_KEY>;

export default function HomePage({ searchParams: { step } }: HomePageProps) {
  const { items } = metadata;

  // "/"
  if (step === undefined) return <Landing />;

  // "/?step=3&step=4"
  if (typeof step !== 'string') redirect(PATHNAME);

  // here I'm not using parseInt since parseInt("123abc", 10) === 123
  const stepNumber = +step;

  // "/?step=foobar" / "/?step=0.5"
  if (isNaN(stepNumber) || Math.floor(stepNumber) !== stepNumber)
    redirect(PATHNAME);

  // "/?step=-1" / "?step=11" (step:0~9)
  if (stepNumber < 0 || stepNumber > items.length) redirect(PATHNAME);

  // "/?step=10" (step: 0~9)
  if (stepNumber === items.length) return <Confirm />;

  // "/?step=5" (step: 0~9)

  return <FormLayout step={stepNumber} />;
}
