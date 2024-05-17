import type { ComponentPropsWithoutRef } from 'react';

import {
  CakeSlice,
  Carrot,
  CloudRain,
  Cookie,
  Croissant,
  Pizza,
  Popcorn,
  Snowflake,
  Sun,
} from 'lucide-react';
import { type Schema } from 'zod';
import * as z from 'zod';

import type { Checkbox, Selector, TextInput } from '@/components/ui';

type DefaultAnswer = {
  restrictions: Schema;
};

type TextInputAnswer = DefaultAnswer & {
  type: 'text' | 'url' | 'email' | 'number' | 'datetime';
  isArray?: boolean;
} & Pick<
    ComponentPropsWithoutRef<typeof TextInput>,
    'title' | 'placeholder' | 'prefix' | 'suffix'
  >;

type SelectAnswer = DefaultAnswer & {
  type: 'select';
} & Pick<ComponentPropsWithoutRef<typeof Selector>, 'items' | 'title'>;

type MultiSelectAnswer = {
  type: 'multiselect';
  options: (Pick<
    ComponentPropsWithoutRef<typeof Checkbox>,
    'title' | 'description'
  > & { required?: boolean })[];
};

type Answer = TextInputAnswer | SelectAnswer | MultiSelectAnswer;

interface Item {
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
  title: '라이프스타일 및 취향 설문조사',
  description: `이 설문조사는 귀하의 일상생활 패턴, 개인적인 취향 및 선호도를 알아보기 위한 것입니다.
     설문 결과는 향후 제품 및 서비스 개발에 활용될 예정이므로, 가능한 한 솔직하고 상세한 답변을 부탁드립니다.
     본 설문은 전체 4개 문항으로 구성되어 있으며, 작성에 소요되는 시간은 약 5분 내외입니다.
     귀하의 소중한 의견이 반영될 수 있도록 성실한 답변 해주시기 바랍니다.
     응답해 주셔서 대단히 감사합니다.`,
  items: [
    // 0
    {
      question: '나이',
      description: '안녕하세요, 나이가 어떻게 되시나요?',
      answer: {
        type: 'number',
        title: '나이',
        prefix: '만',
        suffix: '세',
        placeholder: '23',
        restrictions: z
          .number({
            errorMap: (issue, ctx) => {
              // handles NaN (empty input)
              if (issue.code === z.ZodIssueCode.invalid_type)
                return { message: '나이를 입력해주세요.' };
              else return { message: ctx.defaultError };
            },
          })
          .min(10, '너무 어립니다.')
          .max(200, '너무 많습니다.'),
      },
    },
    // 1
    {
      question: '날씨',
      description: '가장 선호하는 날씨를 선택해주세요.',
      answer: {
        type: 'select',
        title: '날씨',
        items: [
          { value: '맑은 날', icon: Sun },
          { value: '비 오는 날', icon: CloudRain },
          { value: '눈 오는 날', icon: Snowflake },
        ],
        restrictions: z
          .enum(['맑은 날', '비 오는 날', '눈 오는 날'])
          .optional(),
      },
    },
    // 2
    {
      question: '약관 동의',
      description: '약관에 동의해보세요.',
      answer: {
        type: 'multiselect',
        options: [
          { title: '이용 약관 동의', required: true },
          {
            title: '개인 정보 처리 방침 동의',
            description: '당신의 개인정보를 판매합니다.',
          },
        ],
      },
    },
    // 3
    {
      question: '음식',
      description: `가장 좋아하는 음식을 선택해주세요.
                    피자: 밀가루 반죽 위에 토마토 소스, 치즈, 다양한 토핑이 얹혀 있는 이탈리아 요리입니다. 퍼지고 둥근 모양이 특징입니다.
                    크로아상: 프랑스 전통 페이스트리로, 버터를 넣은 반죽을 여러 겹으로 만들어 구운 것입니다. 바삭바삭하고 부드러운 식감이 특징입니다.
                    케이크: 밀가루, 설탕, 달걀, 버터 등을 주재료로 한 반죽을 구워 만든 디저트 종류입니다. 모양, 맛, 크기가 다양합니다.
                    팝콘: 옥수수 알갱이를 열로 팽창시켜 만든 과자입니다. 폭신하고 바삭한 식감이 인기입니다.
                    쿠키: 밀가루 반죽에 다양한 재료를 넣고 구운 작은 과자입니다. 단것, 딱딱한 것, 부드러운 것 등 다양한 종류가 있습니다.
                    당근: 주황색의 뿌리 채소로, 단맛이 나며 비타민A가 풍부합니다. 생으로 먹거나 요리에 넣어 이용합니다.`,
      answer: {
        type: 'select',
        title: '음식',
        items: [
          { value: '피자', icon: Pizza },
          { value: '크로아상', icon: Croissant },
          { value: '케이크', icon: CakeSlice },
          { value: '팝콘', icon: Popcorn },
          { value: '쿠키', icon: Cookie },
          { value: '당근', icon: Carrot },
        ],
        restrictions: z.enum(['피자', '케이크', '쿠키'], {
          errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value)
              return { message: '허락되지 않은 음식입니다.' };
            else return { message: ctx.defaultError };
          },
        }),
      },
    },
  ],
};
