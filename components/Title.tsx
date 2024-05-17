import { cn } from '@/lib/utils';

interface TitleProps {
  text: string;
  large?: boolean;
}

export function Title({ text, large = false }: TitleProps) {
  return (
    <h1
      className={cn(
        'text-balance font-bold text-base-700 dark:text-base-dark-300',
        large ? 'text-3xl' : 'text-2xl',
      )}
    >
      {text}
    </h1>
  );
}
