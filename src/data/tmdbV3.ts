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

type RespostaFilmes = {
  results: Filme[];
};

type ListaUsuario = {
  id: number;
  name: string;
  description: string;
  item_count: number;
};

type RespostaListasUsuario = {
  results: ListaUsuario[];
};

type RespostaCriarLista = {
  success: boolean;
  status_code: number;
  status_message: string;
  list_id: number;
};

type RespostaListaDetalhes = {
  id: number;
  name: string;
  description: string;
  item_count: number;
  items: Filme[];
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
    {
      request_token: requestTokenAprovado,
    },
  );

  return data.session_id;
}

export async function buscarContaLogada(
  sessionId: string,
): Promise<RespostaConta> {
  const { data } = await tmdbV3.get<RespostaConta>("/account", {
    params: {
      session_id: sessionId,
    },
  });

  return data;
}

export async function encerrarSessao(sessionId: string): Promise<void> {
  await tmdbV3.delete("/authentication/session", {
    data: {
      session_id: sessionId,
    },
  });
}

export async function buscarFilmesPopulares(): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/movie/popular", {
    params: {
      language: "pt-BR",
      page: 1,
    },
  });

  return data.results;
}

export async function buscarMaisAvaliados(): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/movie/top_rated", {
    params: {
      language: "pt-BR",
      page: 1,
    },
  });

  return data.results;
}

export async function buscarLancamentos(): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>("/movie/now_playing", {
    params: {
      language: "pt-BR",
      page: 1,
    },
  });

  return data.results;
}

export async function buscarDetalhesFilme(id: number): Promise<FilmeDetalhes> {
  const { data } = await tmdbV3.get<FilmeDetalhes>(`/movie/${id}`, {
    params: {
      language: "pt-BR",
    },
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

export async function buscarFavoritos(
  accountId: number,
  sessionId: string,
): Promise<Filme[]> {
  const { data } = await tmdbV3.get<RespostaFilmes>(
    `/account/${accountId}/favorite/movies`,
    {
      params: {
        session_id: sessionId,
        language: "pt-BR",
        page: 1,
        sort_by: "created_at.desc",
      },
    },
  );

  return data.results;
}

export async function alterarFavorito(
  accountId: number,
  filmeId: number,
  favorito: boolean,
  sessionId: string,
): Promise<void> {
  await tmdbV3.post(
    `/account/${accountId}/favorite`,
    {
      media_type: "movie",
      media_id: filmeId,
      favorite: favorito,
    },
    {
      params: {
        session_id: sessionId,
      },
    },
  );
}

export async function buscarListasUsuario(
  accountId: number,
  sessionId: string,
): Promise<ListaUsuario[]> {
  const { data } = await tmdbV3.get<RespostaListasUsuario>(
    `/account/${accountId}/lists`,
    {
      params: {
        session_id: sessionId,
        page: 1,
      },
    },
  );

  return data.results;
}

export async function criarListaAssistidos(sessionId: string): Promise<number> {
  const { data } = await tmdbV3.post<RespostaCriarLista>(
    "/list",
    {
      name: "CineApp - Filmes Assistidos",
      description: "Filmes assistidos pelo usuário no CineApp",
      language: "pt",
    },
    {
      params: {
        session_id: sessionId,
      },
    },
  );

  return data.list_id;
}

export async function adicionarFilmeAssistido(
  listId: number,
  filmeId: number,
  sessionId: string,
): Promise<void> {
  await tmdbV3.post(
    `/list/${listId}/add_item`,
    {
      media_id: filmeId,
    },
    {
      params: {
        session_id: sessionId,
      },
    },
  );
}

export async function removerFilmeAssistido(
  listId: number,
  filmeId: number,
  sessionId: string,
): Promise<void> {
  await tmdbV3.post(
    `/list/${listId}/remove_item`,
    {
      media_id: filmeId,
    },
    {
      params: {
        session_id: sessionId,
      },
    },
  );
}

export const buscarImagem = (caminho: string, tamanho = "w500") =>
  `https://image.tmdb.org/t/p/${tamanho}${caminho}`;
