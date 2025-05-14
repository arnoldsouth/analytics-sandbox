import Input_01 from "./kokonutui/input-01";
import React from "react";

interface SearchBarProps {
  // value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  // value,
  onChange,
  // onKeyDown,
  ariaLabel = "Search Pokemon",
}) => {
  return (
    <div className="w-full text-zinc-900 uppercase">
      <Input_01
        label={ariaLabel}
        placeholder="Pokemon name"
        type="text"
        // value={value}
        onChange={onChange}
        // onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
