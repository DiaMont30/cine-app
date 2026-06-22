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
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 6,
  },
  destaque: {
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  banner: {
    width: "100%",
    height: 220,
  },
  bannerImagem: {
    borderRadius: 16,
  },
  sombra: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
    padding: 20,
  },
  destaqueTexto: {
    fontSize: 14,
  },
  destaqueTitulo: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  nota: {
    fontSize: 16,
    marginTop: 8,
  },
  secao: {
    marginBottom: 30,
  },
  secaoTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  espaco: {
    width: 16,
  },
  erro: {
    fontSize: 16,
  },
  lista: {
    paddingHorizontal: 20,
  },
});

