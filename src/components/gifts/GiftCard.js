import { Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../hooks/useTheme";
import Badge from "../common/Badge";
function GiftCard({
  name,
  price,
  emoji,
  gradient,
  statusLabel,
  statusVariant = "neutral",
  onPress
}) {
  const theme = useTheme();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.container, { opacity: pressed ? 0.9 : 1 }]}>
      <LinearGradient colors={gradient} style={styles.imageArea}>
        <Text style={styles.emoji}>{emoji}</Text>
      </LinearGradient>
      <View style={{ padding: 12 }}>
        <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.footerRow}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>${price.toFixed(0)}</Text>
          {statusLabel ? <Badge label={statusLabel} variant={statusVariant} /> : null}
        </View>
      </View>
    </Pressable>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    margin: 6
  },
  imageArea: {
    height: 110,
    alignItems: "center",
    justifyContent: "center"
  },
  emoji: {
    fontSize: 42
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    minHeight: 36
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8
  },
  price: {
    fontSize: 15,
    fontWeight: "700"
  }
});
export {
  GiftCard as default
};
