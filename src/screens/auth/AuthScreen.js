import { Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppStore } from "../../store/useAppStore";
import { useTheme } from "../../hooks/useTheme";
function AuthScreen({ navigation }) {
  const { dispatch } = useAppStore();
  const theme = useTheme();
  const continueToApp = () => {
    navigation.replace("Permissions");
  };
  const gradient = theme.dark ? [theme.colors.background, theme.colors.card] : ["#F8F9FB", "#EDEBFB"];
  return <LinearGradient colors={gradient} style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🎁</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>Gift OS</Text>
        <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>Thoughtful gifting, made effortless</Text>
      </View>

      <View style={styles.buttons}>
        <Pressable style={[styles.socialButton, styles.googleButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]} onPress={continueToApp}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={[styles.socialText, { color: theme.colors.text }]}>Continue with Google</Text>
        </Pressable>

        <Pressable style={[styles.socialButton, styles.appleButton]} onPress={continueToApp}>
          <Ionicons name="logo-apple" size={20} color="#fff" />
          <Text style={[styles.socialText, { color: "#fff" }]}>Continue with Apple</Text>
        </Pressable>

        <Pressable style={[styles.socialButton, styles.emailButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]} onPress={continueToApp}>
          <Ionicons name="mail-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.socialText, { color: theme.colors.text }]}>Continue with Email</Text>
        </Pressable>

        <Pressable
    onPress={() => {
      dispatch({ type: "SET_AUTHENTICATED", value: true });
      dispatch({ type: "SET_ONBOARDED", value: true });
    }}
    style={styles.guestLink}
  >
          <Text style={[styles.guestText, { color: theme.colors.primary }]}>Continue as Guest</Text>
        </Pressable>
      </View>

      <Text style={[styles.footer, { color: theme.colors.textSecondary }]}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </LinearGradient>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40
  },
  hero: {
    alignItems: "center"
  },
  logo: {
    fontSize: 64
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8
  },
  tagline: {
    fontSize: 14,
    marginTop: 6
  },
  buttons: {
    marginTop: 40
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12
  },
  googleButton: {
    borderWidth: 1
  },
  appleButton: {
    backgroundColor: "#111827"
  },
  emailButton: {
    borderWidth: 1
  },
  socialText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10
  },
  guestLink: {
    marginTop: 8,
    alignItems: "center",
    paddingVertical: 10
  },
  guestText: {
    fontWeight: "600",
    fontSize: 14
  },
  footer: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16
  }
});
export {
  AuthScreen as default
};
