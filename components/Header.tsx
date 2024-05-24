import { PrevButton } from '@/components/Button/MoveButton';

import { Title } from './Text';

interface HeaderProps {
  text: string;
  showPrevButton?: boolean;
  toStart?: boolean;
}

export function Header({ text, showPrevButton, toStart }: HeaderProps) {
  return (
    <header className="text-base-800 flex h-14 w-full max-w-sm backdrop-blur-lg">
      {showPrevButton && <PrevButton toStart={toStart} />}
      <div className="absolute left-1/2 flex h-full -translate-x-1/2 items-center">
        <Title text={text} />
      </div>
    </header>
  );
}
