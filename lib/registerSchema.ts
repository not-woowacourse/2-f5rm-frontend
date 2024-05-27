import * as z from 'zod';

import { ErrorMessages } from '@/constants/categories';

export const RegisterSchema = z.object({
  mbti: z.string().min(1, { message: ErrorMessages.mbti }),
  name: z.string().min(1, { message: ErrorMessages.name }),
  gender: z.string().min(1, { message: ErrorMessages.gender }),
  email: z.string().email(ErrorMessages.email),
  instagramId: z.string(),
  age: z.coerce
    .number()
    .min(20, { message: ErrorMessages.age })
    .max(100)
    .optional(),
  type: z.string().optional(),
  animal: z.string().min(1, { message: ErrorMessages.animal }),
  situation: z
    .array(
      z.object({
        scenario: z.number(),
        choice: z.number(),
      }),
    )
    .length(4),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
