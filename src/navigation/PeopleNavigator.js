import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeopleListScreen from "../screens/people/PeopleListScreen";
import AddPersonScreen from "../screens/people/AddPersonScreen";
import PersonProfileScreen from "../screens/people/PersonProfileScreen";
const Stack = createNativeStackNavigator();
function PeopleNavigator() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PeopleList" component={PeopleListScreen} />
      <Stack.Screen name="AddPerson" component={AddPersonScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="PersonProfile" component={PersonProfileScreen} />
    </Stack.Navigator>;
}
export {
  PeopleNavigator as default
};
