import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ActionButton } from "../../components/ActionButton";
import { useAuth } from "../../contexts/AuthContext";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  buscarListaAssistidosId,
  salvarListaAssistidosId,
} from "../../data/storage";
import {
  adicionarFilmeAssistido,
  buscarDetalhesFilme,
  buscarFilmesAssistidos,
  buscarImagem,
  buscarListasUsuario,
  criarListaAssistidos,
  removerFilmeAssistido,
} from "../../data/tmdbV3";
import { FilmeDetalhes } from "../../domains/entities/Filme";
import { RootStackParamList } from "../../routes/StackRoutes";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhes">;

export function Detalhes({ route, navigation }: Props) {
  const [filme, setFilme] = useState<FilmeDetalhes>();
  const [erro, setErro] = useState("");
  const [assistido, setAssistido] = useState(false);
  const [listId, setListId] = useState<number | null>(null);
  const [alterandoAssistido, setAlterandoAssistido] = useState(false);

  const { alternarFavorito, estaFavorito } = useFavoritos();
  const { usuario, sessionId } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    buscarDetalhesFilme(route.params.id)
      .then(setFilme)
      .catch(() => setErro("Não foi possível carregar o filme."));
  }, [route.params.id]);

  useEffect(() => {
    async function verificarAssistido() {
      if (!usuario || !sessionId) {
        return;
      }

      try {
        let idLista = await buscarListaAssistidosId();

        if (!idLista) {
          const listas = await buscarListasUsuario(usuario.id, sessionId);

          const listaExistente = listas.find(
            (lista) => lista.name === "CineApp - Filmes Assistidos",
          );

          idLista = listaExistente?.id ?? null;

          if (!idLista) {
            idLista = await criarListaAssistidos(sessionId);
          }

          await salvarListaAssistidosId(idLista);
        }

        const filmesAssistidos = await buscarFilmesAssistidos(idLista);

        setListId(idLista);
        setAssistido(
          filmesAssistidos.some((item) => item.id === route.params.id),
        );
      } catch (error) {
        console.error("[Detalhes] verificarAssistido:", error);
      }
    }

    verificarAssistido();
  }, [route.params.id, sessionId, usuario]);

  async function alternarAssistido() {
    if (!filme || !sessionId || !listId) {
      Alert.alert(
        "Atenção",
        "Não foi possível acessar sua lista de filmes assistidos.",
      );
      return;
    }

    try {
      setAlterandoAssistido(true);

      if (assistido) {
        await removerFilmeAssistido(listId, filme.id, sessionId);
        setAssistido(false);
      } else {
        await adicionarFilmeAssistido(listId, filme.id, sessionId);
        setAssistido(true);
      }
    } catch (error) {
      console.error("[Detalhes] alternarAssistido:", error);

      Alert.alert(
        "Erro",
        assistido
          ? "Não foi possível remover o filme dos assistidos."
          : "Não foi possível marcar o filme como assistido.",
      );
    } finally {
      setAlterandoAssistido(false);
    }
  }

  if (erro) {
    return (
      <View
        style={[styles.centralizado, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.erro, { color: theme.primary }]}>{erro}</Text>
      </View>
    );
  }

  if (!filme) {
    return (
      <View
        style={[styles.centralizado, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const ano = filme.release_date?.slice(0, 4) || "Sem data";

  const duracao = filme.runtime
    ? `${Math.floor(filme.runtime / 60)}h ${filme.runtime % 60}min`
    : "Duração não informada";

  const favorito = estaFavorito(filme.id);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {filme.backdrop_path && (
        <Image
          source={{ uri: buscarImagem(filme.backdrop_path, "w780") }}
          style={styles.banner}
          resizeMode="cover"
        />
      )}

      <View style={styles.conteudo}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={[styles.voltar, { color: theme.text }]}>‹ Voltar</Text>
        </Pressable>

        <View style={styles.informacoes}>
          {filme.poster_path && (
            <Image
              source={{ uri: buscarImagem(filme.poster_path) }}
              style={styles.poster}
            />
          )}

          <View style={styles.resumo}>
            <Text style={[styles.titulo, { color: theme.text }]}>
              {filme.title}
            </Text>

            <Text style={[styles.nota, { color: theme.primary }]}>
              ★ {filme.vote_average.toFixed(1)}
            </Text>

            <Text style={[styles.texto, { color: theme.muted }]}>{ano}</Text>

            <Text style={[styles.texto, { color: theme.muted }]}>
              {duracao}
            </Text>
          </View>
        </View>

        <Text style={[styles.generos, { color: theme.muted }]}>
          {filme.genres.map((genero) => genero.name).join(" • ")}
        </Text>

        <ActionButton
          titulo={
            favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          onPress={() => alternarFavorito(filme)}
          containerStyle={[
            styles.botaoMargin,
            favorito && { backgroundColor: theme.secondary },
          ]}
        />

        <ActionButton
          titulo={
            assistido ? "Remover dos assistidos" : "Marcar como assistido"
          }
          onPress={alternarAssistido}
          carregando={alterandoAssistido}
          containerStyle={[
            styles.botaoAssistidoMargin,
            assistido && { backgroundColor: theme.secondary },
          ]}
        />

        <Text style={[styles.subtitulo, { color: theme.text }]}>Sinopse</Text>

        <Text style={[styles.sinopse, { color: theme.text }]}>
          {filme.overview || "Sinopse não disponível."}
        </Text>
      </View>
    </ScrollView>
  );
}