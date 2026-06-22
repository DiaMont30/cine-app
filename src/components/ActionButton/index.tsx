import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "./styles";

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
