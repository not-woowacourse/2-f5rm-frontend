'use client';

import { useRouter } from 'next/navigation';

import { currentStorage, validateStorage } from '@/lib/storage';

export function Confirm() {
  const isStorageValid = validateStorage();
  const storage = currentStorage();

  const router = useRouter();

  if (isStorageValid === false) {
    router.push('/');
  }

  return <div>{JSON.stringify(storage)}</div>;
}
