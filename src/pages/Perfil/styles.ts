
import { StyleSheet } from "react-native";

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
    botaoSair: {
        marginTop: 28,
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

export default styles;