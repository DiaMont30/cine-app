import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Image, Pressable, Text, View } from "react-native";
import { TabParamList } from "../../routes/TabRoutes";
import { Filme } from "../../domains/entities/Filme";
import { buscarImagem } from "../../data/tmdbV3";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "./styles";

type Props = {
  filme: Filme;
};

type Navigation = BottomTabNavigationProp<TabParamList>;

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
        <View
          style={[
            styles.imagem,
            styles.semImagem,
            { backgroundColor: theme.surface },
          ]}
        >
          <Text style={[styles.texto, { color: theme.muted }]}>Sem imagem</Text>
        </View>
      )}

      <Text style={[styles.titulo, { color: theme.text }]} numberOfLines={2}>
        {filme.title}
      </Text>

      <Text style={[styles.nota, { color: theme.primary }]}>
        ★ {filme.vote_average.toFixed(1)}
      </Text>
    </Pressable>
  );
}
