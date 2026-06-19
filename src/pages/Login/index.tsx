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
import { darkTheme } from "../../themes/themes";

export function Login() {
  const { signIn } = useAuth();
  const [entrando, setEntrando] = useState(false);

  async function handleEntrar() {
    try {
      setEntrando(true);
      await signIn();
    } finally {
      setEntrando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Image
          source={require("../../../assets/Logo-sem-fundo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>CineApp</Text>

        <Text style={styles.descricao}>
          Entre com sua conta TMDB para favoritar filmes, marcar como assistido
          e acompanhar lançamentos.
        </Text>

        <Pressable
          style={[styles.botao, entrando && styles.botaoDesabilitado]}
          onPress={handleEntrar}
          disabled={entrando}
        >
          {entrando ? (
            <ActivityIndicator color={darkTheme.white} />
          ) : (
            <Text style={styles.botaoTexto}>Entrar com TMDB</Text>
          )}
        </Pressable>

        <Text style={styles.creditos}>
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
    backgroundColor: darkTheme.background,
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
    color: darkTheme.text,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  descricao: {
    color: darkTheme.muted,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  botao: {
    backgroundColor: darkTheme.primary,
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
    color: darkTheme.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  creditos: {
    color: darkTheme.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 40,
    paddingHorizontal: 16,
  },
});
