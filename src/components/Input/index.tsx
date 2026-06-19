import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

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
  ...rest
}: InputProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={containerStyle}>
      {label && <Text style={[styles.label, { color: theme.text }]}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.surface, borderColor: theme.border },
          erro ? [styles.inputContainerErro, { borderColor: theme.primary }] : null
        ]}
      >
        <TextInput
          style={[styles.input, { color: theme.text }]}
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

      {erro && <Text style={[styles.textoErro, { color: theme.primary }]}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  inputContainerErro: {
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  textoErro: {
    fontSize: 12,
    marginTop: 4,
  },
});
