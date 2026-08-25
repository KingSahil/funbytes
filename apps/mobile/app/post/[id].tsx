import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../../components/common/Badge';
import { EngagementBar } from '../../components/feed/EngagementBar';
import { CommentList } from '../../components/comments/CommentList';
import { CommentInput } from '../../components/comments/CommentInput';
import { api } from '../../services/api';
import { Comment } from '@funbytes/types';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.getItemById(id as string),
    enabled: Boolean(id),
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => api.getComments(id as string),
    enabled: Boolean(id),
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ text, parentId }: { text: string; parentId?: string }) =>
      api.addComment(id as string, text, 'Byte Explorer', parentId),
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[]>(['comments', id], (old = []) => [newComment, ...old]);
    },
  });

  const handleSendComment = (text: string, parentId?: string) => {
    addCommentMutation.mutate({ text, parentId });
  };

  const handleOpenBrowser = () => {
    if (post?.articleUrl) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      WebBrowser.openBrowserAsync(post.articleUrl).catch(() => {});
    }
  };

  if (isLoading || !post) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.navTitleContainer}>
          <Text style={styles.navTitle} numberOfLines={1}>
            {post.sourceName}
          </Text>
        </View>

        <TouchableOpacity style={styles.readerBtn} onPress={handleOpenBrowser} activeOpacity={0.7}>
          <Ionicons name="globe-outline" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Post Metadata Header */}
        <View style={styles.postHeader}>
          <View style={styles.badgeRow}>
            <Badge label={post.category} category={post.category} contentType={post.contentType} />
            <Text style={styles.timestamp}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>

          {/* Headline */}
          <Text style={styles.title}>{post.title}</Text>

          {/* Author info */}
          {post.author ? (
            <View style={styles.authorRow}>
              <View style={styles.authorDot} />
              <Text style={styles.authorText}>By {post.author}</Text>
            </View>
          ) : null}
        </View>

        {/* Media Image / Artwork */}
        {post.imageUrl ? (
          <View style={styles.imageBox}>
            <Image source={{ uri: post.imageUrl }} style={styles.mainImage} resizeMode="cover" />
          </View>
        ) : null}

        {/* AI Bullet Summary (where available) */}
        {post.aiSummary ? (
          <View style={styles.aiSummaryBox}>
            <View style={styles.aiHeaderRow}>
              <Text style={styles.aiIcon}>⚡</Text>
              <Text style={styles.aiTitle}>FunBytes Key Takeaways</Text>
            </View>
            <Text style={styles.aiBody}>{post.aiSummary}</Text>
          </View>
        ) : null}

        {/* Summary Body */}
        {post.summary ? (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{post.summary}</Text>
          </View>
        ) : null}

        {/* Source Link CTA */}
        <TouchableOpacity style={styles.sourceCta} onPress={handleOpenBrowser} activeOpacity={0.85}>
          <View style={styles.sourceCtaLeft}>
            <Ionicons name="open-outline" size={18} color={Colors.textPrimary} />
            <Text style={styles.sourceCtaText}>
              Read full article on {post.sourceName}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>

        {/* Engagement Bar */}
        <View style={styles.engagementContainer}>
          <EngagementBar item={post} />
        </View>

        {/* Threaded Comments List */}
        {loadingComments ? (
          <View style={styles.commentsLoader}>
            <ActivityIndicator size="small" color={Colors.secondary} />
          </View>
        ) : (
          <CommentList
            comments={comments}
            onReply={(targetComment) => setReplyingTo(targetComment)}
          />
        )}
      </ScrollView>

      {/* Sticky Bottom Comment Input */}
      <CommentInput
        onSend={handleSendComment}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 6,
  },
  navTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
  navTitle: {
    fontSize: Typography.fontSizes.sm + 1,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  readerBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  postHeader: {
    padding: Spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  timestamp: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
  title: {
    fontSize: Typography.fontSizes.xl + 2,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.xl + 4,
    marginBottom: Spacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  authorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    marginRight: 6,
  },
  authorText: {
    fontSize: Typography.fontSizes.xs + 1,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  imageBox: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.cardHighlight,
  },
  mainImage: {
    width: '100%',
    height: 220,
  },
  aiSummaryBox: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.cardElevated,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  aiIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  aiTitle: {
    fontSize: Typography.fontSizes.xs + 1,
    fontWeight: '800',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aiBody: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.sm + 4,
  },
  summaryBox: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryText: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.md + 4,
  },
  sourceCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  sourceCtaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  sourceCtaText: {
    fontSize: Typography.fontSizes.xs + 1,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  engagementContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  commentsLoader: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
});

