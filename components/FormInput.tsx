import React, { ChangeEvent } from "react";

type FormInput = {
  id: string;
  type: string;
  label?: string;
  title?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({
  id,
  type,
  label,
  title,
  required = false,
  value,
  onChange,
}: FormInput) => {
  return (
    <div>
      {title && <p className="text-gray-600 mb-1">{title}</p>}
      <div className="relative w-full border-primary-light border-[2px] rounded-lg">
        <input
          className="peer w-full px-3 py-2 outline-none rounded-lg"
          id={id}
          type={type}
          placeholder=" "
          value={value}
          onChange={onChange}
          required={required}
        />
        {label && (
          <label
            className="absolute top-0 left-2 -translate-y-1/2 ml-2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:bg-white transition-all duration-300"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default FormInput;
