import { useFormContext } from 'react-hook-form';

import { type RegisterSchemaType } from '@/app/(viewport)/form/page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Category } from '@/constants/categories';
import { IMAGES } from '@/constants/options';

export default function Step3() {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<RegisterSchemaType>();

  return (
    <section className="h-full">
      <Label className="flex flex-col gap-y-2">
        <div className="text-2xl">Q3.</div>
        <div className="text-xl">나랑 닮은 것을 골라주세요</div>
        <p className="font-extralight text-zinc-400">내가 닮은 동물은? 🐻‍❄️ </p>
      </Label>
      <div className="mt-10 grid grid-cols-2 gap-8 pb-8">
        {IMAGES.map((image) => (
          <button
            type="button"
            key={image.key}
            onClick={() => {
              setValue(Category.animal, image.key);
            }}
            className="transition-all hover:scale-110"
          >
            <Avatar
              className={`h-fit w-fit ${
                watch().animal === image.key
                  ? 'border-4 border-red-400 transition-all'
                  : ''
              }`}
            >
              <AvatarImage
                src={image.url}
                className="h-full w-full object-cover"
              />
              <AvatarFallback>{image.key}</AvatarFallback>
            </Avatar>
          </button>
        ))}
        {errors[Category.animal] && (
          <p className="text-sm text-red-500">{errors.animal.message}</p>
        )}
      </div>
    </section>
  );
}
