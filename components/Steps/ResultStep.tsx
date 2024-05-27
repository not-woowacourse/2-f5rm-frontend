'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { HomeIcon, RotateCcw } from 'lucide-react';

import { ButtonContainer, MoveButton } from '@/components/Button/MoveButton';
import { Header } from '@/components/Header';
import { Paragraph, TextContainer, Title } from '@/components/Text';
import { useToast } from '@/components/ui/use-toast';
import { API_URL, CLIENT_NAME, FORM_SLUG } from '@/constants/constants';
import { metadata } from '@/constants/metadata';
import { type FormAnswer, type Recommendation } from '@/constants/types';
import { determineAgeGroup } from '@/lib/utils';

function generateRecommendation(answers: FormAnswer[]): Recommendation {
  let gender = '';
  let age = 0;
  let frequency = 0;
  let genre: string[] = [];
  let storyType = '';
  let worldSetting = '';
  let endingType = '';
  let artStyle: string[] = [];
  let payable = '';

  answers.forEach((answer) => {
    switch (answer.question.key) {
      case 'gender':
        gender = answer.stringValue ?? '';
        break;
      case 'age':
        age = answer.integerValue ?? 0;
        break;
      case 'frequency':
        frequency = answer.integerValue ?? 0;
        break;
      case 'genre':
        genre = answer.stringValue ? JSON.parse(answer.stringValue) : [];
        break;
      case 'story_type':
        storyType = answer.stringValue ?? '';
        break;
      case 'world_setting':
        worldSetting = answer.stringValue ?? '';
        break;
      case 'ending_type':
        endingType = answer.stringValue ?? '';
        break;
      case 'art_style':
        artStyle = answer.stringValue ? JSON.parse(answer.stringValue) : [];
        break;
      case 'payable':
        payable = answer.stringValue ?? '';
        break;
      default:
        break;
    }
  });
  const ageGroup = determineAgeGroup(age);
  const title = 'code 404 : 찾을 수 없는 용사';
  const description = `이 웹툰은 ${ageGroup}에게 적합합니다.
    장르는 ${genre.join(', ')}이며 주로 ${gender}에게 인기가 많습니다.
    ${storyType} 있는 스토리와 ${worldSetting === '좋아함' ? '방대한 세계관을' : '직관적인 세계관을'} 가지고 있고
    결말은 ${endingType}로 끝납니다.
    또한, ${artStyle.join(', ')} 그림체를 가지고 있으며, 
    ${payable === '예' ? '유료 결제를 통해 즐길 수 있습니다.' : '무료로 즐길 수 있습니다.'}
    ${frequency}개의 웹툰을 일주일에 감상하는 당신에게 안성맞춤입니다.
  `;

  return {
    title,
    description,
  };
}

export function ResultStep() {
  const { toast } = useToast();
  const query = useSearchParams();
  const id = query.get('id');

  const [recommendation, setRecommendation] = useState<Recommendation>();

  if (id === undefined) {
    throw new Error(`폼 ID가 없습니다.`);
  }

  const { mutate, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/forms/${FORM_SLUG}/${id}`, {
        method: 'GET',
        headers: {
          'client-name': CLIENT_NAME,
          'Content-Type': 'application/json',
        },
      });

      switch (response.status) {
        case 200:
          return response.json();
        case 401:
          throw new Error(`${CLIENT_NAME} 클라이언트를 찾을 수 없습니다.`);
        case 404:
          throw new Error(
            `${id} 이름과 ${FORM_SLUG} 스키마로 등록된 폼이 없습니다.`,
          );
        default:
          throw new Error(error?.message ?? '오류가 발생했습니다.');
      }
    },
    onError: () => {
      toast({
        title: '설문 결과를 찾을 수 없습니다',
        style: {
          borderRadius: '8px',
          background: '#ffcccc',
          color: '#ff0000',
        },
      });
    },
    onSuccess: (data) => {
      const { answers } = data;
      const result = generateRecommendation(answers);
      setRecommendation(result);
    },
  });

  useEffect(() => {
    mutate();
  }, [id, mutate]);

  return (
    <>
      <Header text={metadata.title} />
      <TextContainer className="flex-grow">
        <Title text="추천 결과" />
        <Paragraph
          text={`
          당신의 취향에 맞는 추천 웹툰은 아래와 같습니다. 추천 결과에 만족하셨나요?\n
          설문에 참여해 주셔서 다시 한 번 감사드립니다. `}
        />
        <div className="mt-3 flex flex-grow flex-col items-center justify-center overflow-y-scroll rounded-xl bg-white py-3 scrollbar-hide">
          {recommendation === undefined ? (
            <RotateCcw />
          ) : (
            <TextContainer className="text-center scrollbar-hide">
              <Title
                text={
                  recommendation ? recommendation.title : 'No recommendation'
                }
              />
              <Paragraph text={recommendation.description} />
            </TextContainer>
          )}
        </div>
      </TextContainer>
      <ButtonContainer>
        <MoveButton name="홈으로 이동" icon={<HomeIcon />} />
      </ButtonContainer>
    </>
  );
}
