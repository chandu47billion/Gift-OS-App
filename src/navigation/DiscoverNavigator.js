import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "../screens/discover/DiscoverScreen";
import GiftDetailScreen from "../screens/discover/GiftDetailScreen";
const Stack = createNativeStackNavigator();
function DiscoverNavigator() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="GiftDetail" component={GiftDetailScreen} />
    </Stack.Navigator>;
}
export {
  DiscoverNavigator as default
};
