import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import NotificationCenterScreen from "../screens/home/NotificationCenterScreen";
import WishlistScreen from "../screens/gifts/WishlistScreen";
import GiftHistoryScreen from "../screens/gifts/GiftHistoryScreen";
import BudgetTrackerScreen from "../screens/gifts/BudgetTrackerScreen";
import ReminderSettingsScreen from "../screens/gifts/ReminderSettingsScreen";
import GreetingCreatorScreen from "../screens/gifts/GreetingCreatorScreen";
import PremiumScreen from "../screens/premium/PremiumScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import PersonProfileScreen from "../screens/people/PersonProfileScreen";
import { useAppStore } from "../store/useAppStore";
const Stack = createNativeStackNavigator();
function HydrationGate() {
  return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
      <ActivityIndicator size="small" color="#6C5CE7" />
    </View>;
}
function RootNavigator() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainNavigator} />
      <Stack.Screen name="PersonProfile" component={PersonProfileScreen} />
      <Stack.Screen name="NotificationCenter" component={NotificationCenterScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="GiftHistory" component={GiftHistoryScreen} />
      <Stack.Screen name="BudgetTracker" component={BudgetTrackerScreen} />
      <Stack.Screen name="ReminderSettings" component={ReminderSettingsScreen} />
      <Stack.Screen name="GreetingCreator" component={GreetingCreatorScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>;
}
function AppNavigator() {
  const { state, isHydrated } = useAppStore();
  if (!isHydrated) {
    return <HydrationGate />;
  }
  return state.isAuthenticated ? <RootNavigator /> : <AuthNavigator />;
}
export {
  AppNavigator as default
};
