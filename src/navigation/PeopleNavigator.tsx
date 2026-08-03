import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleListScreen from '../screens/people/PeopleListScreen';
import AddPersonScreen from '../screens/people/AddPersonScreen';
import PersonProfileScreen from '../screens/people/PersonProfileScreen';

export type PeopleStackParamList = {
  PeopleList: undefined;
  AddPerson: undefined;
  PersonProfile: { personId: string };
};

const Stack = createNativeStackNavigator<PeopleStackParamList>();

export default function PeopleNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PeopleList" component={PeopleListScreen} />
      <Stack.Screen name="AddPerson" component={AddPersonScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="PersonProfile" component={PersonProfileScreen} />
    </Stack.Navigator>
  );
}
