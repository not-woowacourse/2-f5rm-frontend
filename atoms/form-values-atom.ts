import { type DeepPartial } from 'react-hook-form';

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { type SurveyFormValues } from '@/constants/form';
import { RECOIL_ATOM_KEYS } from '@/constants/recoil-atom-keys';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: RECOIL_ATOM_KEYS.FORM_VALUES,
  storage: sessionStorage,
});

/**
 * @note
 * - 퍼널 중간에 사용자가 새로고침을 하더라도 입력한 데이터를 유지하기 위해 사용합니다.
 * - 추가로, 비정상적인 퍼널 스텝 이동이 발생했을 때 적절한 스텝으로 리다이렉트하기 위해 사용합니다.
 */
const surveyFormValuesAtom = atom<DeepPartial<SurveyFormValues> | undefined>({
  key: RECOIL_ATOM_KEYS.FORM_VALUES,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export { surveyFormValuesAtom };
