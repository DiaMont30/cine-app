export type Filme = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export const buscarImagem = (caminho: string, tamanho = "w500") =>
  `https://image.tmdb.org/t/p/${tamanho}${caminho}`;
