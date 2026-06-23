import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { obterListaAssistidosId } from "../../data/storage";
import { buscarFilmesAssistidos } from "../../data/tmdbV4";
import {
  adicionarFilmeAssistido,
  removerFilmeAssistido,
} from "../../data/tmdbV3";

export function useFilmeAssistido(filmeId?: number) {
  const { usuario, sessionId } = useAuth();

  const [assistido, setAssistido] = useState(false);
  const [listId, setListId] = useState<number | null>(null);
  const [alterandoAssistido, setAlterandoAssistido] = useState(false);
  const [comentarioSalvo, setComentarioSalvo] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function verificarAssistido() {
        if (!usuario || !sessionId || !filmeId) return;

        try {
          const idLista = await obterListaAssistidosId(usuario.id, sessionId);
          const filmesAssistidos = await buscarFilmesAssistidos(idLista);

          setListId(idLista);

          const filmeNaLista = filmesAssistidos.find(
            (item: any) => item.id === filmeId,
          );

          if (filmeNaLista) {
            setAssistido(true);
            setComentarioSalvo(filmeNaLista.comment || null);
          } else {
            setAssistido(false);
            setComentarioSalvo(null);
          }
        } catch (error) {
          console.error("[useFilmeAssistido] verificarAssistido:", error);
        }
      }

      verificarAssistido();
    }, [filmeId, sessionId, usuario]),
  );

  async function alternarAssistido() {
    if (!filmeId || !sessionId || !listId) {
      Alert.alert(
        "Atenção",
        "Não foi possível acessar sua lista de filmes assistidos.",
      );
      return;
    }

    try {
      setAlterandoAssistido(true);

      if (assistido) {
        await removerFilmeAssistido(listId, filmeId, sessionId);
        setAssistido(false);
        setComentarioSalvo(null);
      } else {
        await adicionarFilmeAssistido(listId, filmeId, sessionId);
        setAssistido(true);
      }
    } catch (error) {
      console.error("[useFilmeAssistido] alternarAssistido:", error);
      Alert.alert(
        "Erro",
        assistido ? "Não foi possível remover." : "Não foi possível marcar.",
      );
    } finally {
      setAlterandoAssistido(false);
    }
  }

  return {
    assistido,
    listId,
    alterandoAssistido,
    comentarioSalvo,
    alternarAssistido,
  };
}
