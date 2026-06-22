import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  conteudoInterno: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerIcone: {
    marginRight: 8,
  },
  botaoPressionado: {
    opacity: 0.85,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
