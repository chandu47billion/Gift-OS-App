import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import NotificationCenterScreen from '../screens/home/NotificationCenterScreen';
import WishlistScreen from '../screens/gifts/WishlistScreen';
import GiftHistoryScreen from '../screens/gifts/GiftHistoryScreen';
import BudgetTrackerScreen from '../screens/gifts/BudgetTrackerScreen';
import ReminderSettingsScreen from '../screens/gifts/ReminderSettingsScreen';
import GreetingCreatorScreen from '../screens/gifts/GreetingCreatorScreen';
import PremiumScreen from '../screens/premium/PremiumScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import { useAppStore } from '../store/useAppStore';

export type RootStackParamList = {
  MainTabs: undefined;
  NotificationCenter: undefined;
  Wishlist: { personId?: string } | undefined;
  GiftHistory: { personId?: string } | undefined;
  BudgetTracker: undefined;
  ReminderSettings: undefined;
  GreetingCreator: { personId?: string } | undefined;
  Premium: undefined;
  Settings: { section?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainNavigator} />
      <Stack.Screen name="NotificationCenter" component={NotificationCenterScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="GiftHistory" component={GiftHistoryScreen} />
      <Stack.Screen name="BudgetTracker" component={BudgetTrackerScreen} />
      <Stack.Screen name="ReminderSettings" component={ReminderSettingsScreen} />
      <Stack.Screen name="GreetingCreator" component={GreetingCreatorScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { state } = useAppStore();

  return state.isAuthenticated ? <RootNavigator /> : <AuthNavigator />;
}
