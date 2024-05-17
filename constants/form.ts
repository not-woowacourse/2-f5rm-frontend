const FORM_ID = {
  AGE: 'age',
  GENDER: 'gender',
  MBTI: 'mbti',
  CHILDHOOD_DREAM: 'childhood-dream',
  MOST_IMPORTANT_VALUE: 'most-important-value',
  LIFE_SATISFACTION: 'life-satisfaction',
  EMAIL: 'email',
} as const;

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

/**
 * @note Enum을 삭제하였습니다.
 *
 * Enum은 JavaScript에 존재하지 않습니다.
 * TypeScript 컴파일러는 IIFE(즉시 실행 함수)를 포함한 코드를 생성합니다.
 * 그런데 Rollup과 같은 번들러는 IIFE를 '사용하지 않는 코드'라고 판단할 수 없어서 Tree-shaking이 되지 않습니다.
 * 결국 Enum을 import하고 실제로는 사용하지 않더라도 최종 번들에는 포함되는 것입니다.
 * @reference https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking
 */
const Gender = {
  Female: 'female',
  Male: 'male',
  Etc: 'etc',
} as const;

const Mbti = {
  Intj: 'INTJ',
  Intp: 'INTP',
  Entj: 'ENTJ',
  Entp: 'ENTP',
  Infj: 'INFJ',
  Infp: 'INFP',
  Enfj: 'ENFJ',
  Enfp: 'ENFP',
  Istj: 'ISTJ',
  Isfj: 'ISFJ',
  Estj: 'ESTJ',
  Esfj: 'ESFJ',
  Istp: 'ISTP',
  Isfp: 'ISFP',
  Estp: 'ESTP',
  Esfp: 'ESFP',
} as const;

const MostImportantValue = {
  Money: 'money',
  Family: 'family',
  Fame: 'fame',
  Career: 'career',
  Etc: 'etc',
} as const;

export { FORM_ID, FORM_NAME, Gender, Mbti, MostImportantValue };
