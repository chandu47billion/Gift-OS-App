const Colors = {
  primary: "#6C5CE7",
  primaryLight: "#A29BFE",
  secondary: "#00B894",
  accent: "#FF7675",
  bgLight: "#F8F9FB",
  bgDark: "#0F1115",
  surfaceLight: "#FFFFFF",
  surfaceDark: "#171A21",
  cardLight: "#FFFFFF",
  cardDark: "#1E222B",
  textPrimaryLight: "#111827",
  textPrimaryDark: "#F3F4F6",
  textSecondaryLight: "#6B7280",
  textSecondaryDark: "#9CA3AF",
  borderLight: "#E5E7EB",
  borderDark: "#2D3348",
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#DC2626",
  purple: "#6C5CE7",
  pink: "#FD79A8",
  blue: "#74B9FF",
  yellow: "#FDCB6E",
  white: "#FFFFFF",
  black: "#000000"
};
const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
const Radii = { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 };
const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 34
};
const FontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800"
};
const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8
  }
};
const Gradients = {
  primary: [Colors.primary, Colors.primaryLight],
  sunset: ["#FF7675", "#FD79A8"],
  ocean: ["#74B9FF", "#6C5CE7"],
  mint: ["#00B894", "#55EFC4"],
  gold: ["#FDCB6E", "#FFEAA7"],
  premium: ["#6C5CE7", "#FD79A8"]
};
export {
  Colors,
  FontSizes,
  FontWeights,
  Gradients,
  Radii,
  Shadows,
  Spacing
};
