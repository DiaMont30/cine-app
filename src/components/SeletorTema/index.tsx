import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export function SeletorTema() {
    const { theme, mode, setMode } = useTheme();
    const [modalTema, setModalTema] = useState(false);

    const textoTema = {
        system: "Automático",
        light: "Claro",
        dark: "Escuro",
    }[mode];

    function alterarTema() {
        setModalTema(true);
    }

    return (
        <>
            <Pressable
                style={({ pressed }) => [
                    styles.informacao,
                    pressed && { opacity: 0.7 }
                ]}
                onPress={alterarTema}
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
                        <Text style={[styles.rotulo, { color: theme.muted }]}>Aparência</Text>
                        <Text style={[styles.valor, { color: theme.text }]}>{textoTema}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.muted} />
                </View>
            </Pressable>

            <Modal visible={modalTema} transparent animationType="fade">
                <Pressable style={[styles.modalOverlay, { backgroundColor: theme.overlay }]} onPress={() => setModalTema(false)}>
                    <View style={[styles.modalConteudo, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.modalTitulo, { color: theme.text }]}>Aparência</Text>
                        
                        <Pressable style={[styles.modalOpcao, { borderBottomColor: theme.secondary }]} onPress={() => { setMode("system"); setModalTema(false); }}>
                            <Text style={[styles.modalOpcaoTexto, { color: mode === "system" ? theme.primary : theme.text }]}>Automático</Text>
                            {mode === "system" && <Ionicons name="checkmark" size={20} color={theme.primary} />}
                        </Pressable>
                        
                        <Pressable style={[styles.modalOpcao, { borderBottomColor: theme.secondary }]} onPress={() => { setMode("light"); setModalTema(false); }}>
                            <Text style={[styles.modalOpcaoTexto, { color: mode === "light" ? theme.primary : theme.text }]}>Claro</Text>
                            {mode === "light" && <Ionicons name="checkmark" size={20} color={theme.primary} />}
                        </Pressable>
                        
                        <Pressable style={[styles.modalOpcao, { borderBottomColor: theme.secondary }]} onPress={() => { setMode("dark"); setModalTema(false); }}>
                            <Text style={[styles.modalOpcaoTexto, { color: mode === "dark" ? theme.primary : theme.text }]}>Escuro</Text>
                            {mode === "dark" && <Ionicons name="checkmark" size={20} color={theme.primary} />}
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
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
