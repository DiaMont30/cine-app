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
import { darkTheme } from "../../themes/themes";

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

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[styles.inputContainer, erro ? styles.inputContainerErro : null]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={darkTheme.muted}
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
              color={darkTheme.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      {erro && <Text style={styles.textoErro}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: darkTheme.text,
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: darkTheme.surface,
    borderRadius: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: darkTheme.secondary,
  },
  inputContainerErro: {
    borderColor: darkTheme.primary,
  },
  input: {
    flex: 1,
    color: darkTheme.white,
    fontSize: 16,
    paddingVertical: 12,
  },
  textoErro: {
    color: darkTheme.primary,
    fontSize: 12,
    marginTop: 4,
  },
});
