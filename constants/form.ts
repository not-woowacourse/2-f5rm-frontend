import z from 'zod';

import { getValues } from '@/lib/utils';

/**
 * @note Enum을 삭제하였습니다.
 *
 * Enum은 JavaScript에 존재하지 않습니다.
 * TypeScript 컴파일러는 IIFE(즉시 실행 함수)를 포함한 코드를 생성합니다.
 * 그런데 Rollup과 같은 번들러는 IIFE를 '사용하지 않는 코드'라고 판단할 수 없어서 Tree-shaking이 되지 않습니다.
 * 결국 Enum을 import하고 실제로는 사용하지 않더라도 최종 번들에는 포함되는 것입니다.
 * @reference https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking
 */
const GENDER = {
  FEMALE: 'female',
  MALE: 'male',
  ETC: 'etc',
} as const;

const MBTI = {
  INTJ: 'INTJ',
  INTP: 'INTP',
  ENTJ: 'ENTJ',
  ENTP: 'ENTP',
  INFJ: 'INFJ',
  INFP: 'INFP',
  ENFJ: 'ENFJ',
  ENFP: 'ENFP',
  ISTJ: 'ISTJ',
  ISFJ: 'ISFJ',
  ESTJ: 'ESTJ',
  ESFJ: 'ESFJ',
  ISTP: 'ISTP',
  ISFP: 'ISFP',
  ESTP: 'ESTP',
  ESFP: 'ESFP',
} as const;

const MOST_IMPORTANT_VALUE = {
  MONEY: 'money',
  FAMILY: 'family',
  FAME: 'fame',
  CAREER: 'career',
  ETC: 'etc',
} as const;

/**
 * @note 최장수인의 나이는 122세입니다. 죄송합니다.
 * @reference https://ko.wikipedia.org/wiki/최장수인
 */
const OLDEST_PERSON_AGE = 122;

const formSchema = z.object({
  age: z.coerce.number().int().positive().lte(OLDEST_PERSON_AGE),
  gender: z.enum(getValues(GENDER)),
  mbti: z.enum(getValues(MBTI)),
  childhoodDream: z.string().min(1),
  mostImportantValue: z.enum(getValues(MOST_IMPORTANT_VALUE)),
  lifeSatisfaction: z.coerce.number().int().gte(1).lte(10),
  email: z.string().email().optional(),
});

/**
 * @note formSchema의 key와 일치해야 합니다.
 */
const FORM_NAME = {
  AGE: 'age',
  GENDER: 'gender',
  MBTI: 'mbti',
  CHILDHOOD_DREAM: 'childhoodDream',
  MOST_IMPORTANT_VALUE: 'mostImportantValue',
  LIFE_SATISFACTION: 'lifeSatisfaction',
  EMAIL: 'email',
} as const;

const FORM_ID = {
  AGE: 'age',
  GENDER: 'gender',
  MBTI: 'mbti',
  CHILDHOOD_DREAM: 'childhood-dream',
  MOST_IMPORTANT_VALUE: 'most-important-value',
  LIFE_SATISFACTION: 'life-satisfaction',
  EMAIL: 'email',
} as const;

type FormValues = z.infer<typeof formSchema>;

export {
  FORM_ID,
  FORM_NAME,
  GENDER,
  MBTI,
  MOST_IMPORTANT_VALUE,
  formSchema,
  type FormValues,
};
