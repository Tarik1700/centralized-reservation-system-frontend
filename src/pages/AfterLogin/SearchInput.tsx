import React, { FC, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

const SearchInput: FC<Props> = ({ ...rest }) => {
  return (
    <div className="relative">
      <input
        {...rest}
        className="box-border flex flex-row items-start px-4 py-3 w-full h-10 mx-auto bg-white border border-gray-300 rounded-lg pl-12 sm:w-1/2 lg:w-1/3"
        placeholder="Search"
      />
      <div className="absolute left-3 top-3">
      </div>
    </div>
  );
};

export default SearchInput;
