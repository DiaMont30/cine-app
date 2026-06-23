import { StyleSheet } from "react-native";

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
  item: {
    flex: 1,
    maxWidth: "48%",
    marginBottom: 20,
  },
  botaoRemover: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    minHeight: 0,
  },
});

export default styles;
