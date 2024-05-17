import { type Metadata } from 'next';

import { type PropsWithChildren } from 'react';

import { FormProvider } from '@/providers/form-provider';
import QueryProvider from '@/providers/query-provider';

import './globals.css';

const metadata: Metadata = {
  title: 'Surveey',
  description: '우테코 따라잡기 두번째 구현과제',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko-KR">
      <QueryProvider>
        <body className="break-keep bg-body dark:bg-body-dark">
          <main className="flex w-full justify-center">
            <FormProvider>{children}</FormProvider>
          </main>
        </body>
      </QueryProvider>
    </html>
  );
};

export { metadata };
export default RootLayout;
