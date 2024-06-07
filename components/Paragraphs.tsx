import { cn } from '@/lib/utils';

interface ParagraphsProps {
  text: string;
  className?: string;
}

export function Paragraphs({ text, className }: ParagraphsProps) {
  return text.split('\n').map((paragrpah, index) => (
    <p key={index} className={cn(className, 'text-balance')}>
      {paragrpah}
    </p>
  ));
}
