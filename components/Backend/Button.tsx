import React, { MouseEventHandler } from "react";

type Button = {
  icon?: React.ReactNode;
  title: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ icon, title, className, disabled, onClick }: Button) => {
  return (
    <button
      disabled={disabled}
      className={`bg-primary hover:bg-secondary transition-colors duration-300 rounded-xl flex items-center gap-x-1 text-white px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
