import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import { daysUntil, formatShortDate, monthName } from "../../utils/date";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
function CalendarScreen({ navigation }) {
  const theme = useTheme();
  const { state } = useAppStore();
  const [mode, setMode] = useState("Month");
  const today = /* @__PURE__ */ new Date();
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());
  const allOccasions = useMemo(() => {
    const list = [];
    state.people.forEach((p) => {
      p.occasions.forEach((o) => {
        list.push({
          personId: p.id,
          personName: p.name,
          emoji: p.avatarEmoji,
          color: p.avatarColor,
          label: o.label,
          date: o.date
        });
      });
    });
    return list;
  }, [state.people]);
  const occasionsInMonth = allOccasions.filter((o) => {
    const d = new Date(o.date);
    return d.getMonth() === visibleMonth;
  });
  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
  const firstWeekday = new Date(visibleYear, visibleMonth, 1).getDay();
  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  const eventsByDay = {};
  occasionsInMonth.forEach((o) => {
    const day = new Date(o.date).getDate();
    eventsByDay[day] = eventsByDay[day] ? [...eventsByDay[day], o] : [o];
  });
  const upcomingSorted = [...allOccasions].sort((a, b) => daysUntil(a.date) - daysUntil(b.date));
  const groupedByDate = upcomingSorted.reduce((acc, o) => {
    const key = formatShortDate(o.date);
    acc[key] = acc[key] ? [...acc[key], o] : [o];
    return acc;
  }, {});
  const goToPerson = (personId) => navigation.navigate("People", { screen: "PersonProfile", params: { personId } });
  return <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Calendar</Text>
      </View>

      <View style={styles.segmentRow}>
        {["Month", "Week", "Agenda"].map((m) => <Pressable
    key={m}
    onPress={() => setMode(m)}
    style={[
      styles.segment,
      {
        backgroundColor: mode === m ? theme.colors.primary : theme.colors.card,
        borderColor: theme.colors.border
      }
    ]}
  >
            <Text style={{ color: mode === m ? "#fff" : theme.colors.text, fontWeight: "600", fontSize: 13 }}>
              {m}
            </Text>
          </Pressable>)}
      </View>

      {mode === "Month" && <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.monthNav}>
            <Pressable
    onPress={() => {
      if (visibleMonth === 0) {
        setVisibleMonth(11);
        setVisibleYear(visibleYear - 1);
      } else setVisibleMonth(visibleMonth - 1);
    }}
  >
              <Text style={{ color: theme.colors.primary, fontSize: 20 }}>‹</Text>
            </Pressable>
            <Text style={[styles.monthLabel, { color: theme.colors.text }]}>
              {monthName(visibleMonth)} {visibleYear}
            </Text>
            <Pressable
    onPress={() => {
      if (visibleMonth === 11) {
        setVisibleMonth(0);
        setVisibleYear(visibleYear + 1);
      } else setVisibleMonth(visibleMonth + 1);
    }}
  >
              <Text style={{ color: theme.colors.primary, fontSize: 20 }}>›</Text>
            </Pressable>
          </View>

          <View style={styles.weekdayRow}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <Text key={i} style={[styles.weekdayLabel, { color: theme.colors.textSecondary }]}>
                {d}
              </Text>)}
          </View>

          <View style={styles.grid}>
            {calendarCells.map((day, idx) => {
    const isToday = day === today.getDate() && visibleMonth === today.getMonth() && visibleYear === today.getFullYear();
    const hasEvent = day ? !!eventsByDay[day] : false;
    return <View key={idx} style={styles.cell}>
                  {day ? <View
      style={[
        styles.dayCircle,
        isToday ? { backgroundColor: theme.colors.primary } : void 0
      ]}
    >
                      <Text style={{ color: isToday ? "#fff" : theme.colors.text, fontSize: 13 }}>{day}</Text>
                      {hasEvent ? <View style={[styles.eventDot, { backgroundColor: isToday ? "#fff" : theme.colors.accent }]} /> : null}
                    </View> : null}
                </View>;
  })}
          </View>

          <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>This Month</Text>
          {occasionsInMonth.length === 0 ? <EmptyState emoji="🗓️" title="No events this month" /> : occasionsInMonth.map((o, idx) => <Card key={idx} onPress={() => goToPerson(o.personId)} style={{ marginBottom: 10 }}>
                <View style={styles.eventRow}>
                  <Text style={{ fontSize: 24 }}>{o.emoji}</Text>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{o.label}</Text>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                      {formatShortDate(o.date)}
                    </Text>
                  </View>
                </View>
              </Card>)}
        </ScrollView>}

      {mode === "Week" && <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Next 7 Days</Text>
          {upcomingSorted.filter((o) => daysUntil(o.date) <= 7).map((o, idx) => <Card key={idx} onPress={() => goToPerson(o.personId)} style={{ marginBottom: 10 }}>
                <View style={styles.eventRow}>
                  <Text style={{ fontSize: 24 }}>{o.emoji}</Text>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{o.label}</Text>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                      {o.personName} · {formatShortDate(o.date)}
                    </Text>
                  </View>
                  <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>{daysUntil(o.date)}d</Text>
                </View>
              </Card>)}
          {upcomingSorted.filter((o) => daysUntil(o.date) <= 7).length === 0 ? <EmptyState emoji="✅" title="Nothing this week" subtitle="Enjoy the calm before the next celebration." /> : null}
        </ScrollView>}

      {mode === "Agenda" && <ScrollView contentContainerStyle={styles.content}>
          {Object.entries(groupedByDate).map(([date, events]) => <View key={date} style={{ marginBottom: 20 }}>
              <Text style={[styles.agendaDate, { color: theme.colors.textSecondary }]}>{date}</Text>
              {events.map((o, idx) => <Card key={idx} onPress={() => goToPerson(o.personId)} style={{ marginBottom: 10 }}>
                  <View style={styles.eventRow}>
                    <Text style={{ fontSize: 24 }}>{o.emoji}</Text>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{o.label}</Text>
                      <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                        {o.personName}
                      </Text>
                    </View>
                  </View>
                </Card>)}
            </View>)}
        </ScrollView>}
    </View>;
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 8
  },
  title: {
    fontSize: 26,
    fontWeight: "800"
  },
  segmentRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 8
  },
  segment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 12
  },
  content: {
    padding: 20,
    paddingBottom: 60
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "700"
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 6
  },
  weekdayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16
  },
  cell: {
    width: `${100 / 7}%`,
    alignItems: "center",
    marginBottom: 6
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  eventDot: {
    position: "absolute",
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  agendaDate: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 8
  }
});
export {
  CalendarScreen as default
};
