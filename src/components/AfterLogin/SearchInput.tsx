import { useNavigate } from 'react-router';
import { useState } from 'react';

const SearchInput = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate('/dashboard/restaurant/' + search);
  };

  return (
    <form onSubmit={handleSubmit} className="  mx-auto pt-5">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          type="text"
          placeholder="Search"
          className="w-full py-3 pl-12 pr-4 text-gray-500 border-[1px] border-solid border-gray-200 rounded-lg outline-none bg-white focus:bg-white focus:border-indigo-600"
        />
      </div>
      <hr className="h-px px-3 my-4 bg-gray-200 border-0 dark:bg-gray-700" />
    </form>
  );
};

export default SearchInput;
