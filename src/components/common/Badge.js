import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
function Badge({ label, variant = "neutral" }) {
  const theme = useTheme();
  const colorMap = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    neutral: theme.colors.textSecondary
  };
  const color = colorMap[variant];
  return <View style={[styles.container, { backgroundColor: color + "22" }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>;
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: "flex-start"
  },
  text: {
    fontSize: 12,
    fontWeight: "700"
  }
});
export {
  Badge as default
};
