import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { RootStackParamList } from "../../routes/StackRoutes";
import {
  buscarFilmesPopulares,
  buscarImagem,
  buscarLancamentos,
  buscarMaisAvaliados,
  Filme,
} from "../../services/api";
import { darkTheme } from "../../themes/themes";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function Home() {
  const navigation = useNavigation<Navigation>();
  const [populares, setPopulares] = useState<Filme[]>([]);
  const [avaliados, setAvaliados] = useState<Filme[]>([]);
  const [lancamentos, setLancamentos] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([
      buscarFilmesPopulares(),
      buscarMaisAvaliados(),
      buscarLancamentos(),
    ])
      .then(([populares, avaliados, lancamentos]) => {
        setPopulares(populares);
        setAvaliados(avaliados);
        setLancamentos(lancamentos);
      })
      .catch(() => setErro("Não foi possível carregar os filmes."))
      .finally(() => setLoading(false));
  }, []);

  const destaque = populares[0];

  function ListaFilmes({
    titulo,
    filmes,
  }: {
    titulo: string;
    filmes: Filme[];
  }) {
    return (
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>{titulo}</Text>

        <FlatList
          data={filmes}
          horizontal
          keyExtractor={(filme) => filme.id.toString()}
          renderItem={({ item }) => <CardFilme filme={item} />}
          ItemSeparatorComponent={() => <View style={styles.espaco} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lista}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#A42618" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centralizado}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>CineApp</Text>
          <Text style={styles.subtitulo}>
            Descubra seus próximos filmes favoritos
          </Text>
        </View>

        {destaque?.backdrop_path && (
          <Pressable
            style={styles.destaque}
            onPress={() => navigation.navigate("Detalhes", { id: destaque.id })}
          >
            <ImageBackground
              source={{
                uri: buscarImagem(destaque.backdrop_path, "w780"),
              }}
              style={styles.banner}
              imageStyle={styles.bannerImagem}
            >
              <View style={styles.sombra}>
                <View>
                  <Text style={styles.destaqueTexto}>Em destaque</Text>

                  <Text style={styles.destaqueTitulo} numberOfLines={2}>
                    {destaque.title}
                  </Text>

                  <Text style={styles.nota}>
                    ★ {destaque.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        )}

        <ListaFilmes titulo="Filmes populares" filmes={populares} />
        <ListaFilmes titulo="Mais bem avaliados" filmes={avaliados} />
        <ListaFilmes titulo="Lançamentos" filmes={lancamentos} />
      </ScrollView>
    </SafeAreaView>
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
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titulo: {
    color: "#D5D7DC",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#8990A4",
    fontSize: 16,
    marginTop: 6,
  },
  destaque: {
    margin: 20,
  },
  banner: {
    height: 220,
  },
  bannerImagem: {
    borderRadius: 16,
  },
  sombra: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderRadius: 16,
    justifyContent: "flex-end",
    padding: 20,
  },
  destaqueTexto: {
    color: "#D5D7DC",
    fontSize: 14,
  },
  destaqueTitulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  nota: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 8,
  },
  secao: {
    marginBottom: 30,
  },
  secaoTitulo: {
    color: "#D5D7DC",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  espaco: {
    width: 16,
  },
  erro: {
    color: darkTheme.primary,
    fontSize: 16,
  },
  lista: {
    paddingHorizontal: 20,
  },
});
