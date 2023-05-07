import React, { ChangeEvent } from "react";
import { Category } from "../../pages/CreateRestaurant";

interface SelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: any;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ label, options, value, onChange }: SelectProps) => {
  return (
    <div className="w-full">
      <select
        id="select"
        defaultValue={""}
        value={value}
        onChange={onChange}
        className="w-full py-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
