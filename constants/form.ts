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

export { FORM_ID, FORM_NAME };
