import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, AppTheme } from '../design-system/theme';
import { useAppStore } from '../store/useAppStore';

export function useTheme(): AppTheme {
  const systemScheme = useColorScheme();
  const { state } = useAppStore();
  const { themePreference } = state;

  const resolved =
    themePreference === 'system' ? systemScheme ?? 'light' : themePreference;

  return resolved === 'dark' ? darkTheme : lightTheme;
}
