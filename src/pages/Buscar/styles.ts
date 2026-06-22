import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 20,
    },
    busca: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    input: {
        flex: 1,
    },
    alturaInput: {
        height: 50,
    },
    botao: {
        width: "auto",
        paddingHorizontal: 24,
        height: 50,
    },
    loading: {
        marginTop: 40,
    },
    mensagem: {
        fontSize: 16,
        marginTop: 30,
        textAlign: "center",
    },
    lista: {
        paddingVertical: 24,
    },
    colunas: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
});

export default styles;