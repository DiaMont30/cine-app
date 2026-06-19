import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export function Login() {
  const { signIn } = useAuth();
  const [entrando, setEntrando] = useState(false);
  const { theme } = useTheme();

  async function handleEntrar() {
    try {
      setEntrando(true);
      await signIn();
    } finally {
      setEntrando(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.conteudo}>
        <Image
          source={require("../../../assets/Logo-sem-fundo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.titulo, { color: theme.text }]}>CineApp</Text>

        <Text style={[styles.descricao, { color: theme.muted }]}>
          Entre com sua conta TMDB para favoritar filmes, marcar como assistido
          e acompanhar lançamentos.
        </Text>

        <Pressable
          style={[styles.botao, { backgroundColor: theme.primary }, entrando && styles.botaoDesabilitado]}
          onPress={handleEntrar}
          disabled={entrando}
        >
          {entrando ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text style={[styles.botaoTexto, { color: theme.white }]}>Entrar com TMDB</Text>
          )}
        </Pressable>

        <Text style={[styles.creditos, { color: theme.muted }]}>
          Este produto usa a API do TMDB, mas não é endossado ou certificado
          pelo TMDB.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  descricao: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
  creditos: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 40,
    paddingHorizontal: 16,
  },
});
