import { useEffect, useState } from "react";
import { Filme } from "../../domains/entities/Filme";
import { buscarFilmesPopulares } from "../../data/tmdbV3";

const TOTAL_POSTERES = 6;

export function usePosteresDestaque() {
  const [posteres, setPosteres] = useState<string[]>([]);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const filmes: Filme[] = await buscarFilmesPopulares();

        const caminhos = filmes
          .filter((filme) => filme.poster_path)
          .slice(0, TOTAL_POSTERES)
          .map(
            (filme) => `https://image.tmdb.org/t/p/w300${filme.poster_path}`,
          );

        if (ativo) {
          setPosteres(caminhos);
        }
      } catch {
        if (ativo) setPosteres([]);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  return posteres;
}
