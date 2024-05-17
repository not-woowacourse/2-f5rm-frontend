import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOptionId = (index: number): `option-${number}` =>
  `option-${index}`;

export const getQuestionId = (index: number): `question-${number}` =>
  `question-${index}`;
