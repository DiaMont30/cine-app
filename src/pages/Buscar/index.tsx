import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton } from "../../components/ActionButton";
import { CardFilme } from "../../components/CardFilme";
import { Input } from "../../components/Input";
import { useTheme } from "../../contexts/ThemeContext";
import { buscarFilmes } from "../../data/tmdbV3";
import { Filme } from "../../domains/entities/Filme";
import styles from "./styles";

export function Buscar() {
  const { theme } = useTheme();
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.titulo, { color: theme.text }]}>Buscar filmes</Text>

      <View style={styles.busca}>
        <Input
          containerStyle={styles.input}
          style={styles.alturaInput}
          placeholder="Digite o nome de um filme"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={pesquisar}
          returnKeyType="search"
        />

        <ActionButton
          titulo="Buscar"
          onPress={pesquisar}
          disabled={loading}
          containerStyle={styles.botao}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={theme.primary}
        />
      ) : mensagem ? (
        <Text style={[styles.mensagem, { color: theme.muted }]}>
          {mensagem}
        </Text>
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

