import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Badge } from '../common/Badge';
import { EngagementBar } from './EngagementBar';
import { CoverageBadges } from './CoverageBadges';

interface FeedCardProps {
  item: ContentItem;
}

export const FeedCard: React.FC<FeedCardProps> = ({ item }) => {
  const router = useRouter();

  const getTimeAgo = (dateString: string) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${Math.max(diffMins, 1)}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleCardPress = () => {
    router.push({
      pathname: '/post/[id]',
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.92}>
      {/* Header Info */}
      <View style={styles.header}>
        <View style={styles.sourceInfo}>
          {item.sourceLogo ? (
            <Image source={{ uri: item.sourceLogo }} style={styles.sourceLogo} />
          ) : (
            <View style={styles.sourceLogoFallback}>
              <Text style={styles.sourceInitial}>{item.sourceName.charAt(0)}</Text>
            </View>
          )}
          <View>
            <View style={styles.sourceRow}>
              <Text style={styles.sourceName} numberOfLines={1}>
                {item.sourceName}
              </Text>
              <Text style={styles.timeDot}>·</Text>
              <Text style={styles.timeAgo}>{getTimeAgo(item.publishedAt)}</Text>
            </View>
            {item.author ? (
              <Text style={styles.authorText} numberOfLines={1}>
                {item.author}
              </Text>
            ) : null}
          </View>
        </View>

        <Badge
          label={item.meta?.flair || item.category}
          category={item.category}
          contentType={item.contentType}
        />
      </View>

      {/* Main Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Excerpt / Summary */}
      {item.summary ? (
        <Text style={styles.summary} numberOfLines={3}>
          {item.summary}
        </Text>
      ) : null}

      {/* Main Media Image */}
      {item.imageUrl ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.mediaImage} resizeMode="cover" />
        </View>
      ) : null}

      {/* Multi-Source Coverage Badges */}
      <CoverageBadges coverageSources={item.coverageSources} />

      {/* Engagement Actions */}
      <EngagementBar
        item={item}
        onPressComments={handleCardPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm + 2,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  sourceLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Spacing.sm,
    backgroundColor: Colors.cardHighlight,
  },
  sourceLogoFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  sourceInitial: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceName: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    maxWidth: 160,
  },
  timeDot: {
    color: Colors.textTertiary,
    marginHorizontal: 4,
    fontSize: Typography.fontSizes.xs,
  },
  timeAgo: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
  authorText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  title: {
    fontSize: Typography.fontSizes.md + 1,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.md + 2,
    marginBottom: Spacing.xs,
  },
  summary: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.sm + 2,
    marginBottom: Spacing.md,
  },
  imageContainer: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    backgroundColor: Colors.cardElevated,
  },
  mediaImage: {
    width: '100%',
    height: 190,
  },
});

