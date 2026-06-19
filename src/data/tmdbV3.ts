import axios from "axios";
import { Filme, FilmeDetalhes } from "../domains/entities/Filme";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN_LEITURA = process.env.EXPO_PUBLIC_TMDB_TOKEN;

export const tmdbV3 = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN_LEITURA}`,
  },
});

type RespostaRequestToken = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

type RespostaSession = {
  success: boolean;
  session_id: string;
};

type RespostaConta = {
  id: number;
  username: string;
  name: string;
  avatar: {
    tmdb: {
      avatar_path: string | null;
    };
  };
  iso_639_1: string;
  iso_3166_1: string;
};

export async function criarRequestToken(): Promise<string> {
  const { data } = await tmdbV3.get<RespostaRequestToken>(
    "/authentication/token/new",
  );

  return data.request_token;
}

export async function criarSessao(
  requestTokenAprovado: string,
): Promise<string> {
  const { data } = await tmdbV3.post<RespostaSession>(
    "/authentication/session/new",
    { request_token: requestTokenAprovado },
  );

  return data.session_id;
}

export async function buscarContaLogada(
  sessionId: string,
): Promise<RespostaConta> {
  const { data } = await tmdbV3.get<RespostaConta>("/account", {
    params: { session_id: sessionId },
  });

  return data;
}

export async function encerrarSessao(sessionId: string): Promise<void> {
  await tmdbV3.delete("/authentication/session", {
    data: { session_id: sessionId },
  });
}


type RespostaFilmes = {
  results: Filme[];
};

export async function buscarFilmesPopulares(): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/movie/popular", {
    params: { language: "pt-BR", page: 1 },
  });
  return data.results;
}

export async function buscarMaisAvaliados(): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/movie/top_rated", {
    params: { language: "pt-BR", page: 1 },
  });
  return data.results;
}

export async function buscarLancamentos(): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/movie/now_playing", {
    params: { language: "pt-BR", page: 1 },
  });
  return data.results;
}

export async function buscarDetalhesFilme(id: number): Promise<FilmeDetalhes> {
  const { data } = await tmdbV3.get<FilmeDetalhes>(`/movie/${id}`, {
    params: { language: "pt-BR" },
  });
  return data;
}

export async function buscarFilmes(nome: string): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/search/movie", {
    params: {
      query: nome,
      language: "pt-BR",
      page: 1,
    },
  });
  return data.results;
}

export const buscarImagem = (caminho: string, tamanho = "w500") =>
  `https://image.tmdb.org/t/p/${tamanho}${caminho}`;