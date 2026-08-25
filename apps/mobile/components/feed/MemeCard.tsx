import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Badge } from '../common/Badge';
import { EngagementBar } from './EngagementBar';

interface MemeCardProps {
  item: ContentItem;
}

export const MemeCard: React.FC<MemeCardProps> = ({ item }) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push({
      pathname: '/post/[id]',
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.94}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.sourceRow}>
          <Text style={styles.memeEmoji}>😂</Text>
          <Text style={styles.sourceName}>{item.sourceName}</Text>
        </View>
        <Badge label="Meme" contentType="meme" color={Colors.accentMeme} />
      </View>

      {/* Meme Title / Punchline */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Full Width Meme Image */}
      {item.imageUrl ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.memeImage} resizeMode="cover" />
        </View>
      ) : null}

      {/* Caption Excerpt */}
      {item.summary ? <Text style={styles.summary}>{item.summary}</Text> : null}

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
  memeEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  sourceName: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.accentMeme,
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
  memeImage: {
    width: '100%',
    height: 240,
  },
  summary: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: Typography.lineHeights.sm + 2,
    marginBottom: Spacing.sm,
  },
});

