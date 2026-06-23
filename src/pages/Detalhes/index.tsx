import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ActionButton } from "../../components/ActionButton";
import { AreaComentario } from "../../components/AreaComentario";
import { useAuth } from "../../contexts/AuthContext";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { useTheme } from "../../contexts/ThemeContext";
import { buscarDetalhesFilme, buscarImagem } from "../../data/tmdbV3";
import { FilmeDetalhes } from "../../domains/entities/Filme";
import { TabParamList } from "../../routes/TabRoutes";
import { styles } from "./styles";
import { useFilmeAssistido } from "../../utils/hooks/useFilmeAssistidos";

type Props = BottomTabScreenProps<TabParamList, "Detalhes">;

export function Detalhes({ route, navigation }: Props) {
  const [filme, setFilme] = useState<FilmeDetalhes>();
  const [erro, setErro] = useState("");

  const { alternarFavorito, estaFavorito } = useFavoritos();
  const { sessionId } = useAuth();
  const { theme } = useTheme();

  const {
    assistido,
    listId,
    alterandoAssistido,
    comentarioSalvo,
    alternarAssistido,
  } = useFilmeAssistido(filme?.id);

  useEffect(() => {
    buscarDetalhesFilme(route.params.id)
      .then(setFilme)
      .catch(() => setErro("Não foi possível carregar o filme."));
  }, [route.params.id]);

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
      keyboardShouldPersistTaps="handled"
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

        {assistido && listId && sessionId && (
          <AreaComentario
            listId={listId}
            filmeId={filme.id}
            sessionId={sessionId}
            comentarioInicial={comentarioSalvo}
          />
        )}

        <Text style={[styles.subtitulo, { color: theme.text }]}>Sinopse</Text>

        <Text style={[styles.sinopse, { color: theme.text }]}>
          {filme.overview || "Sinopse não disponível."}
        </Text>
      </View>
    </ScrollView>
  );
}
