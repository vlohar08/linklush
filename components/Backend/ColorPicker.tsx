import { ChangeEvent } from "react";

type ColorPicker = {
  title: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ColorPicker = ({
  title,
  required = false,
  value,
  onChange,
}: ColorPicker) => {
  return (
    <div className="w-full">
      <p className="text-gray-600 mb-1">{title}</p>
      <input
        className="w-28 h-6 outline-none rounded-lg inline-block"
        type="color"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default ColorPicker;
