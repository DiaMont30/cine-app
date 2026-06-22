import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ActionButtonProps extends PressableProps {
  titulo: string;
  carregando?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  icone?: React.ReactNode;
}

export function ActionButton({
  titulo,
  carregando = false,
  containerStyle,
  disabled,
  icone,
  ...rest
}: ActionButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.botao,
        { backgroundColor: theme.primary },
        pressed && styles.botaoPressionado,
        (disabled || carregando) && styles.botaoDesabilitado,
        containerStyle,
      ]}
      disabled={disabled || carregando}
      {...rest}
    >
      {carregando ? (
        <ActivityIndicator color={theme.white} />
      ) : (
        <View style={styles.conteudoInterno}>
          {icone && <View style={styles.containerIcone}>{icone}</View>}
          <Text style={[styles.botaoTexto, { color: theme.white }]}>
            {titulo}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  conteudoInterno: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerIcone: {
    marginRight: 8,
  },
  botaoPressionado: {
    opacity: 0.85,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
