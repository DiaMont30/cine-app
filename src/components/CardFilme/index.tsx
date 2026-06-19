import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../routes/StackRoutes";
import { Filme } from "../../domains/entities/Filme";
import { buscarImagem } from "../../data/tmdbV3";


type Props = {
  filme: Filme;
};

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function CardFilme({ filme }: Props) {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("Detalhes", { id: filme.id })}
    >
      {filme.poster_path ? (
        <Image
          source={{ uri: buscarImagem(filme.poster_path) }}
          style={styles.imagem}
        />
      ) : (
        <View style={[styles.imagem, styles.semImagem]}>
          <Text style={styles.texto}>Sem imagem</Text>
        </View>
      )}

      <Text style={styles.titulo} numberOfLines={2}>
        {filme.title}
      </Text>

      <Text style={styles.nota}>★ {filme.vote_average.toFixed(1)}</Text>
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
    backgroundColor: "#171719",
  },
  semImagem: {
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    color: "#8990A4",
  },
  titulo: {
    color: "#D5D7DC",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
  },
  nota: {
    color: "#A42618",
    fontSize: 14,
    marginTop: 4,
  },
});
