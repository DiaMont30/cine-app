import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
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
import { obterListaAssistidosId } from "../../data/storage";
import {
  adicionarFilmeAssistido,
  buscarDetalhesFilme,
  buscarImagem,
  removerFilmeAssistido,
} from "../../data/tmdbV3";
import { FilmeDetalhes } from "../../domains/entities/Filme";
import { TabParamList } from "../../routes/TabRoutes";
import { styles } from "./styles";
import {
  atualizarComentarioFilme,
  buscarFilmesAssistidos,
} from "../../data/tmdbV4";
import { Input } from "../../components/Input";

type Props = BottomTabScreenProps<TabParamList, "Detalhes">;

export function Detalhes({ route, navigation }: Props) {
  const [filme, setFilme] = useState<FilmeDetalhes>();
  const [erro, setErro] = useState("");
  const [assistido, setAssistido] = useState(false);
  const [listId, setListId] = useState<number | null>(null);
  const [alterandoAssistido, setAlterandoAssistido] = useState(false);

  const [comentario, setComentario] = useState("");
  const [comentarioSalvo, setComentarioSalvo] = useState<string | null>(null);
  const [salvandoComentario, setSalvandoComentario] = useState(false);

  const { alternarFavorito, estaFavorito } = useFavoritos();
  const { usuario, sessionId } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    buscarDetalhesFilme(route.params.id)
      .then(setFilme)
      .catch(() => setErro("Não foi possível carregar o filme."));
  }, [route.params.id]);

  useFocusEffect(
    useCallback(() => {
      async function verificarAssistido() {
        if (!usuario || !sessionId) {
          return;
        }

        try {
          const idLista = await obterListaAssistidosId(usuario.id, sessionId);
          const filmesAssistidos = await buscarFilmesAssistidos(idLista);

          setListId(idLista);

          const filmeNaLista = filmesAssistidos.find(
            (item: any) => item.id === route.params.id,
          );

          if (filmeNaLista) {
            setAssistido(true);
            if (filmeNaLista.comment) {
              setComentarioSalvo(filmeNaLista.comment);
              setComentario(filmeNaLista.comment);
            } else {
              setComentarioSalvo(null);
              setComentario("");
            }
          } else {
            setAssistido(false);
            setComentarioSalvo(null);
            setComentario("");
          }
        } catch (error) {
          console.error("[Detalhes] verificarAssistido:", error);
        }
      }

      verificarAssistido();
    }, [route.params.id, sessionId, usuario]),
  );

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
        setComentarioSalvo(null);
        setComentario("");
      } else {
        await adicionarFilmeAssistido(listId, filme.id, sessionId);
        setAssistido(true);
      }
    } catch (error) {
      console.error("[Detalhes] alternarAssistido:", error);
      Alert.alert(
        "Erro",
        assistido ? "Não foi possível remover." : "Não foi possível marcar.",
      );
    } finally {
      setAlterandoAssistido(false);
    }
  }

  async function handleSalvarComentario() {
    if (!filme || !sessionId || !listId) return;

    if (comentario.trim().length === 0) {
      Alert.alert("Atenção", "Digite um comentário antes de salvar.");
      return;
    }

    try {
      setSalvandoComentario(true);
      await atualizarComentarioFilme(listId, filme.id, comentario, sessionId);

      setComentarioSalvo(comentario);
    } catch (error) {
      console.error("[Detalhes] handleSalvarComentario:", error);
      Alert.alert("Erro", "Não foi possível salvar o comentário.");
    } finally {
      setSalvandoComentario(false);
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

        {assistido && (
          <View style={styles.areaComentario}>
            <Text
              style={[styles.subtitulo, { color: theme.text, marginTop: 10 }]}
            >
              Sua Avaliação
            </Text>

            {comentarioSalvo !== null ? (
              <View
                style={[
                  styles.cardComentario,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Text style={[styles.textoComentario, { color: theme.text }]}>
                  "{comentarioSalvo}"
                </Text>

                <Pressable
                  onPress={() => setComentarioSalvo(null)}
                  style={styles.botaoEditar}
                >
                  <Text style={[styles.textoEditar, { color: theme.primary }]}>
                    Editar comentário
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <Input
                  placeholder="O que achou do filme?"
                  value={comentario}
                  onChangeText={setComentario}
                  returnKeyType="send"
                  onSubmitEditing={handleSalvarComentario}
                />

                <ActionButton
                  titulo="Salvar Comentário"
                  onPress={handleSalvarComentario}
                  carregando={salvandoComentario}
                  containerStyle={{
                    backgroundColor: theme.secondary,
                    marginTop: -8,
                  }}
                />
              </View>
            )}
          </View>
        )}

        <Text style={[styles.subtitulo, { color: theme.text }]}>Sinopse</Text>

        <Text style={[styles.sinopse, { color: theme.text }]}>
          {filme.overview || "Sinopse não disponível."}
        </Text>
      </View>
    </ScrollView>
  );
}
