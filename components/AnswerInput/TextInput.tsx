import type { UseFormSetValue } from 'react-hook-form';

import { Input } from '@/components/ui/input';

interface TextInputProps {
  name: string;
  type: string;
  setValue: UseFormSetValue<any>;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
}

export function TextInput({
  name,
  type,
  setValue,
  placeholder,
  prefix,
  suffix,
  error,
}: TextInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const result =
      type === 'number' && value !== undefined ? parseInt(value) : value;

    setValue(name, result, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="mx-4">
      <div className="m-1 min-h-5">
        {error && <p className=" text-right text-sm text-red-600">{error}</p>}
      </div>
      <div className="mt-1 flex items-center">
        {prefix && <span className="mr-2">{prefix}</span>}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          className={`form-input block w-full ${error ? 'border-red-500' : ''}`}
        />
        {suffix && <span className="ml-2">{suffix}</span>}
      </div>
    </div>
  );
}
