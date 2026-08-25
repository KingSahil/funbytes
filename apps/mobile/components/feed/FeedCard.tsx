import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { EngagementBar } from './EngagementBar';

interface FeedCardProps {
  item: ContentItem;
}

export const FeedCard: React.FC<FeedCardProps> = ({ item }) => {
  const router = useRouter();

  const getTimeAgo = (dateString: string) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${Math.max(diffMins, 1)}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

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
        <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.8}>
          {item.sourceLogo ? (
            <Image source={{ uri: item.sourceLogo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitial}>{authorName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Right Column: Post Body */}
        <View style={styles.contentColumn}>
          {/* Header row with Name, Verified Badge, Handle, Time, and More */}
          <View style={styles.authorRow}>
            <View style={styles.authorMeta}>
              <Text style={styles.displayName} numberOfLines={1}>
                {authorName}
              </Text>
              <Ionicons name="checkmark-circle" size={14} color={Colors.primary} style={styles.verifiedIcon} />
              <Text style={styles.handle} numberOfLines={1}>
                {authorHandle}
              </Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.timestamp}>{getTimeAgo(item.publishedAt)}</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={16} color={Colors.textTertiary} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{item.title}</Text>

          {/* Summary / Body */}
          {item.summary ? (
            <Text style={styles.bodyText} numberOfLines={4}>
              {item.summary}
            </Text>
          ) : null}

          {/* Media Card */}
          {item.imageUrl ? (
            <View style={styles.mediaContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.mediaImage} resizeMode="cover" />
            </View>
          ) : null}

          {/* Bottom Engagement Bar */}
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardElevated,
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
  avatarInitial: {
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
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
    flexWrap: 'nowrap',
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
    maxWidth: 90,
  },
  dot: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginHorizontal: 4,
  },
  timestamp: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 19,
    marginBottom: 8,
    opacity: 0.9,
  },
  mediaContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    backgroundColor: Colors.cardElevated,
  },
  mediaImage: {
    width: '100%',
    height: 200,
  },
});

