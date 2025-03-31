import React from "react";

interface FilterProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="filter">
      <select
        className="filter__select"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
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

export default Filter;
