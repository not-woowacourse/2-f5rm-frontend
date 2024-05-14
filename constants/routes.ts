const ROUTES = {
  ROOT: '/',
} as const;

const API_ROUTES = {
  FORMS: `/forms/${process.env.NEXT_PUBLIC_SCHEMA_ID}`,
} as const;

export { API_ROUTES, ROUTES };
