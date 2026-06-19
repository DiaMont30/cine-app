import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  adicionarFilmeAssistido,
  buscarDetalhesFilme,
  buscarFilmesAssistidos,
  buscarImagem,
  buscarListasUsuario,
  criarListaAssistidos,
  removerFilmeAssistido,
} from "../../data/tmdbV3";
import {
  buscarListaAssistidosId,
  salvarListaAssistidosId,
} from "../../data/storage";
import { FilmeDetalhes } from "../../domains/entities/Filme";
import { RootStackParamList } from "../../routes/StackRoutes";

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
      <View style={[styles.centralizado, { backgroundColor: theme.background }]}>
        <Text style={[styles.erro, { color: theme.primary }]}>{erro}</Text>
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={[styles.centralizado, { backgroundColor: theme.background }]}>
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

            <Text style={[styles.texto, { color: theme.muted }]}>
              {ano}
            </Text>

            <Text style={[styles.texto, { color: theme.muted }]}>
              {duracao}
            </Text>
          </View>
        </View>

        <Text style={[styles.generos, { color: theme.muted }]}>
          {filme.genres.map((genero) => genero.name).join(" • ")}
        </Text>

        <Pressable
          style={[
            styles.botao,
            { backgroundColor: theme.primary },
            favorito && { backgroundColor: theme.secondary },
          ]}
          onPress={() => alternarFavorito(filme)}
        >
          <Text style={styles.botaoTexto}>
            {favorito
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.botao,
            styles.botaoAssistido,
            {
              backgroundColor: assistido
                ? theme.secondary
                : theme.primary,
            },
            alterandoAssistido && styles.botaoDesabilitado,
          ]}
          onPress={alternarAssistido}
          disabled={alterandoAssistido}
        >
          {alterandoAssistido ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text style={styles.botaoTexto}>
              {assistido
                ? "Remover dos assistidos"
                : "Marcar como assistido"}
            </Text>
          )}
        </Pressable>

        <Text style={[styles.subtitulo, { color: theme.text }]}>
          Sinopse
        </Text>

        <Text style={[styles.sinopse, { color: theme.text }]}>
          {filme.overview || "Sinopse não disponível."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centralizado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    height: 230,
  },
  conteudo: {
    padding: 20,
  },
  voltar: {
    fontSize: 17,
    marginBottom: 20,
  },
  informacoes: {
    flexDirection: "row",
    gap: 18,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 12,
  },
  resumo: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
  },
  nota: {
    fontSize: 17,
    marginVertical: 10,
  },
  texto: {
    fontSize: 15,
    marginTop: 5,
  },
  generos: {
    fontSize: 15,
    marginTop: 20,
  },
  botao: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  botaoAssistido: {
    marginTop: 12,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 30,
  },
  erro: {
    fontSize: 16,
  },
});
