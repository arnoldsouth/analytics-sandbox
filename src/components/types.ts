export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonFullData = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    [key: string]: string | null;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
};
