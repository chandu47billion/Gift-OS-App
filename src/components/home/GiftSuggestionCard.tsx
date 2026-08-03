import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface GiftSuggestionCardProps {
  name: string;
  category: string;
  price: number;
  emoji: string;
  gradient: readonly [string, string];
  onPress?: () => void;
}

export default function GiftSuggestionCard({
  name,
  category,
  price,
  emoji,
  gradient,
  onPress,
}: GiftSuggestionCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, { opacity: pressed ? 0.9 : 1 }]}>
      <LinearGradient colors={gradient} style={styles.imageArea}>
        <Text style={styles.emoji}>{emoji}</Text>
      </LinearGradient>
      <View style={{ padding: 10 }}>
        <Text style={[styles.category, { color: theme.colors.textSecondary }]}>{category}</Text>
        <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.price, { color: theme.colors.primary }]}>${price.toFixed(0)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageArea: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
});
