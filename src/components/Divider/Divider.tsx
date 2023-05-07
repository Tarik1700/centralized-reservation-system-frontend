import React from "react";
import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}
export const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <div
      className={twMerge("border-t border-solid border-gray-200", className)}
    />
  );
};
