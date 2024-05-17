import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const noop = () => {};

/**
 * @note this is for z.enum
 * @reference https://github.com/colinhacks/zod/discussions/2125#discussioncomment-7452235
 */
const getValues = <T extends Record<string, any>>(obj: T) => {
  return Object.values(obj) as [(typeof obj)[keyof T]];
};

export { cn, getValues, noop };
