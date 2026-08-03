import { Pressable, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
function Card({ children, onPress, style, padded = true }) {
  const theme = useTheme();
  const cardStyle = {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.lg,
    padding: padded ? theme.spacing.md : 0,
    borderWidth: theme.dark ? 1 : 0,
    borderColor: theme.colors.border,
    ...theme.shadows.sm
  };
  if (onPress) {
    return <Pressable
      onPress={onPress}
      style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.9 : 1 }, style]}
    >
        {children}
      </Pressable>;
  }
  return <View style={[cardStyle, style]}>{children}</View>;
}
export {
  Card as default
};
