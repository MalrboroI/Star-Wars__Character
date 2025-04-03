import React from "react";
import { FilterProps } from "../../globalTypes/Types";

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
          <option
            className="filter__select__option"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
