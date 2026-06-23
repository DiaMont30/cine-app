import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centralizado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    height: 230,
  },
  conteudo: {
    padding: 20,
  },
  voltar: {
    fontSize: 17,
    marginBottom: 20,
  },
  informacoes: {
    flexDirection: "row",
    gap: 18,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 12,
  },
  resumo: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
  },
  nota: {
    fontSize: 17,
    marginVertical: 10,
  },
  texto: {
    fontSize: 15,
    marginTop: 5,
  },
  generos: {
    fontSize: 15,
    marginTop: 20,
  },
  botaoMargin: {
    marginTop: 24,
  },
  botaoAssistidoMargin: {
    marginTop: 12,
  },
  subtitulo: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 30,
  },
  erro: {
    fontSize: 16,
  },
});
