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
import { Filme } from "../../domains/entities/Filme";
import {
  buscarFilmesPopulares,
  buscarImagem,
  buscarLancamentos,
  buscarMaisAvaliados,
} from "../../data/tmdbV3";
import { useTheme } from "../../contexts/ThemeContext";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function Home() {
  const navigation = useNavigation<Navigation>();
  const { theme } = useTheme();
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
      .then(([popularesData, avaliadosData, lancamentosData]) => {
        setPopulares(popularesData);
        setAvaliados(avaliadosData);
        setLancamentos(lancamentosData);
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
        <Text style={[styles.secaoTitulo, { color: theme.text }]}>{titulo}</Text>

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
      <View style={[styles.centralizado, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centralizado, { backgroundColor: theme.background }]}>
        <Text style={[styles.erro, { color: theme.primary }]}>{erro}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cabecalho}>
          <Text style={[styles.titulo, { color: theme.text }]}>CineApp</Text>
          <Text style={[styles.subtitulo, { color: theme.muted }]}>
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
                uri: buscarImagem(destaque.backdrop_path, "780"),
              }}
              style={styles.banner}
              imageStyle={styles.bannerImagem}
            >
              <View style={[styles.sombra, { backgroundColor: theme.overlay }]}>
                <View>
                  <Text style={[styles.destaqueTexto, { color: theme.text }]}>Em destaque</Text>

                  <Text style={[styles.destaqueTitulo, { color: theme.white }]} numberOfLines={2}>
                    {destaque.title}
                  </Text>

                  <Text style={[styles.nota, { color: theme.white }]}>
                    {destaque.vote_average.toFixed(1)}
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
  },
  centralizado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitulo: {
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
    borderRadius: 16,
    justifyContent: "flex-end",
    padding: 20,
  },
  destaqueTexto: {
    fontSize: 14,
  },
  destaqueTitulo: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  nota: {
    fontSize: 16,
    marginTop: 8,
  },
  secao: {
    marginBottom: 30,
  },
  secaoTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  espaco: {
    width: 16,
  },
  erro: {
    fontSize: 16,
  },
  lista: {
    paddingHorizontal: 20,
  },
});
