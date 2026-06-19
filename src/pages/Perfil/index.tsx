import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { SeletorTema } from "../../components/SeletorTema";
export function Perfil() {
    const { usuario, signOut } = useAuth();
    const { theme } = useTheme();

    async function sair() {
        Alert.alert(
            "Sair da conta",
            "Deseja realmente sair do CineApp?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: signOut,
                },
            ],
        );
    }

    if (!usuario) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.centralizado}>
                    <Ionicons
                        name="person-circle-outline"
                        size={90}
                        color={theme.muted}
                    />

                    <Text style={[styles.mensagem, { color: theme.muted }]}>
                        Não foi possível carregar os dados do usuário.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const nome = usuario.name || usuario.username;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.titulo, { color: theme.text }]}>Meu perfil</Text>

            <View style={styles.perfil}>
                {usuario.avatarPath ? (
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w185${usuario.avatarPath}`,
                        }}
                        style={[styles.avatar, { borderColor: theme.primary }]}
                    />
                ) : (
                    <View style={[styles.avatarPadrao, { backgroundColor: theme.surface, borderColor: theme.primary }]}>
                        <Ionicons
                            name="person-outline"
                            size={54}
                            color={theme.text}
                        />
                    </View>
                )}

                <Text style={[styles.nome, { color: theme.text }]}>{nome}</Text>
                <Text style={[styles.usuario, { color: theme.muted }]}>@{usuario.username}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
                <View style={styles.informacao}>
                    <View style={[styles.icone, { backgroundColor: theme.background }]}>
                        <Ionicons
                            name="language-outline"
                            size={22}
                            color={theme.primary}
                        />
                    </View>

                    <View>
                        <Text style={[styles.rotulo, { color: theme.muted }]}>Idioma</Text>
                        <Text style={[styles.valor, { color: theme.text }]}>
                            {usuario.idioma || "Não informado"}
                        </Text>
                    </View>
                </View>

                <View style={[styles.divisor, { backgroundColor: theme.secondary }]} />

                <View style={styles.informacao}>
                    <View style={[styles.icone, { backgroundColor: theme.background }]}>
                        <Ionicons
                            name="location-outline"
                            size={22}
                            color={theme.primary}
                        />
                    </View>

                    <View>
                        <Text style={[styles.rotulo, { color: theme.muted }]}>Região</Text>
                        <Text style={[styles.valor, { color: theme.text }]}>
                            {usuario.regiao || "Não informada"}
                        </Text>
                    </View>
                </View>

                <View style={[styles.divisor, { backgroundColor: theme.secondary }]} />

                <View style={styles.informacao}>
                    <View style={[styles.icone, { backgroundColor: theme.background }]}>
                        <Ionicons
                            name="id-card-outline"
                            size={22}
                            color={theme.primary}
                        />
                    </View>

                    <View>
                        <Text style={[styles.rotulo, { color: theme.muted }]}>Identificação da conta</Text>
                        <Text style={[styles.valor, { color: theme.text }]}>{usuario.id}</Text>
                    </View>
                </View>

                <View style={[styles.divisor, { backgroundColor: theme.secondary }]} />

                <SeletorTema />
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.botao,
                    { backgroundColor: theme.primary },
                    pressed && styles.botaoPressionado,
                ]}
                onPress={sair}
            >
                <Ionicons name="log-out-outline" size={22} color={theme.white} />
                <Text style={[styles.botaoTexto, { color: theme.white }]}>Sair da conta</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    centralizado: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 20,
    },
    perfil: {
        alignItems: "center",
        marginBottom: 28,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
    },
    avatarPadrao: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    nome: {
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 16,
    },
    usuario: {
        fontSize: 16,
        marginTop: 4,
    },
    card: {
        borderRadius: 16,
        paddingHorizontal: 18,
    },
    informacao: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
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
    divisor: {
        height: 1,
        opacity: 0.4,
    },
    botao: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 15,
        borderRadius: 12,
        marginTop: 28,
    },
    botaoPressionado: {
        opacity: 0.8,
    },
    botaoTexto: {
        fontSize: 16,
        fontWeight: "bold",
    },
    mensagem: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 16,
    },
    creditos: {
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
        marginTop: 24,
    },
});