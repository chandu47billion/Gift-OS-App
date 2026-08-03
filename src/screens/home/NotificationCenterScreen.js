import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import EmptyState from "../../components/common/EmptyState";
function NotificationCenterScreen({ navigation }) {
  const theme = useTheme();
  const { state, dispatch } = useAppStore();
  const { notifications } = state;
  return <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notifications</Text>
        <Pressable onPress={() => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" })} hitSlop={12}>
          <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: "600" }}>Mark all</Text>
        </Pressable>
      </View>

      <FlatList
    data={notifications}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{ padding: 20 }}
    ListEmptyComponent={<EmptyState emoji="🔕" title="No notifications yet" subtitle="We'll let you know when something needs your attention." />}
    renderItem={({ item }) => <Pressable
      onPress={() => dispatch({ type: "MARK_NOTIFICATION_READ", id: item.id })}
      style={[
        styles.item,
        {
          backgroundColor: item.read ? theme.colors.background : theme.colors.card,
          borderColor: theme.colors.border
        }
      ]}
    >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
              <Text style={[styles.body, { color: theme.colors.textSecondary }]}>{item.body}</Text>
              <Text style={[styles.time, { color: theme.colors.textSecondary }]}>{item.time}</Text>
            </View>
            {!item.read ? <View style={styles.dot} /> : null}
          </Pressable>}
  />
    </View>;
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700"
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10
  },
  icon: {
    fontSize: 24
  },
  title: {
    fontSize: 14,
    fontWeight: "700"
  },
  body: {
    fontSize: 13,
    marginTop: 2
  },
  time: {
    fontSize: 11,
    marginTop: 6
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF7675",
    marginTop: 4
  }
});
export {
  NotificationCenterScreen as default
};
