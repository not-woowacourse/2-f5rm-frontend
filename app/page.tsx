'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

const RootPage = () => {
  const router = useRouter();
  return (
    <main
      className={cn(
        'h-screen w-screen',
        'flex flex-col items-center justify-center',
        'bg-neutral-50',
      )}
    >
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-center gap-y-10 bg-blue-50">
        <div>
          <button
            className={cn(
              'flex flex-col items-center justify-center gap-2',
              'hover:scale-110',
              'active:scale-100',
              'transition-transform',
            )}
            onClick={() => {
              router.push('/form');
            }}
          >
            <p className="text-8xl">👫</p>
            <p className="text-xl">Click Here!</p>
          </button>
        </div>
        <p className="px-4 text-center">
          일일호프에서 남녀 매칭을 위한 특별한 이벤트가 열립니다 😀
          <br />
          서로 잘 어울리는 사람을 만나 즐거운 시간을 보낼 수 있는 절호의 기회 🎉
          <br />
          나의 프로필을 입력하고 이성을 추천받아보세요 ❤️
        </p>
      </div>
    </main>
  );
};

export default RootPage;
