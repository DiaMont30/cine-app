import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  informacao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  linhaBotao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icone: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  rotulo: {
    fontSize: 13,
  },
  valor: {
    fontSize: 16,
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalConteudo: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOpcao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalOpcaoTexto: {
    fontSize: 16,
    fontWeight: "500",
  },
});
