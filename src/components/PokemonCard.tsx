import React from "react";
import type { PokemonFullData } from "./types";

interface PokemonCardProps {
  pokemon: PokemonFullData;
  onClose?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClose }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 shadow-lg max-w-lg w-full mx-auto mt-10 p-4 sm:p-8 relative animate-fade-in motion-safe:animate-scale-in bg-transparent">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 px-3 py-1 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 transition motion-safe:hover:animate-rotate motion-safe:focus:animate-rotate"
          aria-label="Close details"
        >
          ×
        </button>
      )}
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.front_default || ""}
          alt={pokemon.name}
          className="rounded-lg aspect-square object-contain w-28 h-28 sm:w-40 sm:h-40 mb-6 bg-transparent shadow motion-safe:animate-scale-in"
        />
        {/* <span className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
          Pokemon
        </span> */}
        {/* <h2 className="text-2xl font-bold mb-2 capitalize text-zinc-700 tracking-wide"> */}
        <h2 className="text-sm uppercase tracking-wider text-zinc-900 mb-2">
          {pokemon.name}
        </h2>
        <div className="flex gap-2 mb-3 flex-wrap justify-center">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 bg-zinc-200 text-zinc-900 rounded-full text-xs uppercase transition motion-safe:hover:animate-pulse-badge motion-safe:focus:animate-pulse-badge"
              tabIndex={0}
            >
              {t.type.name}
            </span>
          ))}
        </div>
        <div className="mb-2 text-xs uppercase text-zinc-700">
          <span className="text-sm uppercase text-zinc-900">HP: </span>
          {pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat ?? "-"}
        </div>
        <div className="mb-2 text-xs uppercase text-zinc-700">
          <span className="text-sm uppercase text-zinc-900">Height: </span>
          {pokemon.height} |{" "}
          <span className="text-sm uppercase text-zinc-900">Weight: </span>
          {pokemon.weight}
        </div>
        <div className="mb-2 text-xs uppercase text-zinc-700">
          <span className="text-sm uppercase text-zinc-900">Abilities: </span>
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </div>
        <div className="w-full mt-4">
          <h3 className="text-sm uppercase text-zinc-900 mb-2">Stats</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs uppercase">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name} className="flex justify-between">
                <span className="text-zinc-700">{s.stat.name}</span>
                <span className="text-zinc-700">{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
