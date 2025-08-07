import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const SearchBar = React.memo(({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search patients..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full max-w-md"
    />
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
