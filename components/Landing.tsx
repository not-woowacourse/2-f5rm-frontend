import { Paragraphs } from '@/components/Paragraphs';
import { StartButton } from '@/components/StartButton';
import { Title } from '@/components/Title';
import { metadata } from '@/constants/metadata';

export function Landing() {
  return (
    <div className="flex h-screen max-w-lg flex-grow flex-col">
      <section className="flex flex-grow flex-col gap-3.5 overflow-auto p-4 text-base-600 dark:text-base-dark-400">
        <Title text={metadata.title} large />
        <Paragraphs text={metadata.description} />
      </section>
      <section className="p-3.5">
        <StartButton />
      </section>
    </div>
  );
}
