import axios from "axios";
import { Filme } from "../domains/entities/Filme";

const BASE_URL_V4 = "https://api.themoviedb.org/4";
const TOKEN_LEITURA = process.env.EXPO_PUBLIC_TMDB_TOKEN;

export const tmdbV4 = axios.create({
  baseURL: BASE_URL_V4,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN_LEITURA}`,
    "Content-Type": "application/json",
  },
});

export async function atualizarComentarioFilme(
  listId: number,
  mediaId: number,
  comentario: string,
  sessionId: string,
) {
  const payload = {
    items: [
      {
        media_type: "movie",
        media_id: mediaId,
        comment: comentario,
      },
    ],
  };

  const { data } = await tmdbV4.put(`/list/${listId}/items`, payload, {
    params: { session_id: sessionId },
  });

  return data;
}

export async function buscarFilmesAssistidos(listId: number): Promise<Filme[]> {
  const { data } = await tmdbV4.get(`/list/${listId}`, {
    params: { language: "pt-BR" },
  });

  const filmes = data.results.map((filme: any) => {
    const chaveComentario = `movie:${filme.id}`;
    const textoComentario = data.comments
      ? data.comments[chaveComentario]
      : null;

    return {
      ...filme,
      comment: textoComentario,
    };
  });

  return filmes;
}
