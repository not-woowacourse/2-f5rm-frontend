import { useFormContext } from 'react-hook-form';

import {
  RegisterSchema,
  type RegisterSchemaType,
} from '@/app/(viewport)/form/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/constants/categories';
import { GENDERS } from '@/constants/options';

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterSchemaType>();

  return (
    <section className="h-full">
      <Label className="flex flex-col gap-y-2">
        <div className="text-2xl">Q1.</div>
        <div className="text-xl">기본 정보를 입력해주세요</div>
        <p className="font-extralight text-zinc-400">
          매칭을 위한 필수 정보입니다 😀
        </p>
      </Label>
      <div className="flex h-full flex-col justify-center gap-y-4">
        {/* mbti */}
        <div>
          <div className="flex gap-x-1">
            <Label
              className="block text-sm font-medium text-gray-700"
              aria-required
            >
              MBTI
            </Label>
            {!RegisterSchema.shape[Category.mbti].isOptional() && (
              <span className="text-red-600">*</span>
            )}
          </div>
          <Input
            id={Category.mbti}
            {...register(Category.mbti)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.mbti && (
            <p className="text-sm text-red-500">{errors.mbti.message}</p>
          )}
        </div>

        {/* 이름 */}
        <div>
          <div className="flex gap-x-1">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </Label>
            {!RegisterSchema.shape[Category.name].isOptional() && (
              <span className="text-red-600">*</span>
            )}
          </div>
          <Input
            id={Category.name}
            {...register(Category.name)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors[Category.name] && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <div className="flex gap-x-1">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </Label>
            {!RegisterSchema.shape[Category.email].isOptional() && (
              <span className="text-red-600">*</span>
            )}
          </div>
          <Input
            id="email"
            {...register(Category.email)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors[Category.email] && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* 성별 */}
        <div>
          <div className="flex gap-x-1">
            <Label className="block text-sm font-medium text-gray-700">
              성별
            </Label>
            {!RegisterSchema.shape[Category.gender].isOptional() && (
              <span className="text-red-600">*</span>
            )}
          </div>
          <select
            id={Category.gender}
            {...register(Category.gender)}
            className="mt-1 block h-10 w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {GENDERS.map((option) => (
              <option
                key={option}
                value={option}
                className="p-2 text-lg text-gray-700"
              >
                {option}
              </option>
            ))}
          </select>
          {errors[Category.gender] && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
