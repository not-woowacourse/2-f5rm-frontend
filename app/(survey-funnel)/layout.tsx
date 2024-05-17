import { type PropsWithChildren, Suspense } from 'react';

const SurveyFunnelLayout = ({ children }: PropsWithChildren) => {
  return <Suspense>{children}</Suspense>;
};

export default SurveyFunnelLayout;
