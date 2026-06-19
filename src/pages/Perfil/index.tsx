import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { darkTheme as colors } from "../../themes/themes";

export function Perfil() {
    const { usuario, signOut } = useAuth();

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
            <SafeAreaView style={styles.container}>
                <View style={styles.centralizado}>
                    <Ionicons
                        name="person-circle-outline"
                        size={90}
                        color={colors.muted}
                    />

                    <Text style={styles.mensagem}>
                        Não foi possível carregar os dados do usuário.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const nome = usuario.name || usuario.username;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Meu perfil</Text>

            <View style={styles.perfil}>
                {usuario.avatarPath ? (
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w185${usuario.avatarPath}`,
                        }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.avatarPadrao}>
                        <Ionicons
                            name="person-outline"
                            size={54}
                            color={colors.text}
                        />
                    </View>
                )}

                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.usuario}>@{usuario.username}</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.informacao}>
                    <View style={styles.icone}>
                        <Ionicons
                            name="language-outline"
                            size={22}
                            color={colors.primary}
                        />
                    </View>

                    <View>
                        <Text style={styles.rotulo}>Idioma</Text>
                        <Text style={styles.valor}>
                            {usuario.idioma || "Não informado"}
                        </Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.informacao}>
                    <View style={styles.icone}>
                        <Ionicons
                            name="location-outline"
                            size={22}
                            color={colors.primary}
                        />
                    </View>

                    <View>
                        <Text style={styles.rotulo}>Região</Text>
                        <Text style={styles.valor}>
                            {usuario.regiao || "Não informada"}
                        </Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.informacao}>
                    <View style={styles.icone}>
                        <Ionicons
                            name="id-card-outline"
                            size={22}
                            color={colors.primary}
                        />
                    </View>

                    <View>
                        <Text style={styles.rotulo}>Identificação da conta</Text>
                        <Text style={styles.valor}>{usuario.id}</Text>
                    </View>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.botao,
                    pressed && styles.botaoPressionado,
                ]}
                onPress={sair}
            >
                <Ionicons name="log-out-outline" size={22} color={colors.white} />
                <Text style={styles.botaoTexto}>Sair da conta</Text>
            </Pressable>

            <Text style={styles.creditos}>
                Este produto utiliza a API da TMDB, mas não é endossado ou certificado
                pela TMDB.
            </Text>
        </SafeAreaView>
    );
}

/*gente, quando o thiago entrar com as cores eu vou refatorar isso aqui pra puxar de themes */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    centralizado: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titulo: {
        color: colors.text,
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
        borderColor: colors.primary,
    },
    avatarPadrao: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: colors.surface,
        borderWidth: 3,
        borderColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    nome: {
        color: colors.text,
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 16,
    },
    usuario: {
        color: colors.muted,
        fontSize: 16,
        marginTop: 4,
    },
    card: {
        backgroundColor: colors.surface,
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
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    rotulo: {
        color: colors.muted,
        fontSize: 13,
    },
    valor: {
        color: colors.text,
        fontSize: 16,
        marginTop: 3,
    },
    divisor: {
        height: 1,
        backgroundColor: colors.secondary,
        opacity: 0.4,
    },
    botao: {
        backgroundColor: colors.primary,
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
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    mensagem: {
        color: colors.muted,
        fontSize: 16,
        textAlign: "center",
        marginTop: 16,
    },
    creditos: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
        marginTop: 24,
    },
});