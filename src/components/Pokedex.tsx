import React, { useEffect, useState, useRef } from "react";
import type { PokemonListItem, PokemonFullData } from "./types";
import SearchBar from "./SearchBar";
import SuggestionsList from "./SuggestionsList";
import PokemonCard from "./PokemonCard";
import PokemonGridCard from "./PokemonGridCard";
import Pagination from "./Pagination";

const POKE_API_LIST = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const POKE_API_DETAIL = "https://pokeapi.co/api/v2/pokemon/";
const PAGE_SIZE = 20;

const getId = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? match[1] : "";
};

const Pokedex: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<PokemonListItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonFullData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  // Fetch all Pokemon names on mount
  useEffect(() => {
    fetch(POKE_API_LIST)
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results));
  }, []);

  // Helper: filter by name or ID
  const filterPokemon = (list: PokemonListItem[], query: string) => {
    const q = query.trim().toLowerCase();
    return list.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const idMatch = getId(p.url) === q || getId(p.url).includes(q);
      return nameMatch || idMatch;
    });
  };

  // Filter suggestions as user types
  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    const filtered = filterPokemon(allPokemon, search);
    setSuggestions(filtered.slice(0, 10));
    setHighlightedIndex(0);
  }, [search, allPokemon]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Handle search bar input
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setSelectedPokemon(null);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      handleSelect(suggestions[highlightedIndex]);
    }
  };

  // Handle suggestion selection
  const handleSelect = (pokemon: PokemonListItem) => {
    setSearch(pokemon.name);
    setSuggestions([]);
    fetch(POKE_API_DETAIL + pokemon.name)
      .then((res) => res.json())
      .then((data) => setSelectedPokemon(data));
  };

  // Handle grid card click
  const handleGridCardClick = (pokemon: PokemonListItem) => {
    fetch(POKE_API_DETAIL + pokemon.name)
      .then((res) => res.json())
      .then((data) => setSelectedPokemon(data));
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Use new filter for displayedPokemon
  const displayedPokemon = search
    ? filterPokemon(allPokemon, search)
    : allPokemon;
  const totalPages = Math.ceil(displayedPokemon.length / PAGE_SIZE);
  const paginatedPokemon = displayedPokemon.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main className="min-h-screen  flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl uppercase text-zinc-900 tracking-wider mb-2">
          Pokedex
        </h1>
        {/* <p className="text-zinc-600 text-lg mb-4">
          Pokemon database with search and autocompletion functionality
        </p> */}
        <div className="w-full max-w-xs mx-auto relative">
          <SearchBar
            // value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <div ref={suggestionsRef}>
            <SuggestionsList
              suggestions={suggestions}
              onSelect={handleSelect}
              highlightedIndex={highlightedIndex}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
        {paginatedPokemon.map((pokemon) => (
          <PokemonGridCard
            key={pokemon.name}
            pokemon={pokemon}
            onClick={handleGridCardClick}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {selectedPokemon && (
        <PokemonCard
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </main>
  );
};

export default Pokedex;
