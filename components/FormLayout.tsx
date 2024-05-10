import { Header } from '@/components/Header';
import { NextButton } from '@/components/NextButton';
import { Paragraphs } from '@/components/Paragraphs';
import { metadata } from '@/constants/metadata';

interface FormLayoutProps {
  item: (typeof metadata)['items'][number];
  step: number;
}

export function FormLayout({
  item: { question, description },
  step,
}: FormLayoutProps) {
  return (
    <form className="flex h-screen max-w-lg flex-grow flex-col">
      <Header text={metadata.title} showBackButton step={step} />
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 pt-14 text-base-600 dark:text-base-dark-400">
        <h1 className="text-balance text-2xl font-bold text-base-700 dark:text-base-dark-300">
          {question}
        </h1>
        <Paragraphs text={description} />
      </section>
      <section className="p-3.5">
        <NextButton step={step} />
      </section>
    </form>
  );
}
