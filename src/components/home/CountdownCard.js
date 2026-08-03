import { StyleSheet, Text, View } from "react-native";
import Avatar from "../common/Avatar";
import Card from "../common/Card";
import { useTheme } from "../../hooks/useTheme";
function CountdownCard({
  personName,
  emoji,
  color,
  photoUri,
  occasionLabel,
  daysLeft,
  onPress
}) {
  const theme = useTheme();
  return <Card onPress={onPress} style={styles.card}>
      <Avatar emoji={emoji} color={color} photoUri={photoUri} size={48} />
      <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
        {personName}
      </Text>
      <Text style={[styles.occasion, { color: theme.colors.textSecondary }]} numberOfLines={1}>
        {occasionLabel}
      </Text>
      <View style={[styles.daysBadge, { backgroundColor: theme.colors.primary + "22" }]}>
        <Text style={[styles.daysText, { color: theme.colors.primary }]}>
          {daysLeft}d
        </Text>
      </View>
    </Card>;
}
const styles = StyleSheet.create({
  card: {
    width: 128,
    marginRight: 12,
    alignItems: "flex-start"
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10
  },
  occasion: {
    fontSize: 12,
    marginTop: 2
  },
  daysBadge: {
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999
  },
  daysText: {
    fontSize: 12,
    fontWeight: "700"
  }
});
export {
  CountdownCard as default
};
