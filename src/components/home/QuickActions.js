import { StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "../../hooks/useTheme";
function QuickActions({ actions }) {
  const theme = useTheme();
  return <View style={styles.grid}>
      {actions.map((action) => <Pressable
    key={action.key}
    onPress={action.onPress}
    style={({ pressed }) => [
      styles.item,
      {
        backgroundColor: theme.colors.card,
        opacity: pressed ? 0.85 : 1,
        borderColor: theme.colors.border,
        borderWidth: theme.dark ? 1 : 0
      },
      theme.shadows.sm
    ]}
  >
          <Text style={styles.emoji}>{action.emoji}</Text>
          <Text style={[styles.label, { color: theme.colors.text }]}>{action.label}</Text>
        </Pressable>)}
    </View>;
}
const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  item: {
    width: "48%",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12
  },
  emoji: {
    fontSize: 26,
    marginBottom: 8
  },
  label: {
    fontSize: 13,
    fontWeight: "600"
  }
});
export {
  QuickActions as default
};
