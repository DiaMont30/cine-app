import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "../domains/entities/Usuario";

const CHAVE_SESSION_ID = "@cineapp:sessionId";
const CHAVE_USUARIO = "@cineapp:usuario";
const CHAVE_TEMA = "@cineapp:tema";

export async function salvarSessaoAuth(sessionId: string, usuario: Usuario) {
  await AsyncStorage.setItem(CHAVE_SESSION_ID, sessionId);
  await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function buscarSessaoAuth(): Promise<{
  sessionId: string;
  usuario: Usuario;
} | null> {
  const sessionId = await AsyncStorage.getItem(CHAVE_SESSION_ID);
  const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

  if (!sessionId || !usuarioSalvo) {
    return null;
  }

  return {
    sessionId,
    usuario: JSON.parse(usuarioSalvo) as Usuario,
  };
}

export async function limparSessaoAuth() {
  await AsyncStorage.removeItem(CHAVE_SESSION_ID);
  await AsyncStorage.removeItem(CHAVE_USUARIO);
}

export async function salvarTema(tema: string) {
  await AsyncStorage.setItem(CHAVE_TEMA, tema);
}

export async function buscarTema(): Promise<string | null> {
  return await AsyncStorage.getItem(CHAVE_TEMA);
}
