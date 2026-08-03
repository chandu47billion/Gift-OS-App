import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';

interface EventCardProps {
  title: string;
  subtitle: string;
  emoji: string;
  daysLeft: number;
}

export default function EventCard({ title, subtitle, emoji, daysLeft }: EventCardProps) {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>TODAY'S FOCUS</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      </View>
      <View style={styles.pill}>
        <Text style={styles.pillText}>
          {daysLeft === 0 ? "It's today! 🎉" : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginTop: 4,
  },
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  pill: {
    alignSelf: 'flex-start',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  pillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
