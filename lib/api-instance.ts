import { Forms } from '@/__generated__/Forms';
import { HTTP_HEADERS } from '@/constants/http-headers';

const formsApiInstance = new Forms({
  baseURL: '/backend-api',
  headers: {
    [HTTP_HEADERS.CLIENT_NAME_KEY]: process.env.NEXT_PUBLIC_CLIENT_NAME,
  },
});

export { formsApiInstance };
