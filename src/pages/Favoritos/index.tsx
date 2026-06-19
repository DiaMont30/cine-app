import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { useTheme } from "../../contexts/ThemeContext";

export function Favoritos() {
  const { favoritos } = useFavoritos();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.titulo, { color: theme.text }]}>Meus favoritos</Text>

      {favoritos.length ? (
        <FlatList
          data={favoritos}
          numColumns={2}
          keyExtractor={(filme) => filme.id.toString()}
          renderItem={({ item }) => <CardFilme filme={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          columnWrapperStyle={styles.colunas}
        />
      ) : (
        <View style={styles.vazio}>
          <Text style={[styles.texto, { color: theme.muted }]}>Nenhum filme favoritado.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },
  lista: {
    paddingBottom: 24,
  },
  colunas: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 16,
  },
});
