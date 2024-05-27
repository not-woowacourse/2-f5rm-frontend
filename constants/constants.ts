export const STEP_SEARCHPARAM_KEY = 'step';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
export const FORM_SLUG = process.env.NEXT_PUBLIC_FORM_SLUG ?? 'slug-example';
export const CLIENT_NAME =
  process.env.NEXT_PUBLIC_CLIENT_NAME ?? 'client-example';

export const DEFAULT_PATHNAME = process.env.NEXT_PUBLIC_DEFAULT_PATHNAME ?? '/';

export const slug = {
  slug: FORM_SLUG,
  questions: [
    {
      key: 'gender',
    },
    {
      key: 'age',
      type: 'integer',
    },
    {
      key: 'frequency',
      type: 'integer',
    },
    {
      key: 'genre',
      isArray: true,
    },
    {
      key: 'story_type',
    },
    {
      key: 'world_setting',
    },
    {
      key: 'ending_type',
    },
    {
      key: 'art_style',
      isArray: true,
    },
    {
      key: 'payable',
    },
    {
      key: 'email',
      type: 'email',
      isOptional: true,
    },
  ],
};
