import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useTheme } from '../../hooks/useTheme';
import { Person } from '../../types';

interface PersonCardProps {
  person: Person;
  nextOccasionLabel?: string;
  onPress?: () => void;
}

export default function PersonCard({ person, nextOccasionLabel, onPress }: PersonCardProps) {
  const theme = useTheme();

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <Avatar emoji={person.avatarEmoji} color={person.avatarColor} size={54} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
            {person.name}
          </Text>
          <View style={{ marginTop: 4 }}>
            <Badge label={person.relationship} variant="primary" />
          </View>
        </View>
      </View>
      {nextOccasionLabel ? (
        <Text style={[styles.occasion, { color: theme.colors.textSecondary }]} numberOfLines={1}>
          🎉 {nextOccasionLabel}
        </Text>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  occasion: {
    fontSize: 13,
    marginTop: 10,
  },
});
