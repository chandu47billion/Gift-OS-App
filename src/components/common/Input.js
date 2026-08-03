import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
function Input({ label, error, helperText, style, ...rest }) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  return <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text> : null}
      <TextInput
    placeholderTextColor={theme.colors.textSecondary}
    onFocus={(e) => {
      setFocused(true);
      rest.onFocus?.(e);
    }}
    onBlur={(e) => {
      setFocused(false);
      rest.onBlur?.(e);
    }}
    style={[
      styles.input,
      {
        backgroundColor: theme.colors.surface,
        borderColor: error ? theme.colors.error : focused ? theme.colors.primary : theme.colors.border,
        color: theme.colors.text,
        borderRadius: theme.radii.md
      },
      style
    ]}
    {...rest}
  />
      {error ? <Text style={[styles.helper, { color: theme.colors.error }]}>{error}</Text> : helperText ? <Text style={[styles.helper, { color: theme.colors.textSecondary }]}>{helperText}</Text> : null}
    </View>;
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6
  },
  input: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15
  },
  helper: {
    fontSize: 12,
    marginTop: 4
  }
});
export {
  Input as default
};
