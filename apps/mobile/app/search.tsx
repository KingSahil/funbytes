import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { FeedCard } from '../components/feed/FeedCard';
import { MemeCard } from '../components/feed/MemeCard';
import { CartoonCard } from '../components/feed/CartoonCard';
import { TOPIC_CATEGORIES } from '../constants/topics';
import { api } from '../services/api';
import { ContentItem } from '@funbytes/types';

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();

  const [query, setQuery] = useState(params.q || '');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', query, selectedCategory],
    queryFn: () => api.search(query, selectedCategory),
    enabled: query.trim().length > 0,
  });

  const popularSearches = [
    'React Native',
    'Modular Monoliths',
    'Rust',
    'Zustand',
    'DevHumor',
    'Semiconductor',
    'Cricket',
    'Quantum',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search articles, reddit, memes, authors..."
            placeholderTextColor={Colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            autoFocus={!params.q}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Chips */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {TOPIC_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                  isSelected && { borderColor: cat.color },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.filterIcon}>{cat.icon}</Text>
                <Text style={[styles.filterText, isSelected && { color: cat.color, fontWeight: '700' }]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Search Results / Suggestions */}
      {query.trim().length === 0 ? (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>⚡ Popular Searches</Text>
          <View style={styles.tagsGrid}>
            {popularSearches.map((term, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestionTag}
                onPress={() => setQuery(term)}
                activeOpacity={0.7}
              >
                <Ionicons name="trending-up" size={14} color={Colors.secondary} />
                <Text style={styles.suggestionText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.contentType === 'meme' ? (
              <MemeCard item={item} />
            ) : item.contentType === 'cartoon' ? (
              <CartoonCard item={item} />
            ) : (
              <FeedCard item={item} />
            )
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No bytes found</Text>
              <Text style={styles.emptySubtitle}>
                No stories match "{query}". Try a different keyword or topic filter.
              </Text>
            </View>
          }
          contentContainerStyle={styles.resultsList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backBtn: {
    padding: 6,
    marginRight: Spacing.xs,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.sm,
  },
  clearBtn: {
    padding: 4,
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
  },
  filterScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs + 2,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.cardElevated,
  },
  filterIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  filterText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  suggestionsContainer: {
    padding: Spacing.xl,
  },
  suggestionsTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  suggestionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsList: {
    paddingBottom: Spacing.xxxl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: Typography.fontSizes.xs + 1,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});

