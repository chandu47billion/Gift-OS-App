import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeopleListScreen from "../screens/people/PeopleListScreen";
import AddPersonScreen from "../screens/people/AddPersonScreen";
const Stack = createNativeStackNavigator();
function PeopleNavigator() {
  return <Stack.Navigator initialRouteName="PeopleList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PeopleList" component={PeopleListScreen} />
      <Stack.Screen name="AddPerson" component={AddPersonScreen} options={{ presentation: "modal" }} />
    </Stack.Navigator>;
}
export {
  PeopleNavigator as default
};
