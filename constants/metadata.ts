import { type Schema } from 'zod';
import * as z from 'zod';

type Answer = {
  restrictions: Schema;
} & (
  | {
      type: 'text' | 'url' | 'email' | 'number' | 'datetime';
      label: string;
      placeholder: string;
      prefix?: string;
      suffix?: string;
    }
  | {
      type: 'select' | 'multiselect';
      options: string[];
    }
);

interface Item {
  id: string;
  question: string;
  description: string;
  answer: Answer;
}

interface Metadata {
  title: string;
  description: string;
  items: Item[];
}

export const metadata: Metadata = {
  title: '설문',
  description: '테스트 설문입니다.',
  items: [
    {
      id: 'a',
      question: '첫 번째 질문',
      description: '안녕하세요, 첫 번째 질문입니다.',
      answer: {
        type: 'url',
        label: '블로그 주소',
        placeholder: 'blog.te6.in',
        prefix: 'https://',
        restrictions: z.string().url('URL 형태가 맞는지 확인해주세요.'),
      },
    },
    {
      id: 'b',
      question: '두 번째 질문',
      description: '안녕하세요, 두 번째 질문입니다.',
      answer: {
        type: 'number',
        label: '나이',
        placeholder: '23',
        restrictions: z.number().min(10, '너무 어립니다.'),
      },
    },
  ],
};
