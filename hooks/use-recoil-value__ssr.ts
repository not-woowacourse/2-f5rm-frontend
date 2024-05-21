import { useEffect, useState } from 'react';

import { type RecoilState, useRecoilState, useRecoilValue } from 'recoil';

/**
 * @reference https://github.com/polemius/recoil-persist#server-side-rendering
 */
const useRecoilState__Ssr = <T>(
  atom: RecoilState<T>,
  defaultValue: T | null = null,
) => {
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useRecoilState<T>(atom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted ? value : defaultValue, setValue] as const;
};

const useRecoilValue__Ssr = <T>(
  atom: RecoilState<T>,
  defaultValue: T | null = null,
) => {
  const [isMounted, setIsMounted] = useState(false);
  const value = useRecoilValue<T>(atom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? value : defaultValue;
};

export { useRecoilState__Ssr, useRecoilValue__Ssr };
