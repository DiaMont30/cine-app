import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },
  centralizado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  mensagem: {
    fontSize: 16,
    textAlign: "center",
  },
  lista: {
    paddingBottom: 24,
  },
  colunas: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  item: {
    alignItems: "center",
  },
  botaoRemover: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    minHeight: 0,
  },
  botaoTentar: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
