import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import { relationshipFilters } from "../../data/mockData";
import PersonCard from "../../components/people/PersonCard";
import EmptyState from "../../components/common/EmptyState";
import { daysUntil } from "../../utils/date";
function PeopleListScreen({ navigation }) {
  const theme = useTheme();
  const { state } = useAppStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => {
    return state.people.filter((p) => {
      const matchesFilter = filter === "All" || p.relationship === filter;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [state.people, query, filter]);
  const nextOccasionLabel = (personId) => {
    const person = state.people.find((p) => p.id === personId);
    if (!person || person.occasions.length === 0) return void 0;
    const sorted = [...person.occasions].sort((a, b) => daysUntil(a.date) - daysUntil(b.date));
    const next = sorted[0];
    return `${next.label} in ${daysUntil(next.date)}d`;
  };
  return <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>People</Text>
      </View>

      <View style={[styles.searchBar, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Ionicons name="search" size={18} color={theme.colors.textSecondary} />
        <TextInput
    value={query}
    onChangeText={setQuery}
    placeholder="Search people..."
    placeholderTextColor={theme.colors.textSecondary}
    style={[styles.searchInput, { color: theme.colors.text }]}
  />
      </View>

      <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={relationshipFilters}
    keyExtractor={(item) => item}
    style={styles.filterRow}
    contentContainerStyle={{ paddingHorizontal: 20 }}
    renderItem={({ item }) => <Pressable
      onPress={() => setFilter(item)}
      style={[
        styles.chip,
        {
          backgroundColor: filter === item ? theme.colors.primary : theme.colors.card,
          borderColor: theme.colors.border
        }
      ]}
    >
            <Text style={{ color: filter === item ? "#fff" : theme.colors.text, fontWeight: "600", fontSize: 13 }}>
              {item}
            </Text>
          </Pressable>}
  />

      <FlatList
    data={filtered}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
    ListEmptyComponent={<EmptyState
      emoji="🔍"
      title="No people found"
      subtitle="Try a different search or filter, or add someone new."
      ctaLabel="Add Person"
      onPressCta={() => navigation.navigate("AddPerson")}
    />}
    renderItem={({ item }) => <PersonCard
      person={item}
      nextOccasionLabel={nextOccasionLabel(item.id)}
      onPress={() => navigation.navigate("PersonProfile", { personId: item.id })}
    />}
  />

      <Pressable
    onPress={() => navigation.navigate("AddPerson")}
    style={[styles.fab, { backgroundColor: theme.colors.primary }, theme.shadows.lg]}
  >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>;
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12
  },
  title: {
    fontSize: 26,
    fontWeight: "800"
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14
  },
  filterRow: {
    marginBottom: 8,
    flexGrow: 0
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8
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
  PeopleListScreen as default
};
