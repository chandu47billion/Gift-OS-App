import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { formatDate } from '../../utils/date';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';

const statusVariant: Record<string, 'success' | 'primary' | 'neutral'> = {
  given: 'success',
  planned: 'primary',
  idea: 'neutral',
};

export default function GiftHistoryScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { state } = useAppStore();
  const [personFilter, setPersonFilter] = useState('All');

  const filters = ['All', ...state.people.map((p) => p.id)];
  const personName = (id: string) => state.people.find((p) => p.id === id)?.name ?? 'Unknown';

  const filtered = useMemo(() => {
    return [...state.giftHistory]
      .filter((h) => personFilter === 'All' || h.personId === personFilter)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [state.giftHistory, personFilter]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Gift History</Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        keyExtractor={(item) => item}
        style={{ flexGrow: 0, marginBottom: 8 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setPersonFilter(item)}
            style={[
              styles.chip,
              {
                backgroundColor: personFilter === item ? theme.colors.primary : theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={{ color: personFilter === item ? '#fff' : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
              {item === 'All' ? 'All' : personName(item)}
            </Text>
          </Pressable>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        ListEmptyComponent={<EmptyState emoji="🎀" title="No gift history yet" />}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.colors.text }]}>{item.giftName}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  {personName(item.personId)} · {item.occasion} · {formatDate(item.date)}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>${item.price}</Text>
                <View style={{ marginTop: 6 }}>
                  <Badge label={item.status} variant={statusVariant[item.status]} />
                </View>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
});
