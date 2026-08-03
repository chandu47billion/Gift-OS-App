import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import { giftSuggestions } from "../../data/mockData";
import { daysUntil } from "../../utils/date";
import EventCard from "../../components/home/EventCard";
import CountdownCard from "../../components/home/CountdownCard";
import GiftSuggestionCard from "../../components/home/GiftSuggestionCard";
import QuickActions from "../../components/home/QuickActions";
import Card from "../../components/common/Card";
function HomeScreen({ navigation }) {
  const theme = useTheme();
  const { state } = useAppStore();
  const { people, reminders, isPremium, userName } = state;
  const upcoming = useMemo(() => {
    const list = [];
    people.forEach((p) => {
      p.occasions.forEach((o) => {
        list.push({
          personId: p.id,
          personName: p.name,
          emoji: p.avatarEmoji,
          color: p.avatarColor,
          label: o.label,
          date: o.date,
          days: daysUntil(o.date)
        });
      });
    });
    return list.sort((a, b) => a.days - b.days);
  }, [people]);
  const soonest = upcoming[0];
  const firstName = userName.split(" ")[0];
  return <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>Good morning, {firstName} 👋</Text>
          <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}>
            {(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </Text>
        </View>
        <Pressable
    onPress={() => navigation.navigate("NotificationCenter")}
    style={[styles.bellButton, { backgroundColor: theme.colors.card }, theme.shadows.sm]}
  >
          <Ionicons name="notifications-outline" size={22} color={theme.colors.text} />
          <View style={styles.badgeDot} />
        </Pressable>
      </View>

      {soonest ? <View style={{ marginBottom: 24 }}>
          <EventCard
    title={soonest.label}
    subtitle={`for ${soonest.personName}`}
    emoji={soonest.emoji}
    daysLeft={soonest.days}
  />
        </View> : null}

      <SectionHeader title="Upcoming" color={theme.colors.text} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
        {upcoming.slice(0, 8).map((item, idx) => <CountdownCard
    key={idx}
    personName={item.personName}
    emoji={item.emoji}
    color={item.color}
    occasionLabel={item.label}
    daysLeft={item.days}
    onPress={() => navigation.navigate("People", { screen: "PersonProfile", params: { personId: item.personId } })}
  />)}
      </ScrollView>

      <SectionHeader title="Gift Suggestions" color={theme.colors.text} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
        {giftSuggestions.map((g) => <GiftSuggestionCard
    key={g.id}
    name={g.name}
    category={g.category}
    price={g.price}
    emoji={g.emoji}
    gradient={g.gradient}
    onPress={() => navigation.navigate("Discover", { screen: "GiftDetail", params: { giftId: g.id } })}
  />)}
      </ScrollView>

      <SectionHeader title="Quick Actions" color={theme.colors.text} />
      <QuickActions
    actions={[
      {
        key: "add-person",
        label: "Add Person",
        emoji: "\u{1F464}",
        onPress: () => navigation.navigate("People", { screen: "AddPerson" })
      },
      {
        key: "add-reminder",
        label: "Add Reminder",
        emoji: "\u23F0",
        onPress: () => navigation.navigate("ReminderSettings")
      },
      {
        key: "create-greeting",
        label: "Create Greeting",
        emoji: "\u{1F48C}",
        onPress: () => navigation.navigate("GreetingCreator")
      },
      {
        key: "budget",
        label: "Budget",
        emoji: "\u{1F4B0}",
        onPress: () => navigation.navigate("BudgetTracker")
      }
    ]}
  />

      <SectionHeader title="Reminder Timeline" color={theme.colors.text} />
      {reminders.filter((r) => r.enabled).map((r) => {
    const person = people.find((p) => p.id === r.personId);
    return <Card key={r.id} style={styles.reminderCard}>
            <View style={styles.reminderRow}>
              <Text style={styles.reminderEmoji}>{person?.avatarEmoji ?? "\u{1F389}"}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.reminderTitle, { color: theme.colors.text }]}>{r.title}</Text>
                <Text style={[styles.reminderSubtitle, { color: theme.colors.textSecondary }]}>
                  Remind me {r.leadDays} days before · {r.channel}
                </Text>
              </View>
            </View>
          </Card>;
  })}

      {!isPremium ? <Pressable onPress={() => navigation.navigate("Premium")}>
          <Card style={[styles.premiumStrip, { backgroundColor: theme.colors.primary }]}>
            <View>
              <Text style={styles.premiumTitle}>✨ Unlock Gift OS Premium</Text>
              <Text style={styles.premiumSubtitle}>Unlimited people, AI suggestions & more</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </Card>
        </Pressable> : null}
    </ScrollView>;
}
function SectionHeader({ title, color }) {
  return <Text style={[styles.sectionTitle, { color }]}>{title}</Text>;
}
const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20
  },
  greeting: {
    fontSize: 22,
    fontWeight: "800"
  },
  dateText: {
    fontSize: 13,
    marginTop: 4
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF7675"
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 12
  },
  hScroll: {
    marginBottom: 4
  },
  reminderCard: {
    marginBottom: 10
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  reminderEmoji: {
    fontSize: 28
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: "700"
  },
  reminderSubtitle: {
    fontSize: 12,
    marginTop: 2
  },
  premiumStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16
  },
  premiumTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  },
  premiumSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginTop: 4
  }
});
export {
  HomeScreen as default
};
