import { Filme, FilmeDetalhes } from "../domains/entities/Filme";

const API_URL = "https://api.themoviedb.org/3";
const token = process.env.EXPO_PUBLIC_TMDB_TOKEN;

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






