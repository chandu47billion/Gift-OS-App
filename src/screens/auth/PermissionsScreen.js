import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import { useAppStore } from "../../store/useAppStore";
import { useTheme } from "../../hooks/useTheme";
const steps = [
  {
    icon: "\u{1F514}",
    title: "Stay in the Loop",
    description: "Allow notifications so we can remind you before important occasions."
  },
  {
    icon: "\u{1F465}",
    title: "Sync Your Contacts",
    description: "Import birthdays and details automatically from your contacts."
  },
  {
    icon: "\u{1F4C6}",
    title: "Connect Your Calendar",
    description: "Add gift reminders directly to your calendar so nothing slips by."
  }
];
function PermissionsScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const { dispatch } = useAppStore();
  const theme = useTheme();
  const current = steps[step];
  const finish = () => {
    dispatch({ type: "SET_AUTHENTICATED", value: true });
    dispatch({ type: "SET_ONBOARDED", value: true });
  };
  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };
  return <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.progressRow}>
        {steps.map((_, i) => <View
    key={i}
    style={[
      styles.progressDot,
      { backgroundColor: i <= step ? theme.colors.primary : theme.colors.border }
    ]}
  />)}
      </View>

      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{current.icon}</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>{current.title}</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{current.description}</Text>
      </View>

      <View style={styles.actions}>
        <Button title="Allow" onPress={next} />
        <View style={{ height: 12 }} />
        <Button title="Skip for now" onPress={next} variant="ghost" />
      </View>
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "space-between"
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  progressDot: {
    width: 40,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4
  },
  body: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F0EEFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32
  },
  icon: {
    fontSize: 56
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 16
  },
  actions: {
    marginBottom: 10
  }
});
export {
  PermissionsScreen as default
};
