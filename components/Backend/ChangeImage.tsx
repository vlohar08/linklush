import Image from "next/image";
import React from "react";

type ChangeImage = {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  title: string;
  message: string;
};

const ChangeImage = ({ id, title, message, icon, onChange }: ChangeImage) => {
  return (
    <div>
      <p className="text-gray-600">{title}</p>
      <div className="flex items-center gap-x-3">
        <Image
          className="min-w-[50px] min-h-[50px] aspect-square object-cover rounded-3xl"
          src={icon}
          width={50}
          height={50}
          alt="Default Icon"
        />
        <input
          className="hidden"
          type="file"
          id={"icon" + id}
          name={"icon" + id}
          onChange={onChange}
        />
        <label
          className="text-primary text-base cursor-pointer"
          htmlFor={"icon" + id}
        >
          {message}
        </label>
      </div>
    </div>
  );
};

export default ChangeImage;
