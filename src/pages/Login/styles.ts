import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
