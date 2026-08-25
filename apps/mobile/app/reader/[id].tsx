import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api';
import * as WebBrowser from 'expo-web-browser';

export default function ArticleReaderModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: post } = useQuery({
    queryKey: ['post_reader', id],
    queryFn: () => api.getItemById(id as string),
    enabled: Boolean(id),
  });

  const handleOpenExternal = () => {
    if (post?.articleUrl) {
      WebBrowser.openBrowserAsync(post.articleUrl).catch(() => {});
    }
  };

  if (!post) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal Navbar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>In-App Byte Reader</Text>
        <TouchableOpacity style={styles.openExternalBtn} onPress={handleOpenExternal}>
          <Ionicons name="open-outline" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sourceBanner}>
          <Text style={styles.sourceText}>Original Source: {post.sourceName}</Text>
        </View>

        <Text style={styles.title}>{post.title}</Text>

        {post.imageUrl ? (
          <Image source={{ uri: post.imageUrl }} style={styles.heroImage} resizeMode="cover" />
        ) : null}

        {post.aiSummary ? (
          <View style={styles.summaryHighlight}>
            <Text style={styles.highlightTitle}>⚡ Key Insights</Text>
            <Text style={styles.highlightBody}>{post.aiSummary}</Text>
          </View>
        ) : null}

        <Text style={styles.bodyText}>{post.summary}</Text>

        <TouchableOpacity style={styles.openFullBtn} onPress={handleOpenExternal}>
          <Text style={styles.openFullText}>Open Complete Story on {post.sourceName} ↗</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  closeBtn: {
    padding: 6,
  },
  navTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  openExternalBtn: {
    padding: 6,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  sourceBanner: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  sourceText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.primaryLight,
    fontWeight: '700',
  },
  title: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.xl + 2,
    marginBottom: Spacing.md,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.cardHighlight,
  },
  summaryHighlight: {
    backgroundColor: Colors.cardElevated,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary,
  },
  highlightTitle: {
    fontSize: Typography.fontSizes.xs + 1,
    fontWeight: '800',
    color: Colors.secondary,
    marginBottom: 4,
  },
  highlightBody: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.sm + 2,
  },
  bodyText: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.md + 4,
    marginBottom: Spacing.xl,
  },
  openFullBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  openFullText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
});

