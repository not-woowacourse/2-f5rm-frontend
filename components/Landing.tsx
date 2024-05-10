import { NextButton } from '@/components/NextButton';
import { Paragraphs } from '@/components/Paragraphs';
import { metadata } from '@/constants/metadata';

export function Landing() {
  return (
    <div className="flex h-screen max-w-lg flex-grow flex-col">
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 text-base-600 dark:text-base-dark-400">
        <h1 className="text-balance text-3xl font-bold text-base-700 dark:text-base-dark-300">
          안녕하세요!
        </h1>
        <Paragraphs text={metadata.description} />
      </section>
      <section className="p-3.5">
        <NextButton step={-1} />
      </section>
    </div>
  );
}
