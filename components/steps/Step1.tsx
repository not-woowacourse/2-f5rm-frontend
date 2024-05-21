import { useFormContext } from 'react-hook-form';

import { type RegisterSchemaType } from '@/app/(viewport)/form/page';
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
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            MBTI
          </Label>
          <Input
            id={Category.mbti}
            {...register(Category.mbti)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.mbti && (
            <p className="text-sm text-red-500">{errors.mbti.message}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            이름
          </Label>
          <Input
            id={Category.name}
            {...register(Category.name)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors[Category.name] && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일
          </Label>
          <Input
            id="email"
            {...register(Category.email)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors[Category.email] && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            성별
          </Label>

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
