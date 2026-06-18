import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { Usuario } from "../domains/entities/Usuario";
import {
  buscarSessaoAuth,
  limparSessaoAuth,
  salvarSessaoAuth,
} from "../data/storage";
import { executarSignIn } from "../data/authService";
import { encerrarSessao } from "../data/tmdbV3";

type AuthContextData = {
  signed: boolean;
  loading: boolean;
  usuario: Usuario | null;
  sessionId: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarSessaoSalva() {
      try {
        const sessaoSalva = await buscarSessaoAuth();
        if (sessaoSalva) {
          setSessionId(sessaoSalva.sessionId);
          setUsuario(sessaoSalva.usuario);
        }
      } catch {
        await limparSessaoAuth();
      } finally {
        setLoading(false);
      }
    }

    carregarSessaoSalva();
  }, []);

  const signIn = useCallback(async () => {
    try {
      const resultado = await executarSignIn();

      if (!resultado) return;

      await salvarSessaoAuth(resultado.sessionId, resultado.usuario);
      setSessionId(resultado.sessionId);
      setUsuario(resultado.usuario);
    } catch (erro) {
      Alert.alert(
        "Erro ao entrar",
        "Não foi possível fazer login. Tente novamente.",
      );
      console.error("[AuthContext] signIn:", erro);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (sessionId) {
        await encerrarSessao(sessionId);
      }
    } catch (erro) {
      console.warn("[AuthContext] Erro ao encerrar sessão na TMDB", erro);
    } finally {
      await limparSessaoAuth();
      setSessionId(null);
      setUsuario(null);
    }
  }, [sessionId]);

  return (
    <AuthContext.Provider
      value={{
        signed: !!sessionId,
        loading,
        usuario,
        sessionId,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
