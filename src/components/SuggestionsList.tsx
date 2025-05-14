import React from "react";
import type { PokemonListItem } from "./types";

interface SuggestionsListProps {
  suggestions: PokemonListItem[];
  onSelect: (pokemon: PokemonListItem) => void;
  highlightedIndex: number;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSelect,
  highlightedIndex,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <ul
      className="absolute z-10 w-full bg-white border border-zinc-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto text-sm uppercase"
      role="listbox"
      aria-label="Pokemon suggestions"
    >
      {suggestions.map((pokemon, idx) => (
        <li
          key={pokemon.name}
          className={`px-4 py-2 cursor-pointer select-none ${
            idx === highlightedIndex
              ? "bg-zinc-100 text-zinc-900"
              : "hover:bg-zinc-100"
          }`}
          role="option"
          aria-selected={idx === highlightedIndex}
          tabIndex={0}
          onClick={() => onSelect(pokemon)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(pokemon);
            }
          }}
        >
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
