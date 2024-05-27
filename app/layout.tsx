import { type Metadata } from 'next';
import localFont from 'next/font/local';

import { type PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { FormProvider } from '@/providers/form-provider';
import QueryProvider from '@/providers/query-provider';

import './globals.css';

const wantedSansVariable = localFont({
  src: '../public/fonts/WantedSansVariable.woff2',
  display: 'swap',
});

const metadata: Metadata = {
  title: 'Surveey',
  description: '우테코 따라잡기 두번째 구현과제',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko-KR">
      <body className={wantedSansVariable.className}>
        <main className="mx-auto flex h-screen w-screen max-w-sm flex-col break-keep bg-green-300">
          <QueryProvider>
            <FormProvider>{children}</FormProvider>
          </QueryProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
