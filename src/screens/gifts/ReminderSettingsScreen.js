import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import Card from "../../components/common/Card";
const leadOptions = [1, 7, 14, 30];
function ReminderSettingsScreen({ navigation }) {
  const theme = useTheme();
  const { state, dispatch } = useAppStore();
  const { settings } = state;
  const personName = (id) => state.people.find((p) => p.id === id)?.name ?? "Unknown";
  return <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Reminders</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lead Time</Text>
        <View style={styles.chipRow}>
          {leadOptions.map((d) => <Pressable
            key={d}
            onPress={() => dispatch({ type: "SET_SETTING", key: "defaultReminderLeadDays", value: d })}
            style={[
              styles.chip,
              {
                backgroundColor: settings.defaultReminderLeadDays === d ? theme.colors.primary : theme.colors.card,
                borderColor: theme.colors.border
              }
            ]}
          >
              <Text style={{ color: settings.defaultReminderLeadDays === d ? "#fff" : theme.colors.text, fontWeight: "600", fontSize: 13 }}>
                {d} day{d > 1 ? "s" : ""} before
              </Text>
            </Pressable>)}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Notification Channels</Text>
        <Card style={{ marginBottom: 12 }}>
          <View style={styles.switchRow}>
            <Text style={{ color: theme.colors.text }}>Push Notifications</Text>
            <Switch
              value={settings.pushNotificationsEnabled}
              onValueChange={(value) => dispatch({ type: "SET_SETTING", key: "pushNotificationsEnabled", value })}
              trackColor={{ true: theme.colors.primary }}
            />
          </View>
          <View style={[styles.switchRow, { marginTop: 12 }]}>
            <Text style={{ color: theme.colors.text }}>Email</Text>
            <Switch
              value={settings.emailNotificationsEnabled}
              onValueChange={(value) => dispatch({ type: "SET_SETTING", key: "emailNotificationsEnabled", value })}
              trackColor={{ true: theme.colors.primary }}
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 12 }]}>Smart Reminders</Text>
        <Card style={{ marginBottom: 12 }}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text }}>AI-suggested timing</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                Adjust reminders based on shipping times and past behavior.
              </Text>
            </View>
            <Switch
              value={settings.smartRemindersEnabled}
              onValueChange={(value) => dispatch({ type: "SET_SETTING", key: "smartRemindersEnabled", value })}
              trackColor={{ true: theme.colors.primary }}
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 12 }]}>Active Reminders</Text>
        {state.reminders.map((r) => <Card key={r.id} style={{ marginBottom: 10 }}>
            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{r.title}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  {personName(r.personId)} · {r.leadDays}d before · {r.channel}
                </Text>
              </View>
              <Switch
    value={r.enabled}
    onValueChange={() => dispatch({ type: "TOGGLE_REMINDER", id: r.id })}
    trackColor={{ true: theme.colors.primary }}
  />
            </View>
          </Card>)}
      </View>
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
  content: {
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
export {
  ReminderSettingsScreen as default
};
