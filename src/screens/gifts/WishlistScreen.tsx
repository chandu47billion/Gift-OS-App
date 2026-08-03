import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';

export default function WishlistScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { state, dispatch } = useAppStore();
  const [personFilter, setPersonFilter] = useState<string>('All');

  const filters = ['All', ...state.people.map((p) => p.id)];
  const filtered = state.wishlist.filter((w) => personFilter === 'All' || w.personId === personFilter);

  const personName = (id: string) => state.people.find((p) => p.id === id)?.name ?? 'Unknown';

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Wishlist</Text>
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
        ListEmptyComponent={<EmptyState emoji="💝" title="Wishlist is empty" subtitle="Save gift ideas from Discover to see them here." />}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <View style={styles.row}>
              <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                  {personName(item.personId)} · ${item.price}
                </Text>
              </View>
              <Pressable onPress={() => dispatch({ type: 'TOGGLE_WISHLIST_PURCHASED', id: item.id })}>
                <Badge label={item.purchased ? 'Purchased' : 'Mark Purchased'} variant={item.purchased ? 'success' : 'neutral'} />
              </Pressable>
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
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
});
