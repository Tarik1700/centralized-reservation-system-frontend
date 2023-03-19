import { HTMLAttributes } from "react";
import { BUTTON_TYPES, getColoringStyle } from "./constants";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type?: "button" | "submit";
  disabled?: boolean;
  variation?: BUTTON_TYPES;
  icon?: any;
  color?: string;
  iconLeft?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const TwButton = ({
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
  variation = "primary",
  icon,
  color,
  iconLeft = true,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        ...(!disabled && color && getColoringStyle(variation, color)),
      }}
      className={twMerge(
        "btn rounded-lg cursor-pointer inline-flex items-center px-6 py-3.5 text-base leading-6 justify-center text-center w-full font-normal font-inter",
        "disabled:bg-gray-disabled disabled:text-white disabled:hover:bg-opacity-100 disabled:cursor-not-allowed disabled:border-none",
        className
      )}
      onClick={onClick}
    >
      <div className="flex gap-[10px] items-center">
        {icon && iconLeft && icon}
        {children}
        {icon && !iconLeft && icon}
      </div>
    </button>
  );
};
