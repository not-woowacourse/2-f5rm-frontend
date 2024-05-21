import { type PropsWithChildren, Suspense } from 'react';

const SurveyFunnelLayout__Suspense = ({ children }: PropsWithChildren) => {
  return <Suspense>{children}</Suspense>;
};

export default SurveyFunnelLayout__Suspense;
