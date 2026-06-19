import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { colors } from "../../themes/colors";
import { Filme } from "../../domains/entities/Filme";
import { buscarFilmes } from "../../data/tmdbV3";

export function Buscar() {
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function pesquisar() {
    const texto = busca.trim();

    if (!texto) {
      setMensagem("Digite o nome de um filme.");
      setFilmes([]);
      return;
    }

    try {
      setLoading(true);
      setMensagem("");

      const resultado = await buscarFilmes(texto);
      setFilmes(resultado);

      if (!resultado.length) {
        setMensagem("Nenhum filme encontrado.");
      }
    } catch {
      setMensagem("Não foi possível buscar os filmes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Buscar filmes</Text>

      <View style={styles.busca}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome de um filme"
          placeholderTextColor="#8990A4"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={pesquisar}
          returnKeyType="search"
        />

        <Pressable style={styles.botao} onPress={pesquisar}>
          <Text style={styles.botaoTexto}>Buscar</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={colors.primary}
        />
      ) : mensagem ? (
        <Text style={styles.mensagem}>{mensagem}</Text>
      ) : (
        <FlatList
          data={filmes}
          numColumns={2}
          keyExtractor={(filme) => filme.id.toString()}
          renderItem={({ item }) => <CardFilme filme={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          columnWrapperStyle={styles.colunas}
        />
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
  busca: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
    padding: 14,
    borderRadius: 10,
  },
  botao: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  botaoTexto: {
    color: colors.white,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 40,
  },
  mensagem: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
  },
  lista: {
    paddingVertical: 24,
  },
  colunas: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
