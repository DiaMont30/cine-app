export type Filme = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  comment?: string;
};

export type FilmeDetalhes = Filme & {
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
};
