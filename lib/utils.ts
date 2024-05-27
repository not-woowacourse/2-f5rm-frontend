import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function determineAgeGroup(age: number): string {
  switch (Math.floor(age / 10)) {
    case 1:
      return '10대';
    case 2:
      return '20대';
    case 3:
      return '30대';
    case 4:
      return '40대';
    case 5:
      return '50대';
    case 6:
      return '60대';
    default:
      return age < 10 ? '10대 미만' : '70대 이상';
  }
}
