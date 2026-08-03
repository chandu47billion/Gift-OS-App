import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export default function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const theme = useTheme();

  const colorMap: Record<BadgeVariant, string> = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    neutral: theme.colors.textSecondary,
  };
  const color = colorMap[variant];

  return (
    <View style={[styles.container, { backgroundColor: color + '22' }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
