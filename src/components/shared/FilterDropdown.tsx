type Props = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

const FilterDropdown = ({ value, options, onChange }: Props) => {
  return (
    <select
      className="border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All</option>
      {options.filter(Boolean).map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
