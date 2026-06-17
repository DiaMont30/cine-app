import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { RootStackParamList } from "../../routes/StackRoutes";
import {
  buscarDetalhesFilme,
  buscarImagem,
  FilmeDetalhes,
} from "../../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhes">;

export function Detalhes({ route, navigation }: Props) {
  const [filme, setFilme] = useState<FilmeDetalhes>();
  const [erro, setErro] = useState("");
  const { alternarFavorito, estaFavorito } = useFavoritos();

  useEffect(() => {
    buscarDetalhesFilme(route.params.id)
      .then(setFilme)
      .catch(() => setErro("Não foi possível carregar o filme."));
  }, [route.params.id]);

  if (erro) {
    return (
      <View style={styles.centralizado}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#A42618" />
      </View>
    );
  }

  const ano = filme.release_date?.slice(0, 4) || "Sem data";
  const duracao = filme.runtime
    ? `${Math.floor(filme.runtime / 60)}h ${filme.runtime % 60}min`
    : "Duração não informada";

  const favorito = estaFavorito(filme.id);

  return (
    <ScrollView style={styles.container}>
      {filme.backdrop_path && (
        <Image
          source={{ uri: buscarImagem(filme.backdrop_path, "w780") }}
          style={styles.banner}
        />
      )}

      <View style={styles.conteudo}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>‹ Voltar</Text>
        </Pressable>

        <View style={styles.informacoes}>
          {filme.poster_path && (
            <Image
              source={{ uri: buscarImagem(filme.poster_path) }}
              style={styles.poster}
            />
          )}

          <View style={styles.resumo}>
            <Text style={styles.titulo}>{filme.title}</Text>
            <Text style={styles.nota}>
              ★ {filme.vote_average.toFixed(1)}
            </Text>
            <Text style={styles.texto}>{ano}</Text>
            <Text style={styles.texto}>{duracao}</Text>
          </View>
        </View>

        <Text style={styles.generos}>
          {filme.genres.map((genero) => genero.name).join(" • ")}
        </Text>

        <Pressable
          style={[styles.botao, favorito && styles.botaoAtivo]}
          onPress={() => alternarFavorito(filme)}
        >
          <Text style={styles.botaoTexto}>
            {favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </Text>
        </Pressable>

        <Text style={styles.subtitulo}>Sinopse</Text>

        <Text style={styles.sinopse}>
          {filme.overview || "Sinopse não disponível."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080405",
  },
  centralizado: {
    flex: 1,
    backgroundColor: "#080405",
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
    color: "#D5D7DC",
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
    color: "#D5D7DC",
    fontSize: 25,
    fontWeight: "bold",
  },
  nota: {
    color: "#A42618",
    fontSize: 17,
    marginVertical: 10,
  },
  texto: {
    color: "#8990A4",
    fontSize: 15,
    marginTop: 5,
  },
  generos: {
    color: "#8990A4",
    fontSize: 15,
    marginTop: 20,
  },
  botao: {
    backgroundColor: "#A42618",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  botaoAtivo: {
    backgroundColor: "#55585B",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#D5D7DC",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 10,
  },
  sinopse: {
    color: "#D5D7DC",
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 30,
  },
  erro: {
    color: "#A42618",
    fontSize: 16,
  }
});