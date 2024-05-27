import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { ItemValue } from '@/constants/types';

interface SelectorProps {
  name: string;
  setValue: UseFormSetValue<any>;
  items: Array<ItemValue>;
  error?: string;
}

export function Selector({ name, setValue, items, error }: SelectorProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
    setSelectedValue(value);
  };

  return (
    <div className="mx-4">
      <div className="m-1 min-h-5">
        {error && <p className=" text-right text-sm text-red-600">{error}</p>}
      </div>
      <div className={`mx-3 grid gap-3.5`}>
        {items.map((item) => (
          <Button
            key={`${name}-${item.value}`}
            variant="outline"
            className={`w-full ${selectedValue === item.value ? 'border-[2.5px] border-green-600' : ''}`}
            onClick={() => handleButtonClick(item.value)}
          >
            {item.value}
          </Button>
        ))}
      </div>
    </div>
  );
}
