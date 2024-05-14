import { type InferredFormSchema } from '@/app/page';

type AxiosPostFormDto = {
  data: InferredFormSchema;
};

type AxiosPostFormResponseDto = {
  /* not my concern */
};

export type { AxiosPostFormDto, AxiosPostFormResponseDto };
