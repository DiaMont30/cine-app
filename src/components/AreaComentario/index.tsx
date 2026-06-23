import { useState, useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { atualizarComentarioFilme } from "../../data/tmdbV4";
import { ActionButton } from "../ActionButton";
import { Input } from "../Input";
import { styles } from "./styles";

interface AreaComentarioProps {
  listId: number;
  filmeId: number;
  sessionId: string;
  comentarioInicial: string | null;
}

export function AreaComentario({
  listId,
  filmeId,
  sessionId,
  comentarioInicial,
}: AreaComentarioProps) {
  const { theme } = useTheme();

  const [comentario, setComentario] = useState("");
  const [comentarioSalvo, setComentarioSalvo] = useState<string | null>(null);
  const [salvandoComentario, setSalvandoComentario] = useState(false);

  useEffect(() => {
    if (comentarioInicial) {
      setComentarioSalvo(comentarioInicial);
      setComentario(comentarioInicial);
    } else {
      setComentarioSalvo(null);
      setComentario("");
    }
  }, [comentarioInicial]);

  async function handleSalvarComentario() {
    if (comentario.trim().length === 0) {
      Alert.alert("Atenção", "Digite um comentário antes de salvar.");
      return;
    }

    try {
      setSalvandoComentario(true);
      await atualizarComentarioFilme(listId, filmeId, comentario, sessionId);
      setComentarioSalvo(comentario);
    } catch (error) {
      console.error("[AreaComentario] handleSalvarComentario:", error);
      Alert.alert("Erro", "Não foi possível salvar o comentário.");
    } finally {
      setSalvandoComentario(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.subtitulo, { color: theme.text }]}>
        Sua Avaliação
      </Text>

      {comentarioSalvo !== null ? (
        <View
          style={[styles.cardComentario, { backgroundColor: theme.surface }]}
        >
          <Text style={[styles.textoComentario, { color: theme.text }]}>
            "{comentarioSalvo}"
          </Text>

          <Pressable
            onPress={() => setComentarioSalvo(null)}
            style={styles.botaoEditar}
          >
            <Text style={[styles.textoEditar, { color: theme.primary }]}>
              Editar comentário
            </Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Input
            placeholder="O que achou do filme?"
            value={comentario}
            onChangeText={setComentario}
            returnKeyType="send"
            onSubmitEditing={handleSalvarComentario}
          />

          <ActionButton
            titulo="Salvar Comentário"
            onPressIn={handleSalvarComentario}
            carregando={salvandoComentario}
            containerStyle={[styles.botaoSalvar]}
          />
        </View>
      )}
    </View>
  );
}
