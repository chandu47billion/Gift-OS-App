import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import { giftSuggestions } from "../../data/mockData";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import GiftSuggestionCard from "../../components/home/GiftSuggestionCard";
function GiftDetailScreen({ route, navigation }) {
  const { giftId } = route.params;
  const theme = useTheme();
  const { state, dispatch } = useAppStore();
  const gift = giftSuggestions.find((g) => g.id === giftId);
  const related = giftSuggestions.filter((g) => g.id !== giftId).slice(0, 4);
  if (!gift) return null;
  const person = state.people.find((p) => p.id === gift.personId);
  const saveToWishlist = () => {
    dispatch({
      type: "ADD_WISHLIST_ITEM",
      value: {
        id: `w-${Date.now()}`,
        personId: gift.personId ?? state.people[0]?.id ?? "",
        name: gift.name,
        price: gift.price,
        emoji: gift.emoji,
        purchased: false
      }
    });
    Alert.alert("Saved!", `${gift.name} was added to the wishlist.`);
  };
  return <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient colors={gift.gradient} style={styles.hero}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.heroEmoji}>{gift.emoji}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.category, { color: theme.colors.textSecondary }]}>{gift.category}</Text>
        <Text style={[styles.name, { color: theme.colors.text }]}>{gift.name}</Text>

        <View style={styles.metaRow}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>${gift.price.toFixed(2)}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={theme.colors.warning} />
            <Text style={{ color: theme.colors.text, marginLeft: 4, fontWeight: "600" }}>{gift.rating}</Text>
          </View>
        </View>

        <Card style={{ marginTop: 20 }}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>✨ Why this fits{person ? ` ${person.name}` : ""}</Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 8, lineHeight: 20 }}>{gift.rationale}</Text>
        </Card>

        <View style={{ marginTop: 20 }}>
          <Button title="Save to Wishlist" onPress={saveToWishlist} icon={<Ionicons name="heart-outline" size={18} color="#fff" />} />
          <View style={{ height: 12 }} />
          <Button
    title="Buy Now"
    variant="secondary"
    onPress={() => Alert.alert("Redirecting\u2026", "This would open the retailer link.")}
    icon={<Ionicons name="cart-outline" size={18} color="#fff" />}
  />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Related Gifts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {related.map((g) => <GiftSuggestionCard
    key={g.id}
    name={g.name}
    category={g.category}
    price={g.price}
    emoji={g.emoji}
    gradient={g.gradient}
    onPress={() => navigation.push("GiftDetail", { giftId: g.id })}
  />)}
        </ScrollView>
      </View>
    </ScrollView>;
}
const styles = StyleSheet.create({
  hero: {
    height: 240,
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    zIndex: 1
  },
  heroEmoji: {
    fontSize: 96
  },
  content: {
    padding: 20
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  price: {
    fontSize: 22,
    fontWeight: "800"
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700"
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 12
  }
});
export {
  GiftDetailScreen as default
};
