import { createContext, ReactNode, useContext, useState } from "react";
import { Filme } from "../domains/entities/Filme";
type FavoritosContextData = {
  favoritos: Filme[];
  alternarFavorito: (filme: Filme) => void;
  estaFavorito: (id: number) => boolean;
};

const FavoritosContext = createContext<FavoritosContextData>(
  {} as FavoritosContextData
);

type Props = {
  children: ReactNode;
};

export function FavoritosProvider({ children }: Props) {
  const [favoritos, setFavoritos] = useState<Filme[]>([]);

  function alternarFavorito(filme: Filme) {
    setFavoritos((lista) =>
      lista.some((item) => item.id === filme.id)
        ? lista.filter((item) => item.id !== filme.id)
        : [...lista, filme]
    );
  }

  function estaFavorito(id: number) {
    return favoritos.some((filme) => filme.id === id);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, alternarFavorito, estaFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}