import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton } from "../../components/ActionButton";
import { SeletorTema } from "../../components/SeletorTema";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./styles";
export function Perfil() {
  const { usuario, signOut } = useAuth();
  const { theme } = useTheme();

  async function sair() {
    Alert.alert("Sair da conta", "Deseja realmente sair do CineApp?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  }

  if (!usuario) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
          <View
            style={[
              styles.avatarPadrao,
              { backgroundColor: theme.surface, borderColor: theme.primary },
            ]}
          >
            <Ionicons name="person-outline" size={54} color={theme.text} />
          </View>
        )}

        <Text style={[styles.nome, { color: theme.text }]}>{nome}</Text>
        <Text style={[styles.usuario, { color: theme.muted }]}>
          @{usuario.username}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <View style={styles.informacao}>
          <View style={[styles.icone, { backgroundColor: theme.background }]}>
            <Ionicons name="language-outline" size={22} color={theme.primary} />
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
            <Ionicons name="location-outline" size={22} color={theme.primary} />
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
            <Ionicons name="id-card-outline" size={22} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.rotulo, { color: theme.muted }]}>
              Identificação da conta
            </Text>
            <Text style={[styles.valor, { color: theme.text }]}>
              {usuario.id}
            </Text>
          </View>
        </View>

        <View style={[styles.divisor, { backgroundColor: theme.secondary }]} />

        <SeletorTema />
      </View>

      <ActionButton
        titulo="Sair da conta"
        onPress={sair}
        icone={
          <Ionicons name="log-out-outline" size={22} color={theme.white} />
        }
        containerStyle={styles.botaoSair}
      />

      <Text style={[styles.creditos, { color: theme.muted }]}>
        Este produto utiliza a API da TMDB, mas não é endossado ou certificado
        pela TMDB.
      </Text>
    </SafeAreaView>
  );
}

