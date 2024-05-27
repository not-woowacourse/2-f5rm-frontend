import { useState } from 'react';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { MultiSelectOption } from '@/constants/types';

interface MultiSelectorProps {
  name: string;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  items: MultiSelectOption[];
  error?: string;
}

export function MultiSelector({
  name,
  setValue,
  getValues,
  items,
  error,
}: MultiSelectorProps) {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    const currentValue = getValues(name);
    const currentValues =
      currentValue !== undefined
        ? Array.isArray(currentValue)
          ? currentValue
          : [currentValue]
        : [];
    const valueIndex = currentValues.indexOf(value);

    let updatedValues: string[] = [...currentValues];
    if (valueIndex === -1) {
      updatedValues.push(value);
    } else if (valueIndex === updatedValues.length) {
      updatedValues.pop();
    } else {
      [updatedValues[valueIndex], updatedValues[updatedValues.length - 1]] = [
        updatedValues[updatedValues.length - 1],
        updatedValues[valueIndex],
      ];
      updatedValues.pop();
    }
    setValue(name, updatedValues, { shouldValidate: true, shouldDirty: true });
    setSelectedValue(updatedValues);
  };

  return (
    <div className="mx-4">
      <div className="m-1 min-h-5">
        {error && <p className=" text-right text-sm text-red-600">{error}</p>}
      </div>
      <div className={`mx-3 grid gap-3.5`}>
        {items.map((item) => (
          <Button
            key={`${name}-${item.id}`}
            variant="outline"
            className={`w-full ${selectedValue.includes(item.title) ? 'border-[2.5px] border-green-600' : ''}`}
            onClick={() => handleButtonClick(item.title)}
          >
            {item.title}
            {item.description}
          </Button>
        ))}
      </div>
    </div>
  );
}
