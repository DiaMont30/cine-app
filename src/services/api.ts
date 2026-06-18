const API_URL = "https://api.themoviedb.org/3";
const token = process.env.EXPO_PUBLIC_TMDB_TOKEN;

export type Filme = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};
export type FilmeDetalhes = Filme & {
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
};

type RespostaFilmes = {
  results: Filme[];
};
async function requisicao<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao consultar a TMDB");
  }

  return response.json();
}

async function buscarLista(endpoint: string) {
  const dados = await requisicao<RespostaFilmes>(
    `${endpoint}?language=pt-BR&page=1`,
  );

  return dados.results;
}

export function buscarFilmesPopulares() {
  return buscarLista("/movie/popular");
}

export function buscarMaisAvaliados() {
  return buscarLista("/movie/top_rated");
}

export function buscarLancamentos() {
  return buscarLista("/movie/now_playing");
}
export const buscarImagem = (caminho: string, tamanho = "w500") =>
  `https://image.tmdb.org/t/p/${tamanho}${caminho}`;

export async function buscarFilmes(nome: string) {
  const dados = await requisicao<RespostaFilmes>(
    `/search/movie?query=${encodeURIComponent(nome)}&language=pt-BR&page=1`,
  );
  return dados.results;
}

export function buscarDetalhesFilme(id: number) {
  return requisicao<FilmeDetalhes>(`/movie/${id}?language=pt-BR`);
}
