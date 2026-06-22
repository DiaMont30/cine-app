import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  alterarFavorito,
  buscarFavoritos,
} from "../data/tmdbV3";
import { Filme } from "../domains/entities/Filme";
import { useAuth } from "./AuthContext";

type FavoritosContextData = {
  favoritos: Filme[];
  loadingFavoritos: boolean;
  alternarFavorito: (filme: Filme) => Promise<void>;
  estaFavorito: (id: number) => boolean;
  carregarFavoritos: () => Promise<void>;
};

const FavoritosContext = createContext<FavoritosContextData>(
  {} as FavoritosContextData,
);

type Props = {
  children: ReactNode;
};

export function FavoritosProvider({ children }: Props) {
  const { usuario, sessionId } = useAuth();
  const [favoritos, setFavoritos] = useState<Filme[]>([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);

  const carregarFavoritos = useCallback(async () => {
    if (!usuario || !sessionId) {
      setFavoritos([]);
      return;
    }

    try {
      setLoadingFavoritos(true);

      const resultado = await buscarFavoritos(
        usuario.id,
        sessionId,
      );

      setFavoritos(resultado);
    } catch (error) {
      console.error("[Favoritos] carregarFavoritos:", error);
    } finally {
      setLoadingFavoritos(false);
    }
  }, [sessionId, usuario]);

  useEffect(() => {
    carregarFavoritos();
  }, [carregarFavoritos]);

  async function alternarFavorito(filme: Filme) {
    if (!usuario || !sessionId) {
      return;
    }

    const filmeJaFavorito = favoritos.some(
      (item) => item.id === filme.id,
    );

    try {
      await alterarFavorito(
        usuario.id,
        filme.id,
        !filmeJaFavorito,
        sessionId,
      );

      setFavoritos((lista) =>
        filmeJaFavorito
          ? lista.filter((item) => item.id !== filme.id)
          : [...lista, filme],
      );
    } catch (error) {
      console.error("[Favoritos] alternarFavorito:", error);
      throw error;
    }
  }

  function estaFavorito(id: number) {
    return favoritos.some((filme) => filme.id === id);
  }

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        loadingFavoritos,
        alternarFavorito,
        estaFavorito,
        carregarFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}

