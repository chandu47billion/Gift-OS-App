import { Colors, Radii, Shadows, Spacing, FontSizes, FontWeights } from "./tokens";
const lightTheme = {
  dark: false,
  colors: {
    background: Colors.bgLight,
    surface: Colors.surfaceLight,
    card: Colors.cardLight,
    text: Colors.textPrimaryLight,
    textSecondary: Colors.textSecondaryLight,
    border: Colors.borderLight,
    primary: Colors.primary,
    primaryLight: Colors.primaryLight,
    secondary: Colors.secondary,
    accent: Colors.accent,
    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error
  },
  spacing: Spacing,
  radii: Radii,
  shadows: Shadows,
  fontSizes: FontSizes,
  fontWeights: FontWeights
};
const darkTheme = {
  dark: true,
  colors: {
    background: Colors.bgDark,
    surface: Colors.surfaceDark,
    card: Colors.cardDark,
    text: Colors.textPrimaryDark,
    textSecondary: Colors.textSecondaryDark,
    border: Colors.borderDark,
    primary: Colors.primaryLight,
    primaryLight: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    success: Colors.success,
    warning: Colors.warning,
    error: Colors.error
  },
  spacing: Spacing,
  radii: Radii,
  shadows: Shadows,
  fontSizes: FontSizes,
  fontWeights: FontWeights
};
export {
  darkTheme,
  lightTheme
};
