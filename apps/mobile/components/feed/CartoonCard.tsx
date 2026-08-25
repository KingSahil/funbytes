import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Badge } from '../common/Badge';
import { EngagementBar } from './EngagementBar';

interface CartoonCardProps {
  item: ContentItem;
}

export const CartoonCard: React.FC<CartoonCardProps> = ({ item }) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push({
      pathname: '/post/[id]',
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.94}>
      {/* Cartoonist Header */}
      <View style={styles.header}>
        <View style={styles.sourceRow}>
          <Text style={styles.artEmoji}>🎨</Text>
          <View>
            <Text style={styles.cartoonistName}>
              {item.meta?.cartoonist || item.author || 'Editorial Cartoonist'}
            </Text>
            <Text style={styles.publicationName}>
              {item.meta?.publication || item.sourceName}
            </Text>
          </View>
        </View>
        <Badge label="Cartoon" contentType="cartoon" color={Colors.badgePolitico} />
      </View>

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Main Cartoon Artwork */}
      {item.imageUrl ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.artwork} resizeMode="cover" />
        </View>
      ) : null}

      {/* Context / Satire Summary */}
      {item.summary ? <Text style={styles.contextText}>{item.summary}</Text> : null}

      {/* Engagement Actions */}
      <EngagementBar item={item} onPressComments={handleCardPress} />
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
    marginBottom: Spacing.sm,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artEmoji: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  cartoonistName: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  publicationName: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
  title: {
    fontSize: Typography.fontSizes.md + 1,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.md + 2,
    marginBottom: Spacing.sm + 2,
  },
  imageContainer: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.cardElevated,
    marginBottom: Spacing.sm,
  },
  artwork: {
    width: '100%',
    height: 250,
  },
  contextText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.sm + 2,
    marginBottom: Spacing.sm,
  },
});

