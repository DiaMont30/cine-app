import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardFilme } from "../../components/CardFilme";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
    buscarListaAssistidosId,
    salvarListaAssistidosId,
} from "../../data/storage";
import {
    buscarFilmesAssistidos,
    buscarListasUsuario,
    criarListaAssistidos,
    removerFilmeAssistido,
} from "../../data/tmdbV3";
import { Filme } from "../../domains/entities/Filme";
import { styles } from "./styles";

export function Assistidos() {
    const { usuario, sessionId } = useAuth();
    const { theme } = useTheme();
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [listId, setListId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const carregarLista = useCallback(async () => {
        if (!usuario || !sessionId) {
            setErro("É necessário estar conectado.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setErro("");

            let idLista = await buscarListaAssistidosId();

            if (!idLista) {
                const listas = await buscarListasUsuario(usuario.id, sessionId);

                const listaExistente = listas.find(
                    (lista) => lista.name === "CineApp - Filmes Assistidos",
                );

                idLista = listaExistente?.id ?? null;

                if (!idLista) {
                    idLista = await criarListaAssistidos(sessionId);
                }

                await salvarListaAssistidosId(idLista);
            }

            const resultado = await buscarFilmesAssistidos(idLista);

            setListId(idLista);
            setFilmes(resultado);
        } catch (error) {
            console.error("[Assistidos] carregarLista:", error);
            setErro("Não foi possível carregar os filmes assistidos.");
        } finally {
            setLoading(false);
        }
    }, [sessionId, usuario]);

    useFocusEffect(
        useCallback(() => {
            carregarLista();
        }, [carregarLista]),
    );

    async function removerFilme(filme: Filme) {
        if (!listId || !sessionId) {
            return;
        }

        Alert.alert(
            "Remover filme",
            `Deseja remover "${filme.title}" dos filmes assistidos?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await removerFilmeAssistido(listId, filme.id, sessionId);

                            setFilmes((atuais) =>
                                atuais.filter((item) => item.id !== filme.id),
                            );
                        } catch {
                            Alert.alert(
                                "Erro",
                                "Não foi possível remover o filme da lista.",
                            );
                        }
                    },
                },
            ],
        );
    }

    if (loading) {
        return (
            <View
                style={[styles.centralizado, { backgroundColor: theme.background }]}
            >
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <Text style={[styles.titulo, { color: theme.text }]}>
                Filmes assistidos
            </Text>

            {erro ? (
                <View style={styles.centralizado}>
                    <Text style={[styles.mensagem, { color: theme.muted }]}>
                        {erro}
                    </Text>

                    <Pressable
                        style={[styles.botaoTentar, { backgroundColor: theme.primary }]}
                        onPress={carregarLista}
                    >
                        <Text style={[styles.botaoTexto, { color: theme.white }]}>
                            Tentar novamente
                        </Text>
                    </Pressable>
                </View>
            ) : filmes.length ? (
                <FlatList
                    data={filmes}
                    numColumns={2}
                    keyExtractor={(filme) => filme.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <CardFilme filme={item} />

                            <Pressable
                                style={[
                                    styles.botaoRemover,
                                    {
                                        backgroundColor: theme.surface,
                                        borderColor: theme.primary,
                                    },
                                ]}
                                onPress={() => removerFilme(item)}
                            >
                                <Text style={{ color: theme.primary }}>Remover</Text>
                            </Pressable>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.lista}
                    columnWrapperStyle={styles.colunas}
                />
            ) : (
                <View style={styles.centralizado}>
                    <Text style={[styles.mensagem, { color: theme.muted }]}>
                        Nenhum filme marcado como assistido.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}