import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import GiftDetailScreen from '../screens/discover/GiftDetailScreen';

export type DiscoverStackParamList = {
  Discover: undefined;
  GiftDetail: { giftId: string };
};

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export default function DiscoverNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="GiftDetail" component={GiftDetailScreen} />
    </Stack.Navigator>
  );
}
