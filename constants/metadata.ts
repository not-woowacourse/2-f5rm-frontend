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
import { z } from 'zod';

import type { Metadata } from '@/constants/types';
import { validateDuplicates } from '@/lib/utils';

const items: Metadata['items'] = [
  {
    id: 'terms',
    question: '약관 동의',
    description: '설문 시작에 앞서, 약관에 동의해주세요.',
    answer: {
      type: 'multiselect',
      options: [
        {
          id: 'terms',
          title: '설문 조사 내용 활용에 대한 동의',
          required: true,
        },
        {
          id: 'privacy',
          title: '개인 정보 처리 방침 동의',
          description: '당신의 개인정보를 판매합니다.',
        },
      ],
    },
  },
  {
    id: 'optional-terms',
    question: '선택 약관 동의',
    description: '선택 약관에 동의해보세요.',
    answer: {
      type: 'multiselect',
      options: [
        {
          id: 'term-1',
          title: '모든 동물의 소리를 완벽하게 흉내 내겠습니다.',
          description:
            '고양이 울음소리부터 코끼리 배꼽구멍소리까지 모든 동물 소리를 정확히 따라 해야 하겠습니다.',
        },
        {
          id: 'term-2',
          title: '달에 사는 우주인의 방문을 환영하겠습니다.',
          description:
            '응답자의 집에 불시에 방문하는 외계인을 거부할 수 없음에 동의하며, 최대한 친절하게 대해야 하겠습니다.',
        },
        {
          id: 'term-3',
          title: '고대 이집트 피라미드 건축 기술을 완전히 이해하겠습니다.',
          description:
            '피라미드 건축 원리와 기하학적 원리를 완벽히 이해하지 못하면 설문에 참여할 수 없음에 동의합니다.',
        },
        {
          id: 'term-4',
          title: '태양계 9개 행성의 위성 이름을 모두 외우겠습니다.',
          description:
            '명왕성의 5개 위성을 포함해 태양계 행성 위성 이름을 하나도 빼먹지 말고 전부 암기하겠습니다.',
        },
      ],
    },
  },
  {
    id: 'age',
    question: '나이',
    description: '나이가 어떻게 되시나요? 만 나이로 응답해주세요.',
    answer: {
      type: 'number',
      title: '나이',
      prefix: '만',
      suffix: '세',
      placeholder: '23',
      restrictions: z
        .number({
          errorMap: ({ code }, { defaultError }) => {
            switch (code) {
              case z.ZodIssueCode.invalid_type:
                return { message: '나이를 입력해주세요.' };
              default:
                return { message: defaultError };
            }
          },
        })
        .min(10, '너무 어려 설문에 참여할 수 없습니다.')
        .max(200, '너무 많아 설문에 참여할 수 없습니다.'),
    },
  },
  {
    id: 'weather',
    question: '좋아하는 날씨',
    description:
      '가장 선호하는 날씨를 선택해주세요.\n선호하는 날씨가 없는 경우 선택하지 않으셔도 됩니다.',
    answer: {
      type: 'select',
      title: '날씨',
      items: [
        { value: '맑은 날', icon: Sun },
        { value: '비 오는 날', icon: CloudRain },
        { value: '눈 오는 날', icon: Snowflake },
      ],
      restrictions: z.enum(['맑은 날', '비 오는 날', '눈 오는 날']).nullish(),
    },
  },
  {
    id: 'food',
    question: '최애 음식',
    description: `파티에 가지고 갈 음식을 선택해주세요.
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
        errorMap: ({ code }, { defaultError }) => {
          switch (code) {
            case z.ZodIssueCode.invalid_type:
              return { message: '음식을 선택해주세요.' };
            case z.ZodIssueCode.invalid_enum_value:
              return { message: '이 음식은 가지고 갈 수 없습니다.' };
            default:
              return { message: defaultError };
          }
        },
      }),
    },
  },
  {
    id: 'invitations',
    question: '친구 초대',
    description: '초대할 친구들의 이메일 주소를 입력해주세요.',
    answer: {
      type: 'email',
      isArray: true,
      placeholder: 'me@example.com',
      title: '이메일 주소',
      restrictions: z
        .array(
          z.record(
            z.literal('invitations'),
            z.string().email('이메일 주소가 올바른지 확인해주세요.'),
          ),
        )
        .min(2, '최소 두 명을 초대해야 합니다.')
        .max(5, '최대 다섯 명까지 초대할 수 있습니다.')
        .refine(validateDuplicates, '중복된 이메일 주소가 있습니다.'),
      // if skippable, mark .nullish()
    },
  },
  {
    id: 'songs',
    question: '음악 고르기',
    description:
      '친구들과 함께 듣고 싶은 음악을 알려주세요.\n없다면 적지 않아도 괜찮습니다.',
    answer: {
      type: 'text',
      isArray: true,
      placeholder: '애국가',
      title: '제목',
      restrictions: z
        .array(z.record(z.literal('songs'), z.string()))
        .max(5, '최대 다섯 개까지 입력할 수 있습니다.')
        .nullish(),
    },
  },
];

export const metadata: Metadata = {
  title: '라이프스타일 및 취향 설문조사',
  description: `이 설문조사는 귀하의 일상생활 패턴, 개인적인 취향 및 선호도를 알아보기 위한 것입니다.
     설문 결과는 향후 제품 및 서비스 개발에 활용될 예정이므로, 가능한 한 솔직하고 상세한 답변을 부탁드립니다.
     본 설문은 전체 ${items.length}개 문항으로 구성되어 있으며, 작성에 소요되는 시간은 약 ${(items.length / 2).toFixed(0)}분 내외입니다.
     귀하의 소중한 의견이 반영될 수 있도록 성실한 답변 해주시기 바랍니다.
     응답해 주셔서 대단히 감사합니다.`,
  items,
};
