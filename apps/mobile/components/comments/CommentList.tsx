import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Comment } from '@funbytes/types';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onReply?: (comment: Comment) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, onReply }) => {
  if (comments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>💬</Text>
        <Text style={styles.emptyTitle}>No comments yet</Text>
        <Text style={styles.emptySubtitle}>Be the first byte to drop your thoughts!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Comments ({comments.length})</Text>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sectionHeader: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
});

