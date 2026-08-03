import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import Card from "../../components/common/Card";
function BudgetTrackerScreen({ navigation }) {
  const theme = useTheme();
  const { state } = useAppStore();
  const totalBudget = state.budget.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = state.budget.reduce((sum, b) => sum + b.spent, 0);
  const percent = totalBudget > 0 ? Math.min(100, Math.round(totalSpent / totalBudget * 100)) : 0;
  const personName = (id) => state.people.find((p) => p.id === id)?.name ?? "Unknown";
  return <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Budget Tracker</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.ringSection}>
        <View
    style={[
      styles.ring,
      {
        borderColor: theme.colors.primary + "33"
      }
    ]}
  >
          <View
    style={[
      styles.ringProgress,
      {
        borderColor: theme.colors.primary,
        transform: [{ rotate: `${percent / 100 * 360}deg` }]
      }
    ]}
  />
          <View style={styles.ringCenter}>
            <Text style={[styles.ringPercent, { color: theme.colors.text }]}>{percent}%</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>used</Text>
          </View>
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Total Budget</Text>
          <Text style={[styles.totalAmount, { color: theme.colors.text }]}>${totalBudget}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 8 }}>Spent</Text>
          <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>${totalSpent}</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>By Person</Text>
      <View style={styles.content}>
        {state.budget.map((b) => {
    const pct = b.amount > 0 ? Math.min(100, Math.round(b.spent / b.amount * 100)) : 0;
    return <Card key={b.id} style={{ marginBottom: 12 }}>
              <View style={styles.row}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{personName(b.personId)}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{b.label}</Text>
              </View>
              <View style={[styles.barTrack, { backgroundColor: theme.colors.border }]}>
                <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: theme.colors.primary }]} />
              </View>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 6 }}>
                ${b.spent} of ${b.amount}
              </Text>
            </Card>;
  })}
      </View>

      <Pressable style={[styles.fab, { backgroundColor: theme.colors.primary }, theme.shadows.lg]}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </ScrollView>;
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700"
  },
  ringSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  ring: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  ringProgress: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 10,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  },
  ringCenter: {
    alignItems: "center"
  },
  ringPercent: {
    fontSize: 20,
    fontWeight: "800"
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "800"
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginBottom: 12
  },
  content: {
    paddingHorizontal: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden"
  },
  barFill: {
    height: 6,
    borderRadius: 3
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center"
  }
});
export {
  BudgetTrackerScreen as default
};
