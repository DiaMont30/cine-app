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
    lista: {
        paddingBottom: 24,
    },
    colunas: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
    vazio: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        fontSize: 16,
    },
});

export default styles;