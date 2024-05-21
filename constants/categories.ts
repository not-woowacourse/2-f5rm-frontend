export enum Category {
  mbti = 'mbti',
  name = 'name',
  gender = 'gender',
  email = 'email',
  instagramId = 'instagramId',
  age = 'age',
  type = 'type',
  animal = 'animal',
  situation = 'situation',
}
export const BasicInformationCategories = [
  Category.mbti,
  Category.name,
  Category.email,
  Category.gender,
];
export const SelfPromotionCategories = [Category.animal];
export const BalanceGameCategories = [Category.situation];

export enum ErrorMessages {
  mbti = '내 성격을 알려주세요.',
  name = '이름을 입력해주세요.',
  gender = '성별을 선택해주세요.',
  email = '매칭 결과 안내를 위해 필요해요.',
  animal = '하나를 선택해주세요.',
  situation = '모든 선택지를 선택해주세요 😤',
}
