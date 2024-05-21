'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function Completed() {
  const router = useRouter();
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-red-50 p-4 text-center">
      <button
        className={cn(
          'flex flex-col items-center justify-center gap-2',
          'hover:scale-110',
          'active:scale-100',
          'transition-transform',
        )}
        onClick={() => {
          router.push('/');
        }}
      >
        <p className="text-8xl">🥳</p>
        <p className="text-xl">Completed!</p>
      </button>
    </div>
  );
}
