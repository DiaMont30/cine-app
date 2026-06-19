import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../routes/StackRoutes";
import { Filme } from "../../domains/entities/Filme";
import { buscarImagem } from "../../data/tmdbV3";
import { useTheme } from "../../contexts/ThemeContext";
type Props = {
  filme: Filme;
};

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function CardFilme({ filme }: Props) {
  const navigation = useNavigation<Navigation>();
  const { theme } = useTheme();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("Detalhes", { id: filme.id })}
    >
      {filme.poster_path ? (
        <Image
          source={{ uri: buscarImagem(filme.poster_path) }}
          style={[styles.imagem, { backgroundColor: theme.surface }]}
        />
      ) : (
        <View style={[styles.imagem, styles.semImagem, { backgroundColor: theme.surface }]}>
          <Text style={[styles.texto, { color: theme.muted }]}>Sem imagem</Text>
        </View>
      )}

      <Text style={[styles.titulo, { color: theme.text }]} numberOfLines={2}>
        {filme.title}
      </Text>

      <Text style={[styles.nota, { color: theme.primary }]}>★ {filme.vote_average.toFixed(1)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
  },
  imagem: {
    width: 150,
    height: 225,
    borderRadius: 12,
  },
  semImagem: {
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
  },
  titulo: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
  },
  nota: {
    fontSize: 14,
    marginTop: 4,
  },
});
