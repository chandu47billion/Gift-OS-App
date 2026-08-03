import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/home/HomeScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import DiscoverNavigator from "./DiscoverNavigator";
import PeopleNavigator from "./PeopleNavigator";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { useTheme } from "../hooks/useTheme";
const Tab = createBottomTabNavigator();
const icons = {
  Home: "home",
  Calendar: "calendar",
  Discover: "compass",
  People: "people",
  Profile: "person"
};
function MainNavigator() {
  const theme = useTheme();
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textSecondary,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
        borderTopColor: theme.colors.border
      },
      tabBarIcon: ({ color, size, focused }) => <Ionicons
        name={focused ? icons[route.name] : `${icons[route.name]}-outline`}
        size={size}
        color={color}
      />
    })}
  >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Discover" component={DiscoverNavigator} />
      <Tab.Screen name="People" component={PeopleNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>;
}
export {
  MainNavigator as default
};
