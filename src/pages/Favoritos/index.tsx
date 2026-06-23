import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./styles";
import { ActionButton } from "../../components/ActionButton";

export function Favoritos() {
  const { favoritos, alternarFavorito } = useFavoritos();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.titulo, { color: theme.text }]}>Meus favoritos</Text>

      {favoritos.length ? (
        <FlatList
          data={favoritos}
          numColumns={2}
          keyExtractor={(filme) => filme.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <CardFilme filme={item} />

              <ActionButton
                titulo="Remover"
                onPress={() => alternarFavorito(item)}
                containerStyle={[
                  styles.botaoRemover,
                  { borderColor: theme.primary },
                ]}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          columnWrapperStyle={styles.colunas}
        />
      ) : (
        <View style={styles.vazio}>
          <Text style={[styles.texto, { color: theme.muted }]}>
            Nenhum filme favoritado.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
