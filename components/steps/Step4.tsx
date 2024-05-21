import { useFormContext } from 'react-hook-form';

import { type RegisterSchemaType } from '@/app/(viewport)/form/page';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Category } from '@/constants/categories';
import { SCENARIOS } from '@/constants/options';

export default function Step4() {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterSchemaType>();
  return (
    <section className="h-full">
      <Label className="flex flex-col gap-y-2">
        <div className="text-2xl">Q4.</div>
        <div className="text-xl">밸런스 게임!</div>
        <p className="font-extralight text-zinc-400">
          나와 생각이 잘 맞는 사람을 찾을 수 있어요 🤓
        </p>
      </Label>
      <ul className="mt-10 flex h-full flex-col justify-center gap-8">
        {SCENARIOS.map((scenario, index) => (
          <li key={index}>
            <Label
              htmlFor="1"
              className="block text-lg font-medium text-gray-700"
            >
              {index + 1}. {scenario[0]} vs. {scenario[1]}
            </Label>
            <section className="grid grid-cols-2 gap-x-3 p-2 ">
              <Button
                type="button"
                variant={
                  getValues().situation[index]?.choice === 1
                    ? 'default'
                    : 'outline'
                }
                onClick={() => {
                  const updatedSituation = getValues().situation.map((item) => {
                    if (item.scenario === index) {
                      return {
                        ...item,
                        choice: 1,
                      };
                    }
                    return item;
                  });

                  setValue('situation', updatedSituation);
                }}
              >
                {scenario[0]}
              </Button>
              <Button
                type="button"
                variant={
                  getValues().situation[index]?.choice === 2
                    ? 'default'
                    : 'outline'
                }
                onClick={() => {
                  const updatedSituation = getValues().situation.map((item) => {
                    if (item.scenario === index) {
                      return {
                        ...item,
                        choice: 2,
                      };
                    }
                    return item;
                  });

                  setValue('situation', updatedSituation);
                }}
              >
                {scenario[1]}
              </Button>
            </section>
          </li>
        ))}
      </ul>
      {errors[Category.situation] && (
        <p className="text-sm text-red-500">{errors.situation.message}</p>
      )}
    </section>
  );
}
