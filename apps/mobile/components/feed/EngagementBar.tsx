import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { ContentItem } from '@funbytes/types';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import { shareService } from '../../services/share';
import * as WebBrowser from 'expo-web-browser';
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
    // Spring bounce animation
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

  const handleMore = () => {
    Alert.alert(
      item.title,
      'Choose an action:',
      [
        {
          text: 'Open Original Article',
          onPress: () => WebBrowser.openBrowserAsync(item.articleUrl).catch(() => {}),
        },
        {
          text: 'Report Content',
          style: 'destructive',
          onPress: () => Alert.alert('Reported', 'Thank you. Our moderation team will review this byte.'),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const formatCount = (num: number = 0) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <View style={styles.container}>
      {/* Like Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleLike} activeOpacity={0.7}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={liked ? Colors.accentLike : Colors.textSecondary}
          />
        </Animated.View>
        <Text style={[styles.actionText, liked && { color: Colors.accentLike, fontWeight: '700' }]}>
          {formatCount(likesCount)}
        </Text>
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity style={styles.actionButton} onPress={onPressComments} activeOpacity={0.7}>
        <Ionicons name="chatbubble-outline" size={18} color={Colors.textSecondary} />
        <Text style={styles.actionText}>{formatCount(item.engagement?.comments || 0)}</Text>
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleShare} activeOpacity={0.7}>
        <Ionicons name="repeat-outline" size={20} color={Colors.textSecondary} />
        <Text style={styles.actionText}>{formatCount(item.engagement?.shares || 0)}</Text>
      </TouchableOpacity>

      {/* Bookmark Button */}
      <TouchableOpacity style={styles.iconOnlyButton} onPress={handleBookmark} activeOpacity={0.7}>
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={19}
          color={bookmarked ? Colors.secondary : Colors.textSecondary}
        />
      </TouchableOpacity>

      {/* More Button */}
      <TouchableOpacity style={styles.iconOnlyButton} onPress={handleMore} activeOpacity={0.7}>
        <Ionicons name="ellipsis-horizontal" size={19} color={Colors.textTertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    marginTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 5,
  },
  iconOnlyButton: {
    padding: 6,
  },
  actionText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});

