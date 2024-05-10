import { BackButton } from '@/components/BackButton';

interface HeaderWithoutBackButtonProps {
  showBackButton?: false;
  step?: never;
}

interface HeaderWithBackButtonProps {
  showBackButton: true;
  step: number;
}

type HeaderProps = (
  | HeaderWithoutBackButtonProps
  | HeaderWithBackButtonProps
) & {
  text?: string;
};

export function Header({ text, showBackButton, step }: HeaderProps) {
  return (
    <header className="fixed top-0 flex h-12 w-full max-w-96 bg-body/50 text-base-800 backdrop-blur-lg dark:bg-body-dark/50 dark:text-base-dark-200">
      {showBackButton && <BackButton step={step} />}
      {text && (
        <div className="absolute left-1/2 flex h-full -translate-x-1/2 items-center font-bold">
          {text}
        </div>
      )}
    </header>
  );
}
