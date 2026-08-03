import { useEffect, useRef } from "react";
import { Animated, StatusBar, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start();
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2e3);
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);
  return <LinearGradient colors={["#6C5CE7", "#A29BFE"]} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Text style={styles.logo}>🎁</Text>
        <Text style={styles.title}>Gift OS</Text>
        <Text style={styles.subtitle}>Never miss a moment that matters</Text>
      </Animated.View>
    </LinearGradient>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontSize: 72,
    marginBottom: 12
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginTop: 8
  }
});
export {
  SplashScreen as default
};
