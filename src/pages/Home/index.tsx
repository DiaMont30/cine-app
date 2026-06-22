import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { useTheme } from "../../contexts/ThemeContext";
import {
  buscarFilmesPopulares,
  buscarImagem,
  buscarLancamentos,
  buscarMaisAvaliados,
} from "../../data/tmdbV3";
import { Filme } from "../../domains/entities/Filme";
import { RootStackParamList } from "../../routes/StackRoutes";
import { styles } from "./styles";

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
  const imagemDestaque = destaque?.backdrop_path;

  function ListaFilmes({
    titulo,
    filmes,
  }: {
    titulo: string;
    filmes: Filme[];
  }) {
    return (
      <View style={styles.secao}>
        <Text style={[styles.secaoTitulo, { color: theme.text }]}>
          {titulo}
        </Text>

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cabecalho}>
          <Text style={[styles.titulo, { color: theme.text }]}>CineApp</Text>

          <Text style={[styles.subtitulo, { color: theme.muted }]}>
            Descubra seus próximos filmes favoritos
          </Text>
        </View>

        {destaque && imagemDestaque && (
          <Pressable
            style={styles.destaque}
            onPress={() =>
              navigation.navigate("Detalhes", { id: destaque.id })
            }
          >
            <ImageBackground
              source={{
                uri: buscarImagem(imagemDestaque, "w780"),
              }}
              style={styles.banner}
              imageStyle={styles.bannerImagem}
              resizeMode="cover"
            >
              <View style={styles.sombra}>
                <Text
                  style={[styles.destaqueTexto, { color: theme.white }]}
                >
                  Em destaque
                </Text>

                <Text
                  style={[styles.destaqueTitulo, { color: theme.white }]}
                  numberOfLines={2}
                >
                  {destaque.title}
                </Text>

                <Text style={[styles.nota, { color: theme.white }]}>
                  ★ {destaque.vote_average.toFixed(1)}
                </Text>
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
