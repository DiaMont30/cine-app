import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "./styles";

const OPCOES_TEMA = [
  { id: "system", label: "Automático" },
  { id: "light", label: "Claro" },
  { id: "dark", label: "Escuro" },
] as const;

export function SeletorTema() {
  const { theme, mode, setMode } = useTheme();
  const [modalTema, setModalTema] = useState(false);

  const textoTema =
    OPCOES_TEMA.find((opcao) => opcao.id === mode)?.label || "Automático";

  function handleSelecionarTema(novoModo: "system" | "light" | "dark") {
    setMode(novoModo);
    setModalTema(false);
  }

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.informacao,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => setModalTema(true)}
      >
        <View style={[styles.icone, { backgroundColor: theme.background }]}>
          <Ionicons
            name="color-palette-outline"
            size={22}
            color={theme.primary}
          />
        </View>

        <View style={styles.linhaBotao}>
          <View>
            <Text style={[styles.rotulo, { color: theme.muted }]}>
              Aparência
            </Text>
            <Text style={[styles.valor, { color: theme.text }]}>
              {textoTema}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.muted} />
        </View>
      </Pressable>

      <Modal visible={modalTema} transparent animationType="fade">
        <Pressable
          style={[styles.modalOverlay, { backgroundColor: theme.overlay }]}
          onPress={() => setModalTema(false)}
        >
          <View
            style={[styles.modalConteudo, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.modalTitulo, { color: theme.text }]}>
              Aparência
            </Text>
            {OPCOES_TEMA.map((opcao) => (
              <Pressable
                key={opcao.id}
                style={[
                  styles.modalOpcao,
                  { borderBottomColor: theme.secondary },
                ]}
                onPress={() => handleSelecionarTema(opcao.id)}
              >
                <Text
                  style={[
                    styles.modalOpcaoTexto,
                    { color: mode === opcao.id ? theme.primary : theme.text },
                  ]}
                >
                  {opcao.label}
                </Text>
                {mode === opcao.id && (
                  <Ionicons name="checkmark" size={20} color={theme.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
