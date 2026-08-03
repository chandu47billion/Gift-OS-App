import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import { giftSuggestions } from "../../data/mockData";
import { daysUntil, formatDate } from "../../utils/date";
import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";
import GiftSuggestionCard from "../../components/home/GiftSuggestionCard";
import EmptyState from "../../components/common/EmptyState";
const tabs = ["Overview", "Occasions", "Gifts", "Notes"];
function PersonProfileScreen({ route, navigation }) {
  const { personId } = route.params;
  const theme = useTheme();
  const { state, dispatch } = useAppStore();
  const [tab, setTab] = useState("Overview");
  const person = state.people.find((p) => p.id === personId);
  if (!person) {
    return <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <EmptyState emoji="🙈" title="Person not found" />
      </View>;
  }
  const confirmDelete = () => {
    Alert.alert(
      "Remove Person",
      `Remove ${person.name} from your list? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "REMOVE_PERSON", id: personId });
            navigation.goBack();
          }
        }
      ]
    );
  };
  const sortedOccasions = [...person.occasions].sort((a, b) => daysUntil(a.date) - daysUntil(b.date));
  const nextOccasion = sortedOccasions[0];
  const relatedSuggestions = giftSuggestions.filter((g) => g.personId === person.id);
  const history = state.giftHistory.filter((h) => h.personId === person.id);
  const wishlistItems = state.wishlist.filter((w) => w.personId === person.id);
  return <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient colors={[theme.colors.primary, theme.colors.primaryLight]} style={styles.hero}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </Pressable>
        <Pressable onPress={confirmDelete} style={styles.deleteButton} hitSlop={12}>
          <Ionicons name="trash-outline" size={22} color="#fff" />
        </Pressable>
        <Avatar emoji={person.avatarEmoji} color="#ffffff77" photoUri={person.photoUri} size={80} />
        <Text style={styles.name}>{person.name}</Text>
        <View style={{ marginTop: 6 }}>
          <Badge label={person.relationship} variant="neutral" />
        </View>
        {nextOccasion ? <Text style={styles.countdown}>
            🎉 {nextOccasion.label} in {daysUntil(nextOccasion.date)} days
          </Text> : null}
      </LinearGradient>

      <View style={[styles.tabRow, { borderColor: theme.colors.border }]}>
        {tabs.map((t) => <Pressable key={t} onPress={() => setTab(t)} style={styles.tabItem}>
            <Text
    style={{
      color: tab === t ? theme.colors.primary : theme.colors.textSecondary,
      fontWeight: tab === t ? "700" : "500",
      fontSize: 14
    }}
  >
              {t}
            </Text>
            {tab === t ? <View style={[styles.tabIndicator, { backgroundColor: theme.colors.primary }]} /> : null}
          </Pressable>)}
      </View>

      <View style={styles.content}>
        {tab === "Overview" && <View>
            {nextOccasion ? <Card style={{ marginBottom: 16 }}>
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Next Occasion</Text>
                <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
                  {nextOccasion.label} · {formatDate(nextOccasion.date)}
                </Text>
              </Card> : null}
            <Text style={[styles.cardTitle, { color: theme.colors.text, marginBottom: 12 }]}>AI Recommendations</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {(relatedSuggestions.length ? relatedSuggestions : giftSuggestions.slice(0, 3)).map((g) => <GiftSuggestionCard
    key={g.id}
    name={g.name}
    category={g.category}
    price={g.price}
    emoji={g.emoji}
    gradient={g.gradient}
    onPress={() => navigation.navigate("Discover", { screen: "GiftDetail", params: { giftId: g.id } })}
  />)}
            </ScrollView>
            <View style={{ marginTop: 16 }}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Interests</Text>
              <View style={styles.chipsRow}>
                {person.interests.map((i) => <View key={i} style={[styles.interestChip, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                    <Text style={{ color: theme.colors.text, fontSize: 12 }}>{i}</Text>
                  </View>)}
              </View>
            </View>
          </View>}

        {tab === "Occasions" && <View>
            {sortedOccasions.length === 0 ? <EmptyState emoji="📅" title="No occasions yet" subtitle="Add a birthday or anniversary to get reminders." /> : sortedOccasions.map((o) => <Card key={o.id} style={{ marginBottom: 12 }}>
                  <View style={styles.occasionRow}>
                    <View>
                      <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{o.label}</Text>
                      <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{formatDate(o.date)}</Text>
                    </View>
                    <Badge label={`${daysUntil(o.date)}d`} variant="primary" />
                  </View>
                </Card>)}
          </View>}

        {tab === "Gifts" && <View>
            <Text style={[styles.cardTitle, { color: theme.colors.text, marginBottom: 8 }]}>Gift History</Text>
            {history.length === 0 ? <Text style={{ color: theme.colors.textSecondary, marginBottom: 16 }}>No gifts recorded yet.</Text> : history.map((h) => <Card key={h.id} style={{ marginBottom: 10 }}>
                  <View style={styles.occasionRow}>
                    <View>
                      <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{h.giftName}</Text>
                      <Text style={{ color: theme.colors.textSecondary, marginTop: 2, fontSize: 12 }}>
                        {h.occasion} · {formatDate(h.date)}
                      </Text>
                    </View>
                    <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>${h.price}</Text>
                  </View>
                </Card>)}
            <Text style={[styles.cardTitle, { color: theme.colors.text, marginTop: 12, marginBottom: 8 }]}>Wishlist</Text>
            {wishlistItems.length === 0 ? <Text style={{ color: theme.colors.textSecondary }}>Nothing on the wishlist yet.</Text> : wishlistItems.map((w) => <Card key={w.id} style={{ marginBottom: 10 }}>
                  <View style={styles.occasionRow}>
                    <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                      {w.emoji} {w.name}
                    </Text>
                    <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>${w.price}</Text>
                  </View>
                </Card>)}
          </View>}

        {tab === "Notes" && <Card>
            <Text style={{ color: theme.colors.text, lineHeight: 22 }}>
              {person.notes || "No notes added yet. Tap edit to add helpful reminders about this person."}
            </Text>
          </Card>}
      </View>
    </ScrollView>;
}
const styles = StyleSheet.create({
  hero: {
    paddingTop: 56,
    paddingBottom: 28,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20
  },
  deleteButton: {
    position: "absolute",
    top: 56,
    right: 20
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12
  },
  countdown: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 10,
    fontWeight: "600"
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 12
  },
  tabItem: {
    alignItems: "center",
    paddingBottom: 12
  },
  tabIndicator: {
    height: 3,
    width: 24,
    borderRadius: 2,
    marginTop: 8
  },
  content: {
    padding: 20
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700"
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10
  },
  interestChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8
  },
  occasionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
export {
  PersonProfileScreen as default
};
