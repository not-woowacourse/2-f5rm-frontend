import { z } from 'zod';

import { LOCALSTORAGE_KEY } from '@/constants/constants';

export const currentStorage = () => {
  const storage = validateStorage();

  if (storage === false) {
    window.localStorage.removeItem(LOCALSTORAGE_KEY);
    return {};
  }

  return storage;
};

export const validateStorage = () => {
  const storage = window.localStorage.getItem(LOCALSTORAGE_KEY);

  const expectedSchema = z.record(
    z.string().startsWith('question-'),
    z.union([
      z.string(),
      z.number(),
      z.record(z.string().startsWith('option-'), z.boolean()),
    ]),
  );

  const parsed = storage ? JSON.parse(storage) : null;

  const result = expectedSchema.safeParse(parsed);

  return result.success ? result.data : false;
};
