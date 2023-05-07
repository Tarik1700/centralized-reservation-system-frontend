import React from "react";
import cn from "classnames";

interface LabelProps {
  text?: string;
  htmlFor: string;
  title?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  text,
  htmlFor,
  title,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      title={title}
      className={cn(
        className,
        "flex text-gray-700 text-base font-semibold mb-1"
      )}
    >
      {text}
    </label>
  );
};
