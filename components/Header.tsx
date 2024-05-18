import { BackButton } from '@/components/BackButton';

interface HeaderProps {
  showBackButton?: boolean;
  text?: string;
}

export function Header({ text, showBackButton = false }: HeaderProps) {
  return (
    <header className="fixed top-0 flex h-14 w-full max-w-lg bg-body/50 text-base-800 backdrop-blur-lg dark:bg-body-dark/50 dark:text-base-dark-200">
      {showBackButton && <BackButton />}
      {text && (
        <div className="absolute left-1/2 flex h-full -translate-x-1/2 items-center text-balance text-center font-bold">
          {text}
        </div>
      )}
    </header>
  );
}
