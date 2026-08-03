import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/SplashScreen";
import OnboardingScreen from "../screens/auth/OnboardingScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import PermissionsScreen from "../screens/auth/PermissionsScreen";
import { useAppStore } from "../store/useAppStore";
const Stack = createNativeStackNavigator();
function AuthNavigator() {
  const { state } = useAppStore();
  const initialRouteName = state.hasOnboarded ? "Auth" : "Splash";
  return <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
    </Stack.Navigator>;
}
export {
  AuthNavigator as default
};
