import { Forms } from '@/__generated__/Forms';
import { type CreateFormDto } from '@/__generated__/data-contracts';
import { HTTP_HEADERS } from '@/constants/http-headers';

const formsApiInstance = new Forms({
  baseURL: '/backend-api',
  headers: {
    [HTTP_HEADERS.CLIENT_NAME_KEY]: process.env.NEXT_PUBLIC_CLIENT_NAME,
  },
});

const axiosPostForm = async (createFormDto: CreateFormDto) => {
  if (!process.env.NEXT_PUBLIC_SCHEMA_SLUG) {
    throw new Error('NEXT_PUBLIC_SCHEMA_SLUG is not defined');
  }

  await formsApiInstance.formsControllerCreate(
    process.env.NEXT_PUBLIC_SCHEMA_SLUG,
    createFormDto,
  );
};

export { axiosPostForm, formsApiInstance };
