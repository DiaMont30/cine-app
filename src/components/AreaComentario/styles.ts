import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  subtitulo: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  cardComentario: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  textoComentario: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
  },
  botaoEditar: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  textoEditar: {
    fontWeight: "bold",
    fontSize: 14,
  },
  botaoSalvar: {
    marginTop: 20,
  },
});
