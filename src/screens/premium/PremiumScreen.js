import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
const features = [
  { label: "Number of people tracked", free: "Up to 5", premium: "Unlimited" },
  { label: "AI gift suggestions", free: "Basic", premium: "Advanced & personalized" },
  { label: "Reminders", free: "1 per person", premium: "Unlimited & smart" },
  { label: "Greeting Creator", free: "Limited templates", premium: "Unlimited AI greetings" },
  { label: "Budget tracking", free: "\u2014", premium: "Full analytics" },
  { label: "Priority support", free: "\u2014", premium: "Included" }
];
function PremiumScreen({ navigation }) {
  const theme = useTheme();
  const { dispatch } = useAppStore();
  const [plan, setPlan] = useState("annual");
  const subscribe = () => {
    dispatch({ type: "SET_PREMIUM", value: true });
    Alert.alert("Welcome to Premium! \u{1F389}", "All premium features are now unlocked.");
    navigation.goBack();
  };
  return <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 60 }}>
      <LinearGradient colors={["#6C5CE7", "#FD79A8"]} style={styles.hero}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.heroTitle}>Gift OS Premium</Text>
        <Text style={styles.heroSubtitle}>Unlock the full gifting experience</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Card style={{ marginBottom: 20 }}>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 2, color: theme.colors.textSecondary, fontSize: 12, fontWeight: "700" }}> </Text>
            <Text style={{ flex: 1, color: theme.colors.textSecondary, fontSize: 12, fontWeight: "700", textAlign: "center" }}>Free</Text>
            <Text style={{ flex: 1, color: theme.colors.primary, fontSize: 12, fontWeight: "700", textAlign: "center" }}>Premium</Text>
          </View>
          {features.map((f) => <View key={f.label} style={styles.tableRow}>
              <Text style={{ flex: 2, color: theme.colors.text, fontSize: 13 }}>{f.label}</Text>
              <Text style={{ flex: 1, color: theme.colors.textSecondary, fontSize: 12, textAlign: "center" }}>{f.free}</Text>
              <Text style={{ flex: 1, color: theme.colors.text, fontSize: 12, textAlign: "center", fontWeight: "700" }}>{f.premium}</Text>
            </View>)}
        </Card>

        <View style={styles.plansRow}>
          <Pressable
    onPress={() => setPlan("monthly")}
    style={[
      styles.planCard,
      { borderColor: plan === "monthly" ? theme.colors.primary : theme.colors.border, backgroundColor: theme.colors.card }
    ]}
  >
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Monthly</Text>
            <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: "800", marginTop: 6 }}>$4.99</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>per month</Text>
          </Pressable>

          <Pressable
    onPress={() => setPlan("annual")}
    style={[
      styles.planCard,
      { borderColor: plan === "annual" ? theme.colors.primary : theme.colors.border, backgroundColor: theme.colors.card }
    ]}
  >
            <View style={styles.bestValueBadge}>
              <Text style={styles.bestValueText}>BEST VALUE</Text>
            </View>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Annual</Text>
            <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: "800", marginTop: 6 }}>$39.99</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>per year · save 33%</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title={`Subscribe \u2014 ${plan === "annual" ? "$39.99/yr" : "$4.99/mo"}`} onPress={subscribe} />
        </View>
        <Pressable
          style={{ alignItems: "center", marginTop: 16 }}
          onPress={() => Alert.alert("Restore Purchases", "Your previous purchases have been restored.")}
        >
          <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>Restore purchases</Text>
        </Pressable>
      </View>
    </ScrollView>;
}
const styles = StyleSheet.create({
  hero: {
    paddingTop: 56,
    paddingBottom: 32,
    alignItems: "center"
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20
  },
  crown: {
    fontSize: 56
  },
  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 8
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 6
  },
  content: {
    padding: 20
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 12
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center"
  },
  plansRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  planCard: {
    width: "48%",
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    position: "relative"
  },
  bestValueBadge: {
    position: "absolute",
    top: -10,
    right: 12,
    backgroundColor: "#FDCB6E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999
  },
  bestValueText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#111827"
  }
});
export {
  PremiumScreen as default
};
