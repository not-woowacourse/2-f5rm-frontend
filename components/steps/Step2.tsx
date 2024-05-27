import { useFormContext } from 'react-hook-form';

import { type RegisterSchemaType } from '@/app/(viewport)/form/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/constants/categories';

export default function Step2() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterSchemaType>();

  return (
    <section className="h-full">
      <Label className="flex flex-col gap-y-2">
        <div className="text-2xl">Q2.</div>
        <div className="text-xl">추가 정보를 입력해주세요</div>
        <p className="font-extralight text-zinc-400">
          더 자세한 정보를 입력하고 나에게 딱 맞는 친구를 추천받아요 😍
        </p>
      </Label>
      <div className="flex h-full flex-col justify-center gap-y-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            인스타그램 아이디
          </Label>
          <Input
            id={Category.instagramId}
            {...register(Category.instagramId)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors[Category.instagramId] && (
            <p className="text-sm text-red-500">{errors.instagramId.message}</p>
          )}
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            나이
          </Label>
          <Input
            type="number"
            id={Category.age}
            min={20}
            max={100}
            {...register(Category.age)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.age && (
            <p className="text-sm text-red-500">{errors.age.message}</p>
          )}
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            이상형
          </Label>
          <Input
            id={Category.type}
            {...register(Category.type)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </section>
  );
}
