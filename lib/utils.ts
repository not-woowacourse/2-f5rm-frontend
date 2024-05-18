import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateDuplicates(items: Partial<Record<string, string>>[]) {
  const set = new Set(items.map((item) => Object.values(item)[0]));

  return set.size === items.length;
}
