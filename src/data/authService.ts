import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Usuario } from "../domains/entities/Usuario";
import { buscarContaLogada, criarRequestToken, criarSessao } from "./tmdbV3";


WebBrowser.maybeCompleteAuthSession();




const REDIRECT_URI = Linking.createURL("auth", { scheme: "cineapp" });

const urlAprovacao = (token: string) =>
  `https://www.themoviedb.org/authenticate/${token}?redirect_to=${REDIRECT_URI}`;

type ResultadoSignIn = {
  sessionId: string;
  usuario: Usuario;
};

export async function executarSignIn(): Promise<ResultadoSignIn | null> {
  const requestToken = await criarRequestToken();

  const resultado = await WebBrowser.openAuthSessionAsync(
    urlAprovacao(requestToken),
    REDIRECT_URI,
  );

  if (resultado.type !== "success") {
    return null;
  }

  const sessionId = await criarSessao(requestToken);

  const conta = await buscarContaLogada(sessionId);

  const usuario: Usuario = {
    id: conta.id,
    username: conta.username,
    name: conta.name,
    avatarPath: conta.avatar.tmdb?.avatar_path,
    idioma: conta.iso_639_1,
    regiao: conta.iso_3166_1,
  };

  return { sessionId, usuario };
}
