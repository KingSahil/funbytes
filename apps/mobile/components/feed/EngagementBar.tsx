import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../../constants/theme';
import { ContentItem } from '@funbytes/types';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import { shareService } from '../../services/share';
import * as Haptics from 'expo-haptics';

interface EngagementBarProps {
  item: ContentItem;
  onPressComments?: () => void;
}

export const EngagementBar: React.FC<EngagementBarProps> = ({ item, onPressComments }) => {
  const { toggleLike, isLiked, getLikesCount } = useInteractionStore();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();

  const liked = isLiked(item.id);
  const likesCount = getLikesCount(item.id, item.engagement?.likes || 0);
  const bookmarked = isBookmarked(item.id);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.35, duration: 120, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    toggleLike(item.id, item.engagement?.likes || 0);
  };

  const handleBookmark = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    toggleBookmark(item);
  };

  const handleShare = () => {
    shareService.sharePost(item);
  };

  const formatCount = (num: number = 0) => {
    if (num <= 0) return '';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <View style={styles.container}>
      {/* Reply */}
      <TouchableOpacity style={styles.actionButton} onPress={onPressComments} activeOpacity={0.6}>
        <Ionicons name="chatbubble-outline" size={17} color={Colors.textSecondary} />
        {item.engagement?.comments ? (
          <Text style={styles.actionText}>{formatCount(item.engagement.comments)}</Text>
        ) : null}
      </TouchableOpacity>

      {/* Repost */}
      <TouchableOpacity style={styles.actionButton} onPress={handleShare} activeOpacity={0.6}>
        <Ionicons name="repeat-outline" size={19} color={Colors.textSecondary} />
        {item.engagement?.shares ? (
          <Text style={styles.actionText}>{formatCount(item.engagement.shares)}</Text>
        ) : null}
      </TouchableOpacity>

      {/* Like */}
      <TouchableOpacity style={styles.actionButton} onPress={handleLike} activeOpacity={0.6}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={18}
            color={liked ? Colors.accentLike : Colors.textSecondary}
          />
        </Animated.View>
        {likesCount > 0 ? (
          <Text style={[styles.actionText, liked && { color: Colors.accentLike }]}>
            {formatCount(likesCount)}
          </Text>
        ) : null}
      </TouchableOpacity>

      {/* Bookmark */}
      <TouchableOpacity style={styles.actionButton} onPress={handleBookmark} activeOpacity={0.6}>
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={17}
          color={bookmarked ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>

      {/* Share / Export */}
      <TouchableOpacity style={styles.actionButton} onPress={handleShare} activeOpacity={0.6}>
        <Ionicons name="share-outline" size={17} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 2,
    maxWidth: 340,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    gap: 5,
  },
  actionText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
});

