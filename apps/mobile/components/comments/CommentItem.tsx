import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Comment } from '@funbytes/types';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface CommentItemProps {
  comment: Comment;
  onReply?: (comment: Comment) => void;
  isNested?: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply, isNested = false }) => {
  const [liked, setLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => Math.max(prev - 1, 0));
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60));
    if (diff < 60) return `${Math.max(diff, 1)}m`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <View style={[styles.container, isNested && styles.nestedContainer]}>
      {/* Avatar */}
      <Image
        source={{
          uri: comment.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${comment.authorName}`,
        }}
        style={styles.avatar}
      />

      <View style={styles.contentColumn}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.authorName}>{comment.authorName}</Text>
          <Text style={styles.timeAgo}>{getTimeAgo(comment.createdAt)}</Text>
        </View>

        {/* Text */}
        <Text style={styles.commentText}>{comment.content}</Text>

        {/* Actions (Like & Reply) */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleLike} activeOpacity={0.7}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={15}
              color={liked ? Colors.accentLike : Colors.textTertiary}
            />
            {likesCount > 0 && (
              <Text style={[styles.actionCount, liked && { color: Colors.accentLike }]}>
                {likesCount}
              </Text>
            )}
          </TouchableOpacity>

          {onReply && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onReply(comment)}
              activeOpacity={0.7}
            >
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <View style={styles.repliesList}>
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isNested={true} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  nestedContainer: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 0,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.cardHighlight,
    marginRight: Spacing.md,
  },
  contentColumn: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  authorName: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  timeAgo: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
  commentText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.sm + 2,
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  actionCount: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  replyText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  repliesList: {
    marginTop: Spacing.xs,
    paddingLeft: Spacing.sm,
    borderLeftWidth: 1.5,
    borderLeftColor: Colors.borderLight,
  },
});

