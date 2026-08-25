import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
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

  const authorName = item.author?.replace(/^u\//, '') || item.sourceName;
  const authorHandle = `@${item.sourceName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  return (
    <TouchableOpacity style={styles.postContainer} onPress={handleCardPress} activeOpacity={0.88}>
      <View style={styles.row}>
        {/* Left Column: Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarEmoji}>😂</Text>
          </View>
        </View>

        {/* Right Column: Post Body */}
        <View style={styles.contentColumn}>
          {/* Header row */}
          <View style={styles.authorRow}>
            <View style={styles.authorMeta}>
              <Text style={styles.displayName} numberOfLines={1}>
                {authorName}
              </Text>
              <Ionicons name="checkmark-circle" size={14} color={Colors.primary} style={styles.verifiedIcon} />
              <Text style={styles.handle} numberOfLines={1}>
                {authorHandle}
              </Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={16} color={Colors.textTertiary} />
          </View>

          {/* Meme Title / Punchline */}
          <Text style={styles.title}>{item.title}</Text>

          {/* Meme Image */}
          {item.imageUrl ? (
            <View style={styles.mediaContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.mediaImage} resizeMode="contain" />
            </View>
          ) : null}

          {/* Caption */}
          {item.summary ? <Text style={styles.bodyText}>{item.summary}</Text> : null}

          {/* Engagement */}
          <EngagementBar item={item} onPressComments={handleCardPress} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 18,
  },
  contentColumn: {
    flex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  authorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.xs,
  },
  displayName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    maxWidth: 130,
  },
  verifiedIcon: {
    marginLeft: 3,
    marginRight: 4,
  },
  handle: {
    fontSize: 14,
    color: Colors.textSecondary,
    maxWidth: 100,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 8,
  },
  mediaContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    backgroundColor: '#0a0a0a',
  },
  mediaImage: {
    width: '100%',
    height: 250,
  },
});

