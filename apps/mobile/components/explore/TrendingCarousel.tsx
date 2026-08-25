import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface TrendingCarouselProps {
  items: ContentItem[];
  hashtags: Array<{ tag: string; count: string }>;
  onSelectHashtag?: (tag: string) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  items,
  hashtags,
  onSelectHashtag,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Trending Hashtags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hashtagsScroll}
      >
        {hashtags.map((h, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.hashtagCard}
            onPress={() => onSelectHashtag && onSelectHashtag(h.tag)}
            activeOpacity={0.7}
          >
            <Text style={styles.hashtagText}>{h.tag}</Text>
            <Text style={styles.hashtagCount}>{h.count}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trending Cards Carousel */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>🔥 Trending Right Now</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScroll}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.trendingCard}
            onPress={() =>
              router.push({
                pathname: '/post/[id]',
                params: { id: item.id },
              })
            }
            activeOpacity={0.9}
          >
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
            ) : (
              <View style={styles.imageFallback}>
                <Text style={styles.fallbackIcon}>⚡</Text>
              </View>
            )}
            <View style={styles.cardContent}>
              <Text style={styles.sourceTag}>{item.sourceName}</Text>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.engagementText}>❤️ {item.engagement?.likes} likes</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  hashtagsScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  hashtagCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  hashtagText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.secondary,
  },
  hashtagCount: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  sectionHeaderRow: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
  cardsScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  trendingCard: {
    width: 220,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardImage: {
    width: '100%',
    height: 110,
  },
  imageFallback: {
    width: '100%',
    height: 110,
    backgroundColor: Colors.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackIcon: {
    fontSize: 28,
  },
  cardContent: {
    padding: Spacing.sm + 2,
  },
  sourceTag: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  engagementText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
});

