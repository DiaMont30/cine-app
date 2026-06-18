import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { colors } from "../../themes/colors";

export function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Meus favoritos</Text>

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
          <Text style={styles.texto}>Nenhum filme favoritado.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  titulo: {
    color: colors.text,
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
    color: colors.muted,
    fontSize: 16,
  },
});
