import { z } from 'zod';

import type { Metadata } from '@/constants/types';
import { InputType } from '@/constants/types';

const items: Metadata['items'] = [
  {
    id: 'gender',
    question: '성별',
    description: '성별을 선택해주세요.',
    answer: {
      type: 'select',
      items: [{ value: '남성' }, { value: '여성' }, { value: '기타' }],
      restrictions: z.enum(['남성', '여성', '기타']),
    },
  },
  {
    id: 'age',
    question: '나이',
    description: '나이가 어떻게 되시나요? 만 나이로 응답해주세요.',
    answer: {
      type: InputType.Number,
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
        .min(7, '너무 어려 설문에 참여할 수 없습니다.')
        .max(100, '나이가 너무 많아 설문에 참여할 수 없습니다.'),
    },
  },
  {
    id: 'frequency',
    question: '평소 웹툰을 많이 보나요? 일주일에 대략 몇 작품을 보나요?',
    description: '일주일에 보는 웹툰 작품 수를 숫자로 입력해주세요.',
    answer: {
      type: InputType.Number,
      placeholder: '3',
      suffix: '작품',
      restrictions: z
        .number({
          errorMap: ({ code }, { defaultError }) => {
            switch (code) {
              case z.ZodIssueCode.invalid_type:
                return { message: '웹툰 개수를 입력해주세요.' };
              default:
                return { message: defaultError };
            }
          },
        })
        .min(0, '0개 이상 입력해주세요.')
        .max(100, '100개 이하로 입력해주세요.'),
    },
  },
  {
    id: 'genre',
    question: '선호하는 장르',
    description:
      '선호하는 웹툰 장르를 선택해주세요. 여러 장르를 선택할 수 있습니다.',
    answer: {
      type: 'multiselect',
      options: [
        { id: 'romance', title: '로맨스' },
        { id: 'fantasy', title: '판타지' },
        { id: 'action', title: '액션' },
        { id: 'drama', title: '드라마' },
        { id: 'comedy', title: '코미디' },
        { id: 'horror', title: '호러' },
      ],
      restrictions: z
        .array(z.enum(['로맨스', '판타지', '액션', '드라마', '코미디', '호러']))
        .nonempty('최소 하나의 장르를 선택해주세요.'),
    },
  },
  {
    id: 'story_type',
    question: '스토리 유형',
    description: '선호하는 스토리 유형을 선택해주세요.',
    answer: {
      type: 'select',
      items: [
        { value: '대중성' },
        { value: '독창성' },
        { value: '재미' },
        { value: '감동' },
      ],
      restrictions: z.enum(['대중성', '독창성', '재미', '감동']),
    },
  },
  {
    id: 'world_setting',
    question: '방대한 세계관에 대한 호불호',
    description: '방대한 세계관을 선호하는지 선택해주세요.',
    answer: {
      type: 'select',
      items: [{ value: '좋아함' }, { value: '상관없음' }, { value: '싫어함' }],
      restrictions: z.enum(['좋아함', '상관없음', '싫어함']),
    },
  },
  {
    id: 'ending_type',
    question: '선호하는 결말 유형',
    description: '선호하는 결말 유형을 선택해주세요.',
    answer: {
      type: 'select',
      items: [
        { value: '해피엔딩' },
        { value: '배드엔딩' },
        { value: '열린 결말' },
        { value: '닫힌 결말' },
      ],
      restrictions: z.enum(['해피엔딩', '배드엔딩', '열린 결말', '닫힌 결말']),
    },
  },
  {
    id: 'art_style',
    question: '선호하는 그림체',
    description:
      '아래 그림체 중 선호하는 스타일을 선택해주세요. 여러 그림체를 선택할 수 있습니다.',
    answer: {
      type: 'multiselect',
      options: [
        { id: 'realistic', title: '사실적인' },
        { id: 'cartoon', title: '카툰 스타일' },
        { id: 'anime', title: '애니메이션 스타일' },
        { id: 'minimalist', title: '화려한 스타일' },
      ],
      restrictions: z
        .array(
          z.enum([
            '사실적인',
            '카툰 스타일',
            '애니메이션 스타일',
            '화려한 스타일',
          ]),
        )
        .nonempty('최소 하나의 그림체를 선택해주세요.'),
    },
  },
  {
    id: 'payable',
    question: '유료 결제 용의',
    description: '유료 결제 용의가 있나요?',
    answer: {
      type: 'select',
      items: [{ value: '예' }, { value: '아니오' }],
      restrictions: z.enum(['예', '아니오']),
    },
  },
  {
    id: 'email',
    question: '결과를 이메일로 받기',
    description: '원하시면 결과를 이메일로 보내드립니다.',
    answer: {
      type: InputType.Email,
      placeholder: 'me@example.com',
      restrictions: z
        .string()
        .email('올바른 이메일 주소를 입력해주세요.')
        .optional(),
    },
  },
];

export const metadata: Metadata = {
  title: '내 취향에 맞는 웹툰은?',
  description: `이 설문조사는 귀하의 웹툰 취향을 파악하여 맞춤 추천을 제공하기 위한 것입니다.\n
       설문 결과는 향후 웹툰 추천 서비스 개발에 활용될 예정이므로, 가능한 한 솔직하고 상세한 답변을 부탁드립니다.
       설문은 전체 ${items.length}개 문항으로 구성되어 있으며, 작성에 소요되는 시간은 약 ${(items.length / 2).toFixed(0)}분 내외입니다.`,
  items,
};
