import React from 'react';

type CustomInputProps = {
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchBar = React.memo(({ value, ...rest }: CustomInputProps) => {
  return (
    <input
      type="text"
      placeholder="Search patients..."
      value={value}
      className="border p-2 rounded w-full max-w-md"
      {...rest}
    />
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
