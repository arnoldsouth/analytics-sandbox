import React from "react";
import type { PokemonListItem } from "./types";

interface PokemonGridCardProps {
  pokemon: PokemonListItem;
  onClick: (pokemon: PokemonListItem) => void;
}

const getSpriteUrl = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  const id = match ? match[1] : null;
  return id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : "";
};

const getId = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? match[1] : "";
};

const PokemonGridCard: React.FC<PokemonGridCardProps> = ({
  pokemon,
  onClick,
}) => {
  const id = getId(pokemon.url);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(pokemon)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onClick(pokemon)
      }
      aria-label={`View details for ${pokemon.name}`}
      className="rounded-xl border border-zinc-200 shadow-sm hover:shadow-lg hover:border-zinc-400 focus:border-zinc-500 active:scale-95 motion-safe:hover:animate-pulse-card transition-all duration-200 flex flex-col items-center p-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-400 animate-fade-in bg-transparent"
    >
      <img
        src={getSpriteUrl(pokemon.url)}
        alt={pokemon.name}
        className="rounded-lg aspect-square object-contain mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-transparent group-hover:motion-safe:animate-float group-focus:motion-safe:animate-float transition-transform duration-200"
        loading="lazy"
      />
      <div className="w-full flex flex-col items-center">
        {/* <span className="text-xs uppercase tracking-wider text-zinc-400 mb-1">
          Pokemon
        </span> */}
        {/* <span className="text-lg font-bold mb-1 capitalize text-zinc-700 group-hover:text-zinc-600 transition-colors"> */}
        <span className="text-sm uppercase tracking-wider text-zinc-900 mb-2">
          {pokemon.name}
        </span>
        <span className="text-xs text-zinc-400 mb-2">ID: {id}</span>
      </div>
    </div>
  );
};

export default PokemonGridCard;

/*
Add to your global CSS (e.g., index.css or tailwind.config.js):

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes pulse-card {
  0%, 100% { box-shadow: 0 1px 6px 0 rgb(0 0 0 / 0.05); }
  50% { box-shadow: 0 4px 24px 0 rgb(59 130 246 / 0.15); }
}
.animate-float { animation: float 1.2s ease-in-out infinite; }
.animate-pulse-card { animation: pulse-card 0.8s ease-in-out infinite; }
*/
