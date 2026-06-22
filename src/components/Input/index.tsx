import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "./styles";

type InputProps = TextInputProps & {
  label?: string;
  erro?: string | null;
  senha?: boolean;
  containerStyle?: object;
};

export function Input({
  label,
  erro,
  senha = false,
  containerStyle,
  style,
  ...rest
}: InputProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.surface, borderColor: theme.border },
          erro
            ? [styles.inputContainerErro, { borderColor: theme.primary }]
            : null,
        ]}
      >
        <TextInput
          style={[styles.input, { color: theme.text }, style]}
          placeholderTextColor={theme.muted}
          secureTextEntry={senha && !senhaVisivel}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />

        {senha && (
          <TouchableOpacity
            onPress={() => setSenhaVisivel((atual) => !atual)}
            accessibilityLabel={
              senhaVisivel ? "Ocultar senha" : "Mostrar senha"
            }
          >
            <Feather
              name={senhaVisivel ? "eye-off" : "eye"}
              size={20}
              color={theme.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      {erro && (
        <Text style={[styles.textoErro, { color: theme.primary }]}>{erro}</Text>
      )}
    </View>
  );
}
