'use client';

import { type PropsWithChildren } from 'react';

import { RecoilRoot } from 'recoil';

const RecoilRootProvider = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;
