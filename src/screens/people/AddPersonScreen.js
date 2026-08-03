import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Avatar from "../../components/common/Avatar";
const relationships = ["Family", "Friend", "Partner", "Colleague", "Other"];
const avatarEmojis = ["\u{1F9D1}", "\u{1F469}", "\u{1F468}", "\u{1F475}", "\u{1F474}", "\u{1F9D1}\u200D\u{1F9B0}", "\u{1F469}\u200D\u{1F9B1}", "\u{1F9D4}"];
const avatarColors = ["#6C5CE7", "#FD79A8", "#74B9FF", "#00B894", "#FDCB6E", "#FF7675"];
const interestOptions = [
  "Travel",
  "Books",
  "Gaming",
  "Music",
  "Sports",
  "Cooking",
  "Fashion",
  "Tech",
  "Art",
  "Fitness",
  "Movies",
  "Gardening",
  "Coffee",
  "Wine"
];
const steps = ["Basics", "Dates", "Interests", "Budget", "Details", "Review"];
function AddPersonScreen({ navigation }) {
  const theme = useTheme();
  const { dispatch } = useAppStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [avatarEmoji, setAvatarEmoji] = useState(avatarEmojis[0]);
  const [avatarColor, setAvatarColor] = useState(avatarColors[0]);
  const [photoUri, setPhotoUri] = useState("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [interests, setInterests] = useState([]);
  const [sizes, setSizes] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [wishlistUrl, setWishlistUrl] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const toggleInterest = (interest) => {
    setInterests(
      (prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };
  const goNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      save();
    }
  };
  const goBack = () => {
    if (step === 0) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };
  const save = () => {
    const occasions = [];
    if (birthday) {
      occasions.push({
        id: `o-bday-${Date.now()}`,
        type: "Birthday",
        label: `${name || "New Person"}'s Birthday`,
        date: birthday,
        recurring: true
      });
    }
    if (anniversary) {
      occasions.push({
        id: `o-ann-${Date.now()}`,
        type: "Anniversary",
        label: `${name || "New Person"}'s Anniversary`,
        date: anniversary,
        recurring: true
      });
    }
    const newPerson = {
      id: `p-${Date.now()}`,
      name: name || "New Person",
      relationship,
      avatarEmoji,
      avatarColor,
      photoUri: photoUri || void 0,
      birthday: birthday || void 0,
      anniversary: anniversary || void 0,
      occasions,
      interests,
      sizes: sizes || void 0,
      budgetMin: budgetMin ? Number(budgetMin) : void 0,
      budgetMax: budgetMax ? Number(budgetMax) : void 0,
      wishlistUrl: wishlistUrl || void 0,
      address: address || void 0,
      notes: notes || void 0
    };
    dispatch({ type: "ADD_PERSON", value: newPerson });
    navigation.goBack();
  };
  return <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: theme.colors.background }}
    behavior={Platform.OS === "ios" ? "padding" : void 0}
  >
      <View style={styles.header}>
        <Pressable onPress={goBack} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Add Person</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>{step + 1}/{steps.length}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View
    style={[
      styles.progressFill,
      { width: `${(step + 1) / steps.length * 100}%`, backgroundColor: theme.colors.primary }
    ]}
  />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.stepTitle, { color: theme.colors.text }]}>{steps[step]}</Text>

        {step === 0 && <View>
            <View style={styles.avatarPicker}>
              <Avatar emoji={avatarEmoji} color={avatarColor} size={80} />
            </View>
            <View style={styles.rowWrap}>
              {avatarEmojis.map((e) => <Pressable key={e} onPress={() => setAvatarEmoji(e)} style={styles.emojiOption}>
                  <Text style={{ fontSize: 22, opacity: avatarEmoji === e ? 1 : 0.4 }}>{e}</Text>
                </Pressable>)}
            </View>
            <View style={styles.rowWrap}>
              {avatarColors.map((c) => <Pressable
    key={c}
    onPress={() => setAvatarColor(c)}
    style={[
      styles.colorDot,
      { backgroundColor: c, borderWidth: avatarColor === c ? 3 : 0, borderColor: theme.colors.text }
    ]}
  />)}
            </View>
            <Input label="Photo URL (optional)" value={photoUri} onChangeText={setPhotoUri} placeholder="https://..." />
            <Input label="Full Name" value={name} onChangeText={setName} placeholder="e.g. Taylor Smith" />
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Relationship</Text>
            <View style={styles.rowWrap}>
              {relationships.map((r) => <Pressable
    key={r}
    onPress={() => setRelationship(r)}
    style={[
      styles.chip,
      {
        backgroundColor: relationship === r ? theme.colors.primary : theme.colors.card,
        borderColor: theme.colors.border
      }
    ]}
  >
                  <Text style={{ color: relationship === r ? "#fff" : theme.colors.text, fontWeight: "600", fontSize: 13 }}>
                    {r}
                  </Text>
                </Pressable>)}
            </View>
          </View>}

        {step === 1 && <View>
            <Input
    label="Birthday (YYYY-MM-DD)"
    value={birthday}
    onChangeText={setBirthday}
    placeholder="1994-08-14"
  />
            <Input
    label="Anniversary (optional)"
    value={anniversary}
    onChangeText={setAnniversary}
    placeholder="2020-06-21"
  />
          </View>}

        {step === 2 && <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Interests</Text>
            <View style={styles.rowWrap}>
              {interestOptions.map((i) => <Pressable
    key={i}
    onPress={() => toggleInterest(i)}
    style={[
      styles.chip,
      {
        backgroundColor: interests.includes(i) ? theme.colors.primary : theme.colors.card,
        borderColor: theme.colors.border
      }
    ]}
  >
                  <Text style={{ color: interests.includes(i) ? "#fff" : theme.colors.text, fontWeight: "600", fontSize: 13 }}>
                    {i}
                  </Text>
                </Pressable>)}
            </View>
            <Input label="Sizes (optional)" value={sizes} onChangeText={setSizes} placeholder="M / US 9" />
          </View>}

        {step === 3 && <View>
            <Input label="Budget Min ($)" value={budgetMin} onChangeText={setBudgetMin} keyboardType="numeric" placeholder="30" />
            <Input label="Budget Max ($)" value={budgetMax} onChangeText={setBudgetMax} keyboardType="numeric" placeholder="120" />
            <Input label="Wishlist URL (optional)" value={wishlistUrl} onChangeText={setWishlistUrl} placeholder="https://..." />
          </View>}

        {step === 4 && <View>
            <Input label="Address (optional)" value={address} onChangeText={setAddress} placeholder="123 Main St" />
            <Input label="Notes (optional)" value={notes} onChangeText={setNotes} placeholder="Anything special to remember" multiline numberOfLines={4} />
          </View>}

        {step === 5 && <View>
            <View style={styles.reviewRow}>
              <Avatar emoji={avatarEmoji} color={avatarColor} size={64} />
              <View style={{ marginLeft: 14 }}>
                <Text style={[styles.reviewName, { color: theme.colors.text }]}>{name || "New Person"}</Text>
                <Text style={{ color: theme.colors.textSecondary }}>{relationship}</Text>
              </View>
            </View>
            <ReviewRow label="Birthday" value={birthday || "\u2014"} color={theme.colors.text} />
            <ReviewRow label="Anniversary" value={anniversary || "\u2014"} color={theme.colors.text} />
            <ReviewRow label="Interests" value={interests.join(", ") || "\u2014"} color={theme.colors.text} />
            <ReviewRow label="Budget" value={budgetMin || budgetMax ? `$${budgetMin || 0} - $${budgetMax || 0}` : "\u2014"} color={theme.colors.text} />
            <ReviewRow label="Address" value={address || "\u2014"} color={theme.colors.text} />
            <ReviewRow label="Notes" value={notes || "\u2014"} color={theme.colors.text} />
          </View>}
      </ScrollView>

      <View style={styles.footer}>
        <Button title={step === steps.length - 1 ? "Save Person" : "Continue"} onPress={goNext} />
      </View>
    </KeyboardAvoidingView>;
}
function ReviewRow({ label, value, color }) {
  return <View style={styles.reviewItem}>
      <Text style={{ color: "#9CA3AF", fontSize: 12, fontWeight: "600" }}>{label}</Text>
      <Text style={{ color, fontSize: 14, marginTop: 2 }}>{value}</Text>
    </View>;
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
    fontSize: 16,
    fontWeight: "700"
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 20,
    borderRadius: 2,
    marginBottom: 16
  },
  progressFill: {
    height: 4,
    borderRadius: 2
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16
  },
  avatarPicker: {
    alignItems: "center",
    marginBottom: 16
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16
  },
  emojiOption: {
    padding: 8
  },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  reviewName: {
    fontSize: 18,
    fontWeight: "700"
  },
  reviewItem: {
    marginBottom: 14
  },
  footer: {
    padding: 20
  }
});
export {
  AddPersonScreen as default
};
