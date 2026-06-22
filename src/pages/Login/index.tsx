import { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { usePosteresDestaque } from "../../utils/hooks/usePosterDestaque";
import { PosterGrid } from "../../components/PosterGrid";
import { ActionButton } from "../../components/ActionButton";

export function Login() {
  const { signIn } = useAuth();
  const [entrando, setEntrando] = useState(false);
  const { theme, isDark } = useTheme();
  const posteres = usePosteresDestaque();

  async function handleEntrar() {
    try {
      setEntrando(true);
      await signIn();
    } finally {
      setEntrando(false);
    }
  }

  const logo = isDark
    ? require("../../../assets/Logo-dark.png")
    : require("../../../assets/Logo-light.png");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <PosterGrid posteres={posteres} theme={theme} />

      <View style={styles.conteudo}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={[styles.descricao, { color: theme.muted }]}>
          Entre com sua conta TMDB para favoritar filmes, marcar como assistido
          e acompanhar lançamentos.
        </Text>

        <ActionButton
          titulo="Entrar com TMDB"
          onPress={handleEntrar}
          carregando={entrando}
          accessibilityRole="button"
          accessibilityLabel="Entrar com sua conta TMDB"
        />

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
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 300,
    height: Platform.OS === "web" ? 300 : 200,
  },
  descricao: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
    marginBottom: 30,
  },
  creditos: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 16,
  },
});
