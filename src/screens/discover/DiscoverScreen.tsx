import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { giftSuggestions, discoverCategories } from '../../data/mockData';
import GiftCard from '../../components/gifts/GiftCard';
import EmptyState from '../../components/common/EmptyState';

export default function DiscoverScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return giftSuggestions.filter((g) => {
      const matchesQuery = g.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === 'All' || g.category.toLowerCase().includes(category.toLowerCase());
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Discover</Text>
      </View>

      <View style={[styles.searchBar, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Ionicons name="search" size={18} color={theme.colors.textSecondary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search gift ideas..."
          placeholderTextColor={theme.colors.textSecondary}
          style={[styles.searchInput, { color: theme.colors.text }]}
        />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={discoverCategories}
        keyExtractor={(item) => item}
        style={{ flexGrow: 0, marginBottom: 8 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setCategory(item)}
            style={[
              styles.chip,
              {
                backgroundColor: category === item ? theme.colors.primary : theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={{ color: category === item ? '#fff' : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
              {item}
            </Text>
          </Pressable>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 14, paddingBottom: 60 }}
        ListEmptyComponent={<EmptyState emoji="🎁" title="No gifts found" subtitle="Try another search or category." />}
        renderItem={({ item }) => (
          <GiftCard
            name={item.name}
            price={item.price}
            emoji={item.emoji}
            gradient={item.gradient}
            onPress={() => navigation.navigate('GiftDetail', { giftId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
  },
});
